use axum::{extract::Query, http::header, response::IntoResponse, routing::get, Router};
use regex::bytes::{Captures, Regex};
use reqwest::header::CONTENT_TYPE;
use serde::Deserialize;
use tokio::net::TcpListener;

const ADDR: &str = "127.0.0.1:3456";
const INDEX_HTML: &str = include_str!("index.html");
const STYLE_JSON: &str = include_str!("main.json");

async fn json() -> impl IntoResponse {
    ([(header::CONTENT_TYPE, "application/json")], STYLE_JSON)
}

#[derive(Deserialize)]
struct Coords {
    path: String,
    x: String,
    y: String,
    z: String,
}

async fn filter(query: Query<Coords>) -> impl IntoResponse {
    let Coords { x, y, z, path } = query.0;
    let uri = format!("https://vtiles.openhistoricalmap.org/maps/{path}/{z}/{x}/{y}.pbf");

    let resp = reqwest::get(uri).await.unwrap().bytes().await.unwrap();
    let re = Regex::new(r"(?-u)\x28\d+\x2d\d+\x29").unwrap();

    let resp = re
        .replace_all(&resp, |captured: &Captures| {
            let res = captured.extract::<0>().0.to_vec();
            String::from_utf8_lossy(&res)
                .replace(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], "X")
        })
        .into_owned();
    ([(CONTENT_TYPE, "application/vnd.mapbox-vector-tile")], resp)
}

pub async fn start() {
    let app = Router::new()
        .route("/map-styles/main/main.json", get(json))
        .route(
            "/",
            get(|| async { ([(header::CONTENT_TYPE, "text/html")], INDEX_HTML) }),
        )
        .route("/maps/", get(filter));
    let listener = TcpListener::bind(ADDR).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
