// This file contains the interface between command line argument parser and command handler
use std::path::PathBuf;



pub struct LoginArgs {
    email: String,
    password: String,
}

pub struct RegisterArgs {
    email: String,
    password: String,
}

pub struct SettingArgs {}

pub struct LogoutArgs {}

pub struct ListenArgs {}

pub struct SyncArgs {}

pub enum CopyMode {
    TextFile,
    ImageFile,
    Stdin
}

pub struct CopyArgs {
    mode: CopyMode,
    /// is none is CopyMode is stdin
    path: Option<PathBuf>
}

pub struct PasteArgs {
    clipboard: bool,
    file_path: Option<PathBuf>,
    /// id is not u32 because we need to use -1 to represent the latest record
    id: i32,
}

pub struct SearchArgs {
    keywords: String,
}

pub struct View {
    text: bool,
    image: bool,
    number: u32,
}
