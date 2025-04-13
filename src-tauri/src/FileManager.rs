pub enum RequestType {
    Config,
    OfflineMap,
}

pub struct FileManager {}

impl FileManager {
    fn executeWrite(request: RequestType, function: fn()) {}

    fn executeRead(request: RequestType, function: fn() -> str) -> String {
        return "".to_string();
    }
}
