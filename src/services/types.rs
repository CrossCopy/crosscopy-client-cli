use crate::argparse::configuration::context::Context;

#[derive(Debug)]
pub enum CommandName {
    Login,
    Register,
    Setting,
    Logout,
    Listen,
    Sync,
    Copy,
    Paste,
    Search,
    View,
    Default,
}

impl Default for CommandName {
    fn default() -> Self {
        CommandName::Default
    }
}

/// Command handler
pub trait Service {
    fn run(&self, ctx: &Context);
}