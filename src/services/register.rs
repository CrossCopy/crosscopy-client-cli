use crate::argparse::configuration::context::Context;
use crate::services::types::Service;
use crate::types::args::RegisterArgs;

pub struct RegisterService {
    pub args: RegisterArgs,
}

impl Service for RegisterService {
    fn run(&self, ctx: &Context) {

    }
}