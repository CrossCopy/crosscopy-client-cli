#![allow(unused_variables)]

#[macro_use]
extern crate serde_derive;
extern crate termion;
use std::io::{stdout, Write};
use atty::Stream;
use termion::{color, style};
use clap::{CommandFactory, Parser};

mod argparse;
mod services;
mod types;
mod utils;

use argparse::definition::{XCArgs, XCCommands, print_completions};
use argparse::parser::{LoginParser, SettingParser};
use argparse::configuration::context::{Context, ContextInitParams};
use argparse::stdin_reader;
use services::listen::ListenService;
use services::login::LoginService;
use services::register::RegisterService;
use services::types::{CommandName, Service};
use utils::exp::start_variable_height_editor;






fn main() {
    let mut ctx = Context::default();
    let args = XCArgs::parse();

    match args.debug {
        n if n > 2 => ctx.debug_level = 2,
        n => ctx.debug_level = n,
    }

    match args.verbose {
        n if n > 2 => ctx.verbose_level = 2,
        n => ctx.verbose_level = n,
    }

    // validate_email("");
    match &args.command {
        XCCommands::Register { email, password } => {
            ctx.cmd_name = CommandName::Register;
            let register_service = RegisterService {
                email: String::from(""),
                password: String::from(""),
            };
            register_service.run();
        }
        XCCommands::Login { email, password } => {
            ctx.cmd_name = CommandName::Login;
            let e = LoginParser::parse_email(email);
            let e = String::from("email");
            let p = LoginParser::parse_password(password);
            println!("pass: {p}");

            let login_service = LoginService {
                email: e,
                password: p,
            };
            login_service.run();
        }
        XCCommands::Setting { command } => {
            ctx.cmd_name = CommandName::Setting;
            SettingParser::parse_setting_command(&command)
        }
        XCCommands::Logout {} => {
            ctx.cmd_name = CommandName::Logout;
        }
        XCCommands::Listen {} => {
            ctx.cmd_name = CommandName::Listen;
            let listen_service = ListenService {};
            println!("{:?}", listen_service);
            listen_service.run();
        }
        XCCommands::Sync {} => {
            ctx.cmd_name = CommandName::Sync;
        }
        XCCommands::Copy {
            image_file,
            text_file,
            text_editor,
            image_stdin
        } => {
            ctx.cmd_name = CommandName::Copy;
            if atty::is(Stream::Stdin) {
                if *text_editor {
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
                } else {
                    let prompt = "Enter Text Below, and press Ctrl + D to finish";
                    println!("{}{prompt}", color::Fg(color::Blue));
                    println!("{}{}", "=".repeat(prompt.len()), style::Reset);
                    let stdin_bytes = stdin_reader::read_buffer_from_stdin();
                    let stdin_text = String::from_utf8(stdin_bytes.clone()).expect("Invalid UTF-8");

                    println!("{}{}{}", color::Fg(color::Blue), "=".repeat(prompt.len()), style::Reset);

                    println!("{}{}{}", color::Fg(color::LightGreen), stdin_text, style::Reset);
                    // stdout().write_all(&stdin_bytes).unwrap(); // you can `cat img.png | xc copy` with this
                }
            } else {
                let stdin_bytes = stdin_reader::read_buffer_from_stdin();
                let stdin_text = String::from_utf8(stdin_bytes.clone()).expect("Invalid UTF-8");
                stdout().write_all(&stdin_bytes).unwrap(); // you can `cat img.png | xc copy` with this
            }
        }
        XCCommands::Paste {
            file,
            id,
            clipboard,
        } => {
            ctx.cmd_name = CommandName::Paste;
        }
        XCCommands::Search { keywords } => {
            ctx.cmd_name = CommandName::Search;
        }
        XCCommands::View {
            text,
            image,
            number,
        } => {
            ctx.cmd_name = CommandName::View;
        }
        XCCommands::GenerateCompletion {
            shell
        } => {
            let mut cmd = XCArgs::command();
            print_completions(*shell, &mut cmd);
        }
    }

    let mut ctx_init_params = ContextInitParams::default();

    if let Some(config_dir) = args.config_dir {
        ctx_init_params.config_dir = config_dir;
    }

    if let Some(data_dir) = args.data_dir {
        ctx_init_params.data_dir = data_dir;
    }

    ctx.init(Some(&ctx_init_params)).validate();
}
