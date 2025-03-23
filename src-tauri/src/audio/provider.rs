use std::{
    io::{BufReader, Cursor},
    sync::{
        mpsc::{self, Sender},
        Mutex, MutexGuard,
    },
};

use rand::{seq::SliceRandom, thread_rng};
use rodio::{Decoder, OutputStream};

pub struct AudioData<'a, const N: usize> {
    success: &'a [u8],
    fail: &'a [u8],
    next: &'a [u8],
    background: [&'a [u8]; N],
    bg_thread: Option<Sender<bool>>,
}

pub struct Provider<'a, const N: usize>(Mutex<AudioData<'a, N>>);

pub static AUDIO_PROVIDER: Provider<'_, 4> = Provider(Mutex::new(AudioData {
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
}));

impl<const N: usize> AudioData<'_, N> {
    fn play(audio: Vec<u8>) {
        std::thread::spawn(move || {
            let (_stream, stream_handle) = OutputStream::try_default().ok().unwrap();
            let audio = BufReader::new(Cursor::new(audio));
            let sink = stream_handle.play_once(audio).unwrap();
            sink.sleep_until_end();
        });
    }

    fn start_loop(&mut self, mut audio: Vec<Vec<u8>>) {
        audio.shuffle(&mut thread_rng());
        let (tx, rx) = mpsc::channel::<bool>();
        std::thread::spawn(move || loop {
            if let Ok(run) = rx.recv() {
                if run {
                    let (_stream, stream_handle) = OutputStream::try_default().ok().unwrap();
                    let first = BufReader::new(Cursor::new(audio[0].clone()));
                    let sink = stream_handle.play_once(first).unwrap();
                    for track in audio.clone().into_iter().skip(1) {
                        sink.append(Decoder::new(BufReader::new(Cursor::new(track))).unwrap());
                    }
                    loop {
                        if sink.empty() {
                            break;
                        }
                        if let Ok(run) = rx.try_recv() {
                            if !run {
                                sink.stop();
                            }
                        }
                    }
                }
            }
        });
        self.bg_thread = Some(tx);
        self.play_loop();
    }

    fn play_loop(&self) {
        self.bg_thread.as_ref().map(|x| x.send(true));
    }

    fn pause_loop(&self) {
        self.bg_thread.as_ref().map(|x| x.send(false));
    }
}

impl<const N: usize> Provider<'_, N> {
    fn run<T: FnOnce(MutexGuard<AudioData<N>>)>(&self, func: T) {
        let _ = self.0.lock().map(func);
    }

    pub fn success(&self) {
        self.run(|x| AudioData::<N>::play(x.success.to_vec()));
    }

    pub fn fail(&self) {
        self.run(|x| AudioData::<N>::play(x.fail.to_vec()));
    }

    pub fn next_question(&self) {
        self.run(|x| AudioData::<N>::play(x.next.to_vec()));
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
}
