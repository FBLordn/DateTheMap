use rand::Rng;

pub struct WorldMap {
    correct_year: i16,
}

impl WorldMap {
    pub fn get_map(&self) {
        //API call
        //return HTML element
    }

    #[must_use]
    pub fn get_correct_year(&self) -> i16 {
        self.correct_year
    }
}

impl Default for WorldMap {
    fn default() -> Self {
        Self {
            correct_year: rand::thread_rng().gen_range(1500..2025),
        }
    }
}
