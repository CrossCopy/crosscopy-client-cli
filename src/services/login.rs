use crate::argparse::configuration::context::Context;
use crate::services::types::Service;
use crate::types::args::LoginArgs;

pub struct LoginService {
    pub args: LoginArgs,
}

impl Service for LoginService {
    fn run(&self, ctx: &Context) {
        println!("{:?}", ctx);
    }
}
