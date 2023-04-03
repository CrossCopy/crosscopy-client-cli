// See https://docs.rs/clap/latest/clap/_derive/_tutorial/index.html
#![allow(unused_variables)]

mod argparse;
mod commands;
pub mod types;

use clap::Parser;

#[macro_use]
extern crate serde_derive;

use crate::argparse::configuration::context::{Context, ContextInitParams};
use crate::commands::types::CommandName;
use argparse::definition::{SettingCommands, SettingServerCommands, XCArgs, XCCommands};
use argparse::parser::{LoginParser, SettingParser};

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

    

    match &args.command {
        XCCommands::Register { email, password } => {
            ctx.cmd_name = CommandName::Register;
        }
        XCCommands::Login { email, password } => {
            ctx.cmd_name = CommandName::Login;
            match email {
                Some(email) => println!("Email: {}", email),
                None => println!("No Email"),
            };

            match password {
                Some(password) => println!("Password: {}", password),
                None => println!("No Password"),
            }
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
        }
        XCCommands::Sync {} => {
            ctx.cmd_name = CommandName::Sync;
        }
        XCCommands::Copy {
            image_file,
            text_file,
        } => {
            ctx.cmd_name = CommandName::Copy;
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
    }

    let mut ctx_init_params = ContextInitParams::default();


    if let Some(config_dir) = args.config_dir {
        ctx_init_params.config_dir = config_dir;
    }

    if let Some(data_dir) = args.data_dir {
        ctx_init_params.data_dir = data_dir;
    }


    ctx.init(Some(&ctx_init_params)).validate();
    println!("{:?}", ctx);
}
