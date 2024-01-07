use sysinfo::System;
use tauri::State;

#[tauri::command]
pub fn get_cpu_usage(system: State<'_, System>) -> f32 {
    system.global_cpu_info().cpu_usage()
}

#[tauri::command]
pub fn get_memory_usage(system: State<'_, System>) -> (u64, u64) {
    (system.total_memory(), system.used_memory())
}
