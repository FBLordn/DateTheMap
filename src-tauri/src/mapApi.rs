use rand::Rng;

#[derive(Default)]
pub struct WorldMap {
    correct_year : i32,
}

impl WorldMap {

    pub fn get_new_year(&mut self) {
        self.correct_year = rand::thread_rng().gen_range(1500..2025)
    }

    pub fn get_map(&mut self){
        //API call
        //return HTML element
    }

    pub fn get_correct_year(&mut self) -> i32 {
        self.correct_year
    }
}

