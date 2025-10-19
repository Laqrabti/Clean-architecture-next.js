use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::env;

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello from Rust server!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Read port from env or default to 8080
    let port: u16 = env::var("PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(8080);

    // Bind to localhost only; set to 0.0.0.0 to expose on LAN
    let host = "127.0.0.1";

    println!("Starting server at http://{}:{}", host, port);

    // Helpful for dev backtraces
    env::set_var("RUST_BACKTRACE", "1");

    HttpServer::new(|| App::new().service(index))
        .bind((host, port))?
        .run()
        .await
}
