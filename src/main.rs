#![allow(unused_variables)]

#[macro_use]
extern crate serde_derive;
extern crate termion;

use clap::{CommandFactory, Parser};
use std::{process};

mod argparse;
mod services;
mod types;
mod utils;

use argparse::definition::{XCArgs, XCCommands, print_completions};
use argparse::parser::{LoginParser, SettingParser, CopyParser};
use argparse::configuration::context::{Context, ContextInitParams};
use services::listen::ListenService;
use services::login::LoginService;
use services::register::RegisterService;
use services::types::{CommandName, Service};
use services::copy::CopyService;
use crate::argparse::parser::RegisterParser;
use crate::types::args::ListenArgs;


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
            let register_args = RegisterParser::parse(email, password);
            let register_service = RegisterService { args: register_args };
            register_service.run(&ctx);
        }
        XCCommands::Login { email, password } => {
            ctx.cmd_name = CommandName::Login;
            let login_args = LoginParser::parse(email, password);
            let login_service = LoginService { args: login_args };
            login_service.run(&ctx);
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
            let listen_service = ListenService { args: ListenArgs {} };
            listen_service.run(&ctx);
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
            let copy_args = CopyParser::parse(image_file, text_file, text_editor, image_stdin);
            let copy_service = CopyService { args: copy_args };
            copy_service.run(&ctx);
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
