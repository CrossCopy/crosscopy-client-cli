use std::thread;
use crate::services::types::Service;
use clipboard_master::{Master, ClipboardHandler, CallbackResult};


use std::io;
use crate::argparse::configuration::context::Context;
use crate::types::args::{ListenArgs, ServiceArgs};

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

pub struct ListenService {
    pub args: ListenArgs,
}


impl Service for ListenService {
    fn args(&self) -> &dyn ServiceArgs {
        &self.args
    }
    fn run(&self, ctx: &Context) {
        println!("Listening for clipboard update");
        let thread_handle = thread::spawn(move || {
            let _ = Master::new(Handler).run();
        });
        thread_handle.join().unwrap();
    }
}