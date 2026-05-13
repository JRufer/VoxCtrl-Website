<?php
$page_title     = 'Installation — VoxCtr Docs';
$page_desc      = 'VoxCtr runs natively on Linux. Two install paths: AppImage (recommended) or source.';
$active_section = 'docs';
$active_doc     = 'install';
?>
<!doctype html>
<html lang="en">
<?php include '../includes/head.php'; ?>
<body>

<div class="bg-stack">
  <div class="grid-bg"></div>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-noise"></div>
</div>

<?php include '../includes/nav.php'; ?>

<div class="docs-shell">
  <?php include '../includes/docs-sidebar.php'; ?>

  <main class="docs-content" id="docsContent">
    <div class="crumbs">GETTING STARTED <span>/</span> INSTALLATION</div>
    <h1>Installation</h1>
    <p class="lede">VoxCtr runs natively on Linux. Two install paths: AppImage (recommended) or source.</p>

    <h2>Hardware compatibility</h2>
    <table class="docs-table">
      <thead><tr><th>GPU</th><th>Backend</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>NVIDIA (CUDA 11+)</td><td>faster-whisper</td><td>Install CUDA pip libs — auto-selected</td></tr>
        <tr><td>AMD RDNA / GCN</td><td>whisper.cpp + vulkan</td><td><code>whisper-cpp-vulkan</code> from AUR</td></tr>
        <tr><td>Intel Arc / Iris Xe</td><td>whisper.cpp + vulkan</td><td>Build with <code>GGML_VULKAN=ON</code></td></tr>
        <tr><td>CPU only</td><td>faster-whisper int8</td><td>Out of the box; slower for large models</td></tr>
        <tr><td>Raspberry Pi / Edge (arm)</td><td>moonshine</td><td><code>pip install moonshine-voice</code> — streaming ONNX, no GPU needed</td></tr>
      </tbody>
    </table>

    <h2>Option A: AppImage</h2>
    <p>The installer detects your package manager (apt/pacman/dnf/zypper), installs system libs, downloads Piper TTS to <code>/opt/piper</code>, creates udev rules, and adds you to the <code>input</code>/<code>uinput</code> groups.</p>
    <h3>Steps</h3>
    <ul>
      <li>Download <code>VoxCtr-x86_64.AppImage</code> from Releases</li>
      <li>Run <code>bash install.sh</code></li>
      <li>Log out and back in</li>
      <li>Launch <code>voxctr</code></li>
    </ul>
    <div class="note"><span class="icon">ⓘ</span> <code>pyatspi</code>, <code>mcp</code>, and <code>websockets</code> are bundled inside the AppImage — no manual install needed.</div>

    <h2>Option B: from source</h2>
    <h3>1. System deps (Arch)</h3>
    <p>Install portaudio, wl-clipboard, xdotool, wtype, xclip, alsa-utils, espeak-ng. Optionally socat (Claude Desktop bridge) and python-atspi.</p>
    <h3>2. Permissions</h3>
    <p>Run <code>sudo bash scripts/setup-permissions.sh</code>. Log out and back in.</p>
    <h3>3. Clone &amp; venv</h3>
    <p>Clone, create a virtualenv, and <code>pip install -r requirements.txt</code>. The requirements file includes noisereduce, dbus-python, websockets, mcp, and pyatspi.</p>
    <h3>4. NVIDIA acceleration (optional)</h3>
    <p><code>pip install nvidia-cublas-cu12 nvidia-cudnn-cu12</code></p>
    <h3>5. Launch</h3>
    <p>Run <code>./voxctr.sh</code>.</p>

    <div class="docs-foot">
      <a href="quickstart.php"><small>← previous</small><span>Quickstart</span></a>
      <a href="concepts.php" style="text-align:right;"><small>next →</small><span>Core concepts</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="/js/docs.js"></script>
</body>
</html>
