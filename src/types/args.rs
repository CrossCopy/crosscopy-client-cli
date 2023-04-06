// This file contains the interface between command line argument parser and command handler
use std::path::PathBuf;

pub trait ServiceArgs {}

pub struct LoginArgs {
    pub email: String,
    pub password: String,
}
impl ServiceArgs for LoginArgs {}

pub struct RegisterArgs {
    pub email: String,
    pub password: String,
}
impl ServiceArgs for RegisterArgs {}

pub struct SettingArgs {}
impl ServiceArgs for SettingArgs {}

pub struct LogoutArgs {}
impl ServiceArgs for LogoutArgs {}

pub struct ListenArgs {}
impl ServiceArgs for ListenArgs {}

pub struct SyncArgs {}
impl ServiceArgs for SyncArgs {}

#[derive(PartialEq, Debug)]
pub enum CopyMode {
    TextFile,
    ImageFile,
    ImageStdin,
    TextStdin,
    TextEditor, // I may remove this, this is just for fun
}
#[derive(Debug)]
pub struct CopyArgs {
    pub mode: CopyMode,
    /// is none is CopyMode is stdin
    pub path: Option<PathBuf>,
}
impl ServiceArgs for CopyArgs {}

pub struct PasteArgs {
    pub clipboard: bool,
    pub file_path: Option<PathBuf>,
    /// id is not u32 because we need to use -1 to represent the latest record
    pub id: i32,
}
impl ServiceArgs for PasteArgs {}

pub struct SearchArgs {
    keywords: String,
}
impl ServiceArgs for SearchArgs {}

pub struct ViewArgs {
    text: bool,
    image: bool,
    number: u32,
}
impl ServiceArgs for ViewArgs {}
