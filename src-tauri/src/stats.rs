use WorldMap;

pub struct Stats {
    round : i16,
    score : i32,
}

impl Stats {

    pub fn getRound() -> i16 {
        self.round
    }

    pub fn getScore() -> i32 {
        self.score
    }

    //update score (correctYear, guess) -> score
    pub fn updateScore(guess: Vec<i32>) -> i32 {
        let correctYear: i32 = WorldMap::getCorrectYear();
        //calculate new score
        //self.score = newScore;
        self.score
    }

    //next round() -> round
    pub fn nextRound() -> i16 {
        self.round += 1;
        self.round
    }

}
