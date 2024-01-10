use sysinfo::{CpuRefreshKind, RefreshKind, System};

#[derive(serde::Serialize)]
pub struct CpuInfo {
    name: String,
    usage: f32,
}

#[tauri::command]
pub fn get_cpu_usage() -> f32 {
    let mut system = System::new();
    system.refresh_cpu();
    system.global_cpu_info().cpu_usage()
}

#[tauri::command]
pub fn get_memory_usage() -> (u64, u64) {
    let mut system = System::new();
    system.refresh_memory();
    (system.total_memory(), system.used_memory())
}

#[tauri::command]
pub fn get_cpus_info() -> Vec<CpuInfo> {
    let mut system =
        System::new_with_specifics(RefreshKind::new().with_cpu(CpuRefreshKind::everything()));
    std::thread::sleep(sysinfo::MINIMUM_CPU_UPDATE_INTERVAL);
    system.refresh_cpu();
    system
        .cpus()
        .iter()
        .map(|cpu| CpuInfo {
            name: cpu.name().to_string(),
            usage: cpu.cpu_usage(),
        })
        .collect()
}
