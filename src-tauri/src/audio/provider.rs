use std::{
    io::{BufReader, Cursor},
    sync::{
        mpsc::{self, Sender},
        Mutex, MutexGuard,
    },
};

use rand::{rng, seq::SliceRandom};
use rodio::{Decoder, OutputStream, Sink};

pub struct AudioData<'a, const N: usize> {
    success: &'a [u8],
    fail: &'a [u8],
    next: &'a [u8],
    background: [&'a [u8]; N],
    bg_thread: Option<Sender<Action>>,
    pub sound_volume: f32,
    pub music_volume: f32,
}

pub struct Provider<'a, const N: usize> {
    pub audio: Mutex<AudioData<'a, N>>,
}

pub static AUDIO_PROVIDER: Provider<'_, 4> = Provider {
    audio: Mutex::new(AudioData {
        success: include_bytes!("data/chime.ogg"),
        fail: include_bytes!("data/err.ogg"),
        next: include_bytes!("data/rustle.ogg"),
        background: [
            include_bytes!("data/Walen - Lonely Samurai.mp3"),
            include_bytes!("data/Walen - Medieval Village.mp3"),
            include_bytes!("data/Walen - Pyramid Secrets.mp3"),
            include_bytes!("data/Walen - Snake Charmer.mp3"),
        ],
        bg_thread: None,
        sound_volume: 0.5,
        music_volume: 0.5,
    }),
};

enum Action {
    Pause,
    Play,
    SetVolume(f32),
}

impl<const N: usize> AudioData<'_, N> {
    fn play(&self, audio: Vec<u8>) {
        let volume = self.sound_volume;
        std::thread::spawn(move || {
            let (_stream, stream_handle) = OutputStream::try_default().ok().unwrap();
            let audio = BufReader::new(Cursor::new(audio));
            let sink = stream_handle.play_once(audio).unwrap();
            sink.set_volume(volume);
            sink.sleep_until_end();
        });
    }

    fn start_loop(&mut self, mut audio: Vec<Vec<u8>>) {
        audio.shuffle(&mut rng());
        let (tx, rx) = mpsc::channel::<Action>();
        let volume = self.music_volume;
        std::thread::spawn(move || {
            let (_stream, stream_handle) = OutputStream::try_default().ok().unwrap();
            let sink = Sink::try_new(&stream_handle).unwrap();
            loop {
                if let Ok(action) = rx.recv() {
                    match action {
                        Action::Pause => {
                            sink.pause();
                        }
                        Action::Play => {
                            if sink.empty() {
                                for track in audio.clone() {
                                    sink.append(
                                        Decoder::new(BufReader::new(Cursor::new(track))).unwrap(),
                                    );
                                }
                            }
                            sink.set_volume(volume);
                            sink.play();
                        }
                        Action::SetVolume(v) => {
                            sink.set_volume(v);
                        }
                    };
                }
            }
        });
        self.bg_thread = Some(tx);
        self.play_loop();
    }

    fn play_loop(&self) {
        self.bg_thread.as_ref().map(|x| x.send(Action::Play));
    }

    fn pause_loop(&self) {
        self.bg_thread.as_ref().map(|x| x.send(Action::Pause));
    }

    fn set_bg_volume(&self, vol: f32) {
        self.bg_thread
            .as_ref()
            .map(|x| x.send(Action::SetVolume(vol)));
    }
}

impl<const N: usize> Provider<'_, N> {
    fn run<T: FnOnce(MutexGuard<AudioData<N>>)>(&self, func: T) {
        let _ = self.audio.lock().map(func);
    }

    pub fn success(&self) {
        self.run(|x| x.play(x.success.to_vec()));
    }

    pub fn fail(&self) {
        self.run(|x| x.play(x.fail.to_vec()));
    }

    pub fn next_question(&self) {
        self.run(|x| x.play(x.next.to_vec()));
    }

    pub fn start_bg_music(&self) {
        self.run(|mut x| {
            let vec = x.background.iter().map(|x| x.to_vec()).collect::<Vec<_>>();
            x.start_loop(vec);
        });
    }

    pub fn play_bg_music(&self) {
        self.run(|x| x.play_loop());
    }

    pub fn pause_bg_music(&self) {
        self.run(|x: MutexGuard<'_, AudioData<'_, N>>| x.pause_loop());
    }

    pub fn set_music_volume(&self, volume: f32) {
        self.run(|x| x.set_bg_volume(volume));
    }

    pub fn set_sound_volume(&self, volume: f32) {
        self.run(|mut x| x.sound_volume = volume);
    }
}
