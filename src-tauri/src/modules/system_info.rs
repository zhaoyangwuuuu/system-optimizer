use std::sync::Mutex;
use sysinfo::System;
use tauri::State;

#[tauri::command]
pub fn get_cpu_usage(system: State<'_, Mutex<System>>) -> f32 {
    let mut system = system.lock().unwrap();
    system.refresh_cpu();
    system.global_cpu_info().cpu_usage()
}

#[tauri::command]
pub fn get_memory_usage(system: State<'_, Mutex<System>>) -> (u64, u64) {
    let mut system = system.lock().unwrap();
    system.refresh_memory();
    (system.total_memory(), system.used_memory())
}
