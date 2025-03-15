use rand::Rng;
use std::fmt::Debug;

use super::{MAXIMUM_YEAR, MINIMUM_YEAR};

pub struct InterfaceReturn {
    pub html: String,
    pub correct_year: i16,
}

pub trait MapInterface {
    fn get_raw_map(&self) -> InterfaceReturn;
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default)]
pub struct OHMLibrary {}
impl MapInterface for OHMLibrary {
    fn get_raw_map(&self) -> InterfaceReturn {
        let correct: i16 = rand::thread_rng().gen_range(MINIMUM_YEAR..=MAXIMUM_YEAR);
        let embed: String = format!("<iframe width=\"100%\" height=\"100%\" src=\"http://127.0.0.1:3456/#map=4/49.84/14.94&layers=O&date={correct}-01-01&bbox=-43,17,73,70\"> </iframe>");
        InterfaceReturn {
            html: embed,
            correct_year: correct,
        }
    }
}
