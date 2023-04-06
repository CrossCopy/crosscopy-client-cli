use crate::argparse::configuration::context::Context;
use crate::services::types::Service;
use crate::types::args::{LoginArgs, ServiceArgs};

pub struct LoginService {
    pub args: LoginArgs,
}

impl Service for LoginService {
    fn args(&self) -> &dyn ServiceArgs {
        &self.args
    }
    fn run(&self, ctx: &Context) {
        println!("{:?}", ctx);
    }
}
