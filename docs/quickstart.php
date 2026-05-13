<?php
require_once __DIR__ . '/../includes/config.php';
$page_title     = 'Quickstart — VoxCtr Docs';
$page_desc      = 'From zero to your first voice transcription in under five minutes. Linux only — Wayland and X11 supported.';
$active_section = 'docs';
$active_doc     = 'quickstart';
?>
<!doctype html>
<html lang="en">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>

<div class="bg-stack">
  <div class="grid-bg"></div>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-noise"></div>
</div>

<?php include __DIR__ . '/../includes/nav.php'; ?>

<div class="docs-shell">
  <?php include __DIR__ . '/../includes/docs-sidebar.php'; ?>

  <main class="docs-content" id="docsContent">
    <div class="crumbs">GETTING STARTED <span>/</span> QUICKSTART</div>
    <h1>Quickstart</h1>
    <p class="lede">From zero to your first voice transcription in under five minutes. Linux only — Wayland and X11 supported.</p>

    <h2>1. Install</h2>
    <p>Download the AppImage from <code>github.com/jrufer/voxctr/releases</code>, then run the installer to set up system deps, Piper TTS, and udev rules.</p>
    <pre class="code-inline"></pre>

    <h2>2. Permissions</h2>
    <p>Global hotkeys require evdev access. The installer adds you to <code>input</code> and <code>uinput</code> groups. <strong>Log out and back in</strong> for changes to take effect.</p>

    <h2>3. Launch</h2>
    <p>Run <code>voxctr</code>. A tray icon appears. The first-run wizard walks you through choosing a transcription backend and model size — Whisper base (~140MB), large-v3 (~2.9GB), or Moonshine Streaming for low-latency and edge use.</p>

    <h2>4. Speak</h2>
    <p>Click into any text field. Hold <code>Super+Space</code>. Speak. Release. Your transcript appears.</p>
    <div class="note"><span class="icon">ⓘ</span> If your compositor lacks system tray support, the Settings window opens directly on launch.</div>

    <h2>Next</h2>
    <ul>
      <li>Wire up the <strong>MCP server</strong> for Claude Desktop integration</li>
      <li>Define <strong>routing targets</strong> in <code>targets.toml</code></li>
      <li>Customize <strong>hotkeys</strong> in <code>bindings.toml</code></li>
    </ul>

    <div class="docs-foot">
      <div></div>
      <a href="install.php" style="text-align:right;"><small>next →</small><span>Installation</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="<?= BASE ?>/js/docs.js"></script>
</body>
</html>
