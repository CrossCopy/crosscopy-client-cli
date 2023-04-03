use crate::argparse::definition::{SettingCommands, SettingServerCommands};

pub struct SettingParser {}

impl SettingParser {
    pub fn parse_setting_command(command: &SettingCommands) {
        match &command {
            SettingCommands::Server(setting_server_args) => match setting_server_args.command {
                SettingServerCommands::Add {} => {}
                SettingServerCommands::List {} => {}
                SettingServerCommands::Select {} => {}
                SettingServerCommands::Delete {} => {}
            },
        }
    }
}

