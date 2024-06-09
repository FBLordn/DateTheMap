/// Represents a range of any data type
#[derive(PartialEq, Debug)]
pub struct Range<A>
where
    A: std::cmp::Ord,
{
    /// Lowest value of the range
    pub lower_bound: A,
    /// Highest value of the range
    pub upper_bound: A,
}

impl<A> Range<A>
where
    A: std::cmp::Ord,
{
    /// Creates new Range from given values
    ///
    /// Returns Range struct from the two values passed in the aray
    /// Order of the values in the array does not matter
    pub fn new(range: [A; 2]) -> Self
    where
        A: Copy,
    {
        Range {
            lower_bound: range[0].min(range[1]),
            upper_bound: range[0].max(range[1]),
        }
    }

    /// Returns if a given value is in the range
    pub fn is_in_range(&self, value: &A) -> bool {
        value >= &self.lower_bound && value <= &self.upper_bound
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::Rng;

    #[test]
    fn test_new_range() {
        let input = [30, 14];
        let correct_order = Range::new([input[1], input[0]]);
        let wrong_order = Range::new([input[0], input[1]]);
        assert_eq!(
            input,
            [correct_order.upper_bound, correct_order.lower_bound]
        );
        assert_eq!(input, [wrong_order.upper_bound, wrong_order.lower_bound]);
    }

    #[test]
    fn test_is_in_range() {
        let input: [i32; 2] = [rand::random(), rand::random()];
        let range = Range::new(input);
        let correct = rand::thread_rng().gen_range(range.lower_bound..range.upper_bound);
        let wrong = range.upper_bound.saturating_add(2);
        assert!(range.is_in_range(&correct));
        assert!(!range.is_in_range(&wrong));
    }

    #[test]
    fn test_generic() {
        #[derive(PartialEq, PartialOrd, Eq, Copy, Clone, Debug)]
        pub struct GenericTest {
            first: char,
            second: i16,
        }
        #[allow(clippy::derive_ord_xor_partial_ord)]
        impl Ord for GenericTest {
            fn cmp(&self, other: &Self) -> std::cmp::Ordering {
                if self.first == 'l' {
                    std::cmp::Ordering::Greater
                } else {
                    std::cmp::Ordering::Less
                }
            }
        }
        let greater = GenericTest {
            first: 'l',
            second: 13,
        };
        let lesser = GenericTest {
            first: 's',
            second: 13,
        };
        let wrong = Range::new([greater, lesser]);
        let right = Range::new([greater, lesser]);
        assert_eq!(wrong, right);
    }
}
