use std::path::PathBuf;
// mod commands::login;
// use commands::login::LoginArgs;
mod commands;
use clap::{arg, command, value_parser, Arg, ArgAction, Command};

fn main() {
    let x = commands::login::LoginArgs {
        email: String::from("huakun.shen@gmail.com"),
        password: String::from("pass"),
    };
    // Ref: https://docs.rs/clap/latest/clap/_tutorial/index.html
    let matches = command!() // requires `cargo` feature
        .arg(arg!(-d --debug "Debug Mode").action(ArgAction::SetTrue))
        .arg(
            Arg::new("verbose")
                .short('v')
                .long("verbose")
                .action(ArgAction::Count),
        )
        .subcommand(Command::new("register").about("Register a new account"))
        .subcommand(Command::new("login").about("Login"))
        .subcommand(Command::new("logout").about("Logout"))
        .subcommand(
            Command::new("setting").about("App Setting").subcommand(
                Command::new("server")
                    .about("Multi-Server Setting")
                    .subcommand(Command::new("list").about("List all server profiles"))
                    .subcommand(Command::new("add").about("Add new server profile"))
                    .subcommand(Command::new("select").about("Select server profile"))
                    .subcommand(Command::new("delete").about("Delete server profile")),
            ),
        )
        .subcommand(Command::new("listen").about("Realtime syncing clipboard with other devices"))
        .subcommand(Command::new("sync").about("Sync clipboard Data"))
        .subcommand(Command::new("copy").about("Copy input data to clipboard"))
        .subcommand(
            Command::new("paste")
                .about("Output clipboard data")
                .arg(
                    arg!(
                        -f --file <FILE> "File path to save"
                    )
                    // We don't have syntax yet for optional options, so manually calling `required`
                    .required(false)
                    .value_parser(value_parser!(PathBuf)),
                )
                .arg(arg!(--id <VALUE> "Index of clipboard item").required(false)), // TODO: this has to be an integer, check how to parse int,
        )
        .subcommand(Command::new("search").about("Search for clipboard data"))
        .subcommand(
            Command::new("view")
                .about("View clipboard content")
                .arg(arg!(--text).action(ArgAction::SetTrue))
                .arg(arg!(--image).action(ArgAction::SetTrue)),
        )
        .get_matches();

    if let Some(matches) = matches.subcommand_matches("paste") {
        if let Some(config_path) = matches.get_one::<PathBuf>("file") {
            println!("Filename: {}", config_path.display());
        } else {
            println!("No Filename Given");
            println!(
                "id: {:?}",
                matches.get_one::<String>("id").expect("required")
            );
        }
    }

    match matches
        .get_one::<u8>("verbose")
        .expect("Count's are defaulted")
    {
        0 => println!("Verbose mode is off"),
        1 => println!("Verbose mode is kind of on"),
        2 => println!("Verbose mode is on"),
        _ => println!("Don't be crazy"),
    }

    let debug = matches.get_flag("debug");
    match debug.clone() {
        true => println!("Debug Mode is On"),
        false => println!("Debug Mode is Off"),
    }
    println!("Debug Mode: {}", debug);

    if let Some(matches) = matches.subcommand_matches("view") {
        // "$ myapp test" was run
        if matches.get_flag("text") {
            // "$ myapp test -l" was run
            println!("text only");
        } else {
            println!("not text only");
        }
    }
}
