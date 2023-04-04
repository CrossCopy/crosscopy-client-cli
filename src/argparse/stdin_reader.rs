extern crate termion;

use std::io::{stdin, stdout, Read, Write};
use std::{io, process};
use std::fs::File;

use crate::utils::validator;
use termion::input::TermRead;

pub fn read_email(email: &Option<String>) -> String {
    match email {
        Some(email) => {
            let val_res = validator::validate_email(email);
            match val_res {
                Ok(()) => String::from(email),
                Err(err) => {
                    eprintln!("{}", err);
                    let e = read_email(&None);
                    e
                }
            }
        }
        None => {
            let stdin = stdin();
            let stdout = stdout();
            let mut stdout_handle = stdout.lock();
            let mut stdin_handle = stdin.lock();

            stdout_handle.write_all(b"Enter your email: ").unwrap();
            stdout_handle.flush().unwrap();

            let email = stdin_handle.read_line();
            drop(stdin_handle);
            match email {
                Ok(Some(mut email)) => {
                    drop(stdout_handle);
                    email = read_email(&Some(email));
                    email
                }
                _ => {
                    stdout_handle.write_all(b"Error Reading Email\n").unwrap();
                    drop(stdout_handle);
                    process::exit(1);
                }
            }
        }
    }
}

pub fn read_password(password: &Option<String>) -> String {
    match password {
        Some(password) => {
            let mut pass = String::from(password);
            if pass.len() < 8 {
                eprintln!("Password must be longer than 8 characters.");
                pass = read_password(&None);
            }
            pass
        }
        None => {
            let stdin = stdin();
            let stdout = stdout();
            let mut stdout_handle = stdout.lock();
            let mut stdin_handle = stdin.lock();

            stdout_handle.write_all(b"Enter your password: ").unwrap();
            stdout_handle.flush().unwrap();

            let pass = stdin_handle.read_passwd(&mut stdout_handle);
            drop(stdin_handle);
            match pass {
                Ok(Some(mut pass)) => {
                    stdout_handle
                        .write_all("*".repeat(pass.len()).as_bytes())
                        .unwrap();
                    stdout_handle.write_all(b"\n").unwrap();
                    drop(stdout_handle);
                    pass = read_password(&Some(pass));
                    pass
                }
                _ => {
                    stdout_handle
                        .write_all(b"Error Reading Password\n")
                        .unwrap();
                    drop(stdout_handle);
                    process::exit(1);
                }
            }
        }
    }
}

// fn read_buffer_from_stdin() -> String {
//     let stdin = stdin();
//     let mut stdin_handle = stdin.lock();
//     let mut buffer = String::new();
//     stdin_handle.read_line(&mut buffer).unwrap();
//     buffer
// }

pub fn read_buffer_from_stdin() -> Vec<u8> {
    let stdin = stdin();
    let mut stdin_handle = stdin.lock();
    let mut buffer = Vec::new();

    stdin_handle.read_to_end(&mut buffer);
    buffer
}

pub fn write_buffer_to_file(filename: &str, buffer: &Vec<u8>) -> io::Result<()> {
    let mut file = File::create(filename)?;
    file.write_all(buffer)?;
    Ok(())
}