// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::System;
use tauri::State;

#[tauri::command]
fn get_cpu_usage(system: State<'_, System>) -> f32 {
    system.global_cpu_info().cpu_usage()
}

#[tauri::command]
fn get_memory_usage(system: State<'_, System>) -> (u64, u64) {
    (system.total_memory(), system.used_memory())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    let mut system = System::new_all();
    system.refresh_all();

    tauri::Builder::default()
        .manage(system)
        .invoke_handler(tauri::generate_handler![
            greet,
            get_cpu_usage,
            get_memory_usage
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
