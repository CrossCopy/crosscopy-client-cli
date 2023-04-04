use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Subcommand, Debug)]
pub enum XCCommands {
    /// Register a new account
    Register {
        #[arg(short, long)]
        email: Option<String>,

        #[arg(short, long)]
        password: Option<String>,
    },
    /// Login to CrossCopy
    Login {
        #[arg(short, long)]
        email: Option<String>,

        #[arg(short, long)]
        password: Option<String>,
    },
    /// Logout on this computer and clear all data
    Logout {},
    /// Check or update app setting
    Setting {
        #[command(subcommand)]
        command: SettingCommands,
    },
    /// Listening to update and sync with other connected devices
    Listen {},
    /// Sync local clipboard history with cloud
    Sync {},
    /// Save content to Clipboard (support stdin for text format)
    Copy {
        // by default, copy command will read from stdin for content piped into crosscopy
        #[arg(long, help = "Image path, will be written to clipboard as image")]
        image_file: Option<PathBuf>,

        #[arg(long, help = "Text File path (No Binary)")]
        text_file: Option<PathBuf>,

        #[arg(long, help = "Use a Text Editor UI")]
        text_editor: bool,

        #[arg(long, help = "Image is piped in from stdin")]
        image_stdin: bool,
        // TODO: May support this in future, we only have text and image type for now
        // #[arg(short, long, help = "File to save content to")]
        // binary_file: Option<PathBuf>,
    },
    /// Output clipboard data
    Paste {
        #[arg(short, long, help = "File to save content to")]
        file: Option<PathBuf>,

        #[arg(short, long, help = "Paste data to clipboard")]
        clipboard: bool,

        #[arg(short, long, help = "id of clipboard item (default: latest)")]
        id: Option<u32>,
    },
    /// Search clipboard history with keywords
    Search {
        keywords: Option<String>,

        // TODO: consider supporting other types of filters such as sizes
    },
    /// View clipboard data
    View {
        #[arg(short, long, help = "Display only text in clipboard")]
        text: bool,

        #[arg(short, long, help = "Display only images in clipboard")]
        image: bool,

        #[arg(short, long, help = "Limit number of records to display")]
        number: u32,
    },
}

#[derive(Subcommand, Debug)]
pub enum SettingServerCommands {
    List {},
    Add {},
    Select {},
    Delete {},
}

#[derive(Debug, Parser)]
pub struct SettingServerArgs {
    #[command(subcommand)]
    pub command: SettingServerCommands,
}

#[derive(Subcommand, Debug)]
pub enum SettingCommands {
    Server(SettingServerArgs),
}

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None, next_line_help = false)]
pub struct XCArgs {
    #[command(subcommand)]
    pub command: XCCommands,

    #[arg(short, long, action = clap::ArgAction::Count)]
    pub verbose: u8,

    /// Turn debugging information on
    #[arg(short, long, action = clap::ArgAction::Count)]
    pub debug: u8,

    /// custom config path
    pub config_dir: Option<PathBuf>,

    /// custom data path
    pub data_dir: Option<PathBuf>,

}
