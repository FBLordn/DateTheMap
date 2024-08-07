use rand::Rng;
use std::{fmt::Debug, thread::current};

use crate::util::Range;

pub struct InterfaceReturn {
    pub html: String,
    pub correct_year: i16,
}

pub trait MapInterface {
    fn get_raw_map(&self, range: Range<i16>) -> InterfaceReturn;
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Debug, Default)]
pub struct OHMLibrary {}
impl MapInterface for OHMLibrary {
    fn get_raw_map(&self, range: Range<i16>) -> InterfaceReturn {
        let correct: i16 = rand::thread_rng().gen_range(range.lower_bound..=range.upper_bound);
        let embed: String = format!("<iframe width=\"100%\" height=\"100%\" src=\"https://embed.openhistoricalmap.org/#map=4/49.84/14.94&layers=O&date={correct}-01-01&bbox=-43,17,73,70\"> </iframe>");
        InterfaceReturn {
            html: embed,
            correct_year: correct,
        }
    }
}
