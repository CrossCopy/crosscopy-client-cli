use crate::argparse::configuration::context::Context;
use crate::services::types::Service;
use crate::types::args::{RegisterArgs, ServiceArgs};

pub struct RegisterService {
    pub args: RegisterArgs,
}

impl Service for RegisterService {
    fn args(&self) -> &dyn ServiceArgs {
        &self.args
    }
    fn run(&self, ctx: &Context) {

    }
}