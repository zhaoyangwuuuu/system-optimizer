// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use modules::processes::get_processes;
use modules::system_info::{get_cpu_usage, get_cpus_info, get_memory_usage};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_cpu_usage,
            get_memory_usage,
            get_cpus_info,
            get_processes,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
