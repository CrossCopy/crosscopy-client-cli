use crate::argparse::configuration::context::Context;
use crate::types::args::ServiceArgs;

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
    fn args(&self) -> &dyn ServiceArgs;
    fn run(&self, ctx: &Context);
    // fn name(&self) -> &str;
}
