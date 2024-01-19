use sysinfo::{Pid, ProcessRefreshKind, System};

#[derive(serde::Serialize, Debug)]
struct ProcessInfo {
    pid: u32,
    name: String,
    cpu_usage: f32,
}

#[tauri::command]
fn get_processes() -> Vec<ProcessInfo> {
    let mut system = System::new_all();
    system.refresh_processes();

    system
        .processes()
        .iter()
        .map(|(&pid, process)| {
            ProcessInfo {
                pid: pid.as_u32(),
                name: process.name().to_string(),
                cpu_usage: process.cpu_usage(),
                // Map additional information if needed
            }
        })
        .collect()
}
