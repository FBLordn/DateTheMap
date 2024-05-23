use crate::mapApi::WorldMap;

pub struct GameState {
    round : i16,
    score : i32,
    world_map : WorldMap,
}

impl GameState {

    pub fn get_round(&mut self) -> i16 {
        self.round
    }

    pub fn get_score(&mut self) -> i32 {
        self.score
    }

    //update score (correctYear, guess) -> score
    pub fn update_score(&mut self, guess: Vec<i32>) {
        let correct_year: i32 = self.world_map.get_correct_year();
        //calculate new score
        //self.score = newScore;
    }

    //next round() -> round
    pub fn end_round(&mut self, guess: Vec<i32>) -> i16 {
        self.round += 1;
        self.update_score(guess);
        self.round
    }

    pub fn new_round(&mut self) {
        self.world_map = WorldMap::default();
        self.world_map.get_new_year();
        self.world_map.get_map();
        //return HMTL element from get_map
    }

    pub fn reset(&mut self) {
        self.round = 0;
        self.score = 0;
    }
}
