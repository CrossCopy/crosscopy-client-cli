use std::{error::Error, path::PathBuf, process};
use crate::types::args::{CopyArgs, CopyMode, ServiceArgs};

pub struct CopyParser {}

impl CopyParser {
    pub fn parse_file_path(path: &Option<PathBuf>) -> Option<PathBuf> {
        path.as_ref().map(|path| path.clone())
    }

    /// return Result OK if only 1 of the options are true
    pub fn validate(
        image_file: Option<PathBuf>,
        text_file: Option<PathBuf>,
        text_editor: bool,
        image_stdin: bool,
    ) -> Result<(), Box<dyn Error>> {
        let mut count = 0;
        if image_file.is_some() {
            count += 1;
        }
        if text_file.is_some() {
            count += 1;
        }
        if text_editor {
            count += 1;
        }
        if image_stdin {
            count += 1;
        }
        if count <= 1 {
            Ok(())
        } else {
            Err("At most one of the flags can be used".into())
        }
    }

    pub fn parse(image_file: &Option<PathBuf>,
                 text_file: &Option<PathBuf>,
                 text_editor: &bool,
                 image_stdin: &bool) -> CopyArgs {
        let image_file_transformed = CopyParser::parse_file_path(image_file);
        let text_file_transformed = CopyParser::parse_file_path(text_file);
        let validate_res = CopyParser::validate(image_file_transformed.clone(), text_file_transformed.clone(), *text_editor, *image_stdin);
        if validate_res.is_err() {
            eprintln!("Error: {}", validate_res.err().unwrap());
            process::exit(1);
        }
        let mut path: Option<PathBuf> = None;
        let mut mode: CopyMode;
        if image_file_transformed.is_some() {
            path = image_file_transformed;
            mode = CopyMode::ImageFile;
        } else if text_file_transformed.is_some() {
            path = text_file_transformed;
            mode = CopyMode::TextFile;
        } else if *text_editor {
            mode = CopyMode::TextEditor;
        } else if *image_stdin {
            mode = CopyMode::ImageStdin;
        } else {
            mode = CopyMode::TextStdin;
        }
        CopyArgs { mode, path }
    }
}
