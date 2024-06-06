pub struct Range<A>
where
    A: std::cmp::Ord,
{
    pub lower_bound: A,
    pub upper_bound: A,
}

impl<A> Range<A>
where
    A: std::cmp::Ord,
{
    pub fn new(range: [A; 2]) -> Self
    where
        A: Copy,
    {
        Range {
            lower_bound: range[0].min(range[1]),
            upper_bound: range[0].max(range[1]),
        }
    }

    pub fn is_in_range(&self, value: &A) -> bool {
        value >= &self.lower_bound && value <= &self.upper_bound
    }
}
