// refer to https://oclif.io/docs/config
use crate::commands::types::CommandName;
use std::fs;
use std::path::{Path, PathBuf};
use std::process;
use serde_json;

#[derive(Default, Debug)]
pub struct Context {
    pub debug_level: u8,
    pub verbose_level: u8,
    /// directory containing all data
    pub data_dir: PathBuf,
    /// directory containing the configuration files
    pub config_dir: PathBuf,
    pub cmd_name: CommandName,
}



pub enum Platform {
    Linux,
    Windows,
    MacOS,
    Ios,
    Android,
    Unknown,
}

pub enum Arch {
    X86,
    X86_64,
    Arm,
    Unknown,
}

#[derive(Debug)]
pub struct ContextInitParams {
    pub data_dir: PathBuf,
    pub config_dir: PathBuf,
}

impl Default for ContextInitParams {
    fn default() -> Self {
        ContextInitParams {
            data_dir: dirs::data_dir().unwrap(),
            config_dir: dirs::config_dir().unwrap(),
        }
    }
}

impl Context {
    pub fn db_path(&self) -> PathBuf {
        Path::new(&self.data_dir).join("db.sqlite")
    }

    pub fn config_path(&self) -> PathBuf {
        Path::new(&self.config_dir).join("config.json")
    }

    pub fn init(&mut self, options: Option<&ContextInitParams>) -> &Self {
        match options {
            Some(options) => {
                self.data_dir = options.data_dir.clone();
                self.config_dir = options.config_dir.clone();
            }
            None => {
                self.data_dir = dirs::data_dir().unwrap();
                self.config_dir = dirs::config_dir().unwrap();
            }
        }
        
        self.data_dir.push("CrossCopy");
        self.config_dir.push("CrossCopy");

        if !self.data_dir.exists() {
            if let Err(err) = fs::create_dir_all(&self.data_dir) {
                eprintln!("Error creating directory: {}", err);
                process::exit(1);
            } else {
                eprintln!("Created directory: {}", self.data_dir.display());
            }
        }
        // check existence of config_dir
        if !self.config_dir.exists() {
            if let Err(err) = fs::create_dir_all(&self.config_dir) {
                eprintln!("Error creating directory: {}", err);
                process::exit(1);
            } else {
                eprintln!("Created directory: {}", self.data_dir.display());
            }
        }

        // create config file if it doesn't exist
        if !self.config_path().exists() {
            let config = serde_json::json!({
                "debug_level": 0,
                "verbose_level": 0,
            });
            if let Err(err) = serde_json::to_writer_pretty(
                fs::File::create(&self.config_path()).unwrap(),
                &config,
            ) {
                eprintln!("Error creating config file: {}", err);
                process::exit(1);
            } else {
                eprintln!("Created config file: {}", self.config_path().display());
            }
        }

        // if sqlite db file doesn't exist, initialize it with schema
        // if !self.db_path().exists() {
        //     todo!("initialize sqlite db with schema")
        // }

        self
    }

    pub fn arch() -> &'static str {
        // TODO: Implement this
        // Arch::Unknown
        std::env::consts::ARCH
    }

    pub fn platform() -> Platform {
        match std::env::consts::OS {
            "linux" => Platform::Windows,
            "macos" => Platform::MacOS,
            "ios" => Platform::Ios,
            "android" => Platform::Android,
            "windows" => Platform::Windows,
            _ => Platform::Unknown,
        }
    }

    pub fn validate(&self) -> &Self {
        // check if self.data_dir is empty string (uninitialized)
        if self.data_dir.to_str().unwrap().is_empty() {
            eprintln!("Error: data_dir is empty");
            process::exit(1);
        }
        // check if self.config_dir is empty string (uninitialized)
        if self.config_dir.to_str().unwrap().is_empty() {
            eprintln!("Error: config_dir is empty");
            process::exit(1);
        }

        self
    }
}
