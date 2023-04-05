use crossterm::event::{DisableMouseCapture, EnableMouseCapture};
use crossterm::terminal::{
    disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen,
};
use std::cmp;
use std::io;
use tui::backend::CrosstermBackend;
use tui::layout::{Constraint, Direction, Layout};
use tui::widgets::{Block, Borders};
use tui::Terminal;
use tui_textarea::{Input, Key, TextArea};


pub fn start_variable_height_editor() -> Result<Vec<String>, std::io::Error> {
    let stdout = io::stdout();
    let mut stdout = stdout.lock();

    enable_raw_mode()?;
    crossterm::execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut term = Terminal::new(backend)?;

    let mut textarea = TextArea::default();
    textarea.set_block(
        Block::default()
            .borders(Borders::ALL)
            .title("Enter Text and Press Esc to Exit"),
    );

    loop {
        term.draw(|f| {
            const MIN_HEIGHT: usize = 3;
            let height = cmp::max(textarea.lines().len(), MIN_HEIGHT) as u16 + 2; // + 2 for borders
            let chunks = Layout::default()
                .direction(Direction::Vertical)
                .constraints([Constraint::Length(height), Constraint::Min(0)].as_slice())
                .split(f.size());
            f.render_widget(textarea.widget(), chunks[0]);
        })?;


        // let x = crossterm::event::read().unwrap();
        // match x {
        //     Input { key: Key::Esc, .. } => break,
        //     input => {
        //         textarea.input(input);
        //     }
        // }

        match crossterm::event::read()?.into() {
            Input { key: Key::Esc, .. } => break,
            input => {
                textarea.input(input);
            }
        }
    }

    disable_raw_mode()?;
    crossterm::execute!(
        term.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    term.show_cursor()?;
    let lines = textarea.lines();
    // turn lines in to a vector of strings
    let lines: Vec<String> = lines.iter().map(|s| s.to_string()).collect();
    
    Ok(lines)
}