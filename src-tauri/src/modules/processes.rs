use sysinfo::{Pid, ProcessStatus, System};

#[derive(serde::Serialize, Debug)]
pub struct ProcessInfo {
    pid: u32,
    name: String,
    cpu_usage: f32,
}

#[tauri::command]
pub fn get_processes() -> Vec<ProcessInfo> {
    let mut system = System::new_all();
    system.refresh_processes();

    system
        .processes()
        .iter()
        .filter(|(_, process)| process.status() == ProcessStatus::Run)
        .map(|(&pid, process)| ProcessInfo {
            pid: pid.as_u32(),
            name: process.name().to_string(),
            cpu_usage: process.cpu_usage(),
        })
        .collect()
}

#[tauri::command]
pub fn kill_process(pid: u32) -> Result<(), String> {
    let mut system = System::new_all();
    system.refresh_process(Pid::from_u32(pid));
    match system.process(Pid::from_u32(pid)) {
        Some(process) => {
            if process.kill() {
                Ok(())
            } else {
                Err("Failed to kill process".into())
            }
        }
        None => Err("Process not found".into()),
    }
}
