use crate::services::types::Service;
use atty;
use atty::Stream;
use termion::{color, style};
use std::io::{stdout, Write};
use std::path::PathBuf;
use std::process;
use crate::argparse::configuration::context::Context;

use crate::argparse::stdin_reader;
use crate::types::args::{CopyArgs, CopyMode, ServiceArgs};
use crate::utils::exp::start_variable_height_editor;

pub struct CopyService {
    pub args: CopyArgs,
}

impl Service for CopyService {
    fn args(&self) -> &dyn ServiceArgs {
        &self.args
    }
    fn run(&self, ctx: &Context) {
        if atty::is(Stream::Stdin) {
            if self.args.mode == CopyMode::TextEditor {
                let lines = start_variable_height_editor();
                match lines {
                    Ok(lines) => {
                        // println!("lines: {:?}", lines);
                        let joined_lines = lines.join("\n");
                        println!("{}", joined_lines);
                    }
                    Err(err) => {
                        eprintln!("{}", err);
                    }
                };
            } else if self.args.mode == CopyMode::TextStdin {
                let prompt = "Enter Text Below, and press Ctrl + D to finish";
                println!("{}{prompt}", color::Fg(color::Blue));
                println!("{}{}", "=".repeat(prompt.len()), style::Reset);
                let stdin_bytes = stdin_reader::read_buffer_from_stdin();
                let stdin_text = String::from_utf8(stdin_bytes.clone()).expect("Invalid UTF-8");

                println!("{}{}{}", color::Fg(color::Blue), "=".repeat(prompt.len()), style::Reset);

                println!("{}{}{}", color::Fg(color::LightGreen), stdin_text, style::Reset);
                // stdout().write_all(&stdin_bytes).unwrap(); // you can `cat img.png | xc copy` with this
            }
        } else if self.args.mode == CopyMode::ImageStdin {
            let stdin_bytes = stdin_reader::read_buffer_from_stdin();
            let stdin_text = String::from_utf8(stdin_bytes.clone()).expect("Invalid UTF-8");
            stdout().write_all(&stdin_bytes).unwrap(); // you can `cat img.png | xc copy` with this
        } else if self.args.mode == CopyMode::ImageFile {
            todo!()
        } else if self.args.mode == CopyMode::TextFile {
            todo!()
        } else {
            eprintln!("Unexpected Error: Unsupported Copy Mode ({:?})", self.args.mode);
            process::exit(1);
        }
    }
}