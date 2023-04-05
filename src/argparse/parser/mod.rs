/// The purpose of this argparse parser module is to handle complex argument parsing and interaction with user.
/// Sometimes we need to interact with user with stdin, as well as input data validation.
/// The logic will be very complex. So we separate the code to make things clear.
/// Ultimately an argparse should return a argument struct with all required info which will be passed to command services.
mod setting;
mod register;
mod login;
mod paste;
mod search;
mod view;
mod copy;

// We also import the parser structs so that it's easier to import
pub use setting::SettingParser;
pub use login::LoginParser;
