// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use modules::system_info::{get_cpu_usage, get_memory_usage};
use sysinfo::System;

fn main() {
    let mut system = System::new_all();
    system.refresh_all();

    tauri::Builder::default()
        .manage(system)
        .invoke_handler(tauri::generate_handler![get_cpu_usage, get_memory_usage])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
