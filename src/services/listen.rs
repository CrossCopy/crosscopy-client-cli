use crate::services::types::Service;
use clipboard_master::{Master, ClipboardHandler, CallbackResult};


use std::io;

struct Handler;

impl ClipboardHandler for Handler {
    fn on_clipboard_change(&mut self) -> CallbackResult {
        println!("Clipboard change happened!");
        CallbackResult::Next
    }

    fn on_clipboard_error(&mut self, error: io::Error) -> CallbackResult {
        eprintln!("Error: {}", error);
        CallbackResult::Next
    }
}

#[derive(Debug)]
pub struct ListenService {}

// impl ListenService {
//     pub fn run(&self) {
//         let _ = Master::new(Handler).run();
//     }
// }

impl Service for ListenService {
    fn run(&self) {
        let _ = Master::new(Handler).run();
    }
}