// This file contains the interface between command line argument parser and command handler
use std::path::PathBuf;


pub struct LoginArgs {
    pub email: String,
    pub password: String,
}

pub struct RegisterArgs {
    pub email: String,
    pub password: String,
}

pub struct SettingArgs {}

pub struct LogoutArgs {}

pub struct ListenArgs {}

pub struct SyncArgs {}

#[derive(PartialEq, Debug)]
pub enum CopyMode {
    TextFile,
    ImageFile,
    ImageStdin,
    TextStdin,
    TextEditor, // I may remove this, this is just for fun
}

pub struct CopyArgs {
    pub mode: CopyMode,
    /// is none is CopyMode is stdin
    pub path: Option<PathBuf>,
}

pub struct PasteArgs {
    pub clipboard: bool,
    pub file_path: Option<PathBuf>,
    /// id is not u32 because we need to use -1 to represent the latest record
    pub id: i32,
}

pub struct SearchArgs {
    keywords: String,
}

pub struct ViewArgs {
    text: bool,
    image: bool,
    number: u32,
}
