### Prerequisites

Before running System Optimizer, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/)

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/system-optimizer.git
   cd system-optimizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. To build the Tauri application:

   ```bash
   npm run tauri build
   ```

### FAQ

1.Having permission denied errors:

```bash
KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied
Failed to create GBM buffer of size 800x600: Permission denied
KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied
Failed to create GBM buffer of size 800x600: Permission denied
KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied
Failed to create GBM buffer of size 800x600: Permission denied
Failed to create EGL images for DMABufs with file descriptors -1, -1 and -1
```

Set

```bash
export WEBKIT_DISABLE_DMABUF_RENDERER=1
```
