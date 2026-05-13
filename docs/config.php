<?php
require_once '../includes/config.php';
$page_title     = 'Configuration — VoxCtr Docs';
$page_desc      = 'All settings live under ~/.config/voxctr/. The Settings UI is a thin layer over these files — they\'re the source of truth.';
$active_section = 'docs';
$active_doc     = 'config';
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
    <div class="crumbs">REFERENCE <span>/</span> CONFIGURATION</div>
    <h1>Configuration</h1>
    <p class="lede">All settings live under <code>~/.config/voxctr/</code>. The Settings UI is a thin layer over these files — they're the source of truth.</p>

    <h2>Files</h2>
    <table class="docs-table">
      <thead><tr><th>File</th><th>Format</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td>config.json</td><td>JSON</td><td>Global settings — model, audio, UI, MCP, TTS</td></tr>
        <tr><td>targets.toml</td><td>TOML</td><td>Output target definitions</td></tr>
        <tr><td>bindings.toml</td><td>TOML</td><td>Hotkey → target bindings</td></tr>
        <tr><td>backups/</td><td>—</td><td>Auto-backups of all three (last 20 kept)</td></tr>
        <tr><td>overlays/</td><td>—</td><td>Custom overlay Python files</td></tr>
      </tbody>
    </table>

    <h2>Validation</h2>
    <p>A startup validator catches malformed <code>config.json</code>, <code>targets.toml</code>, and <code>bindings.toml</code> with clear error messages. Errors fall back to defaults rather than crashing the app.</p>

    <h2>Key settings</h2>
    <table class="docs-table">
      <thead><tr><th>Key</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>tts.enabled</td><td>false</td><td>Master TTS on/off</td></tr>
        <tr><td>tts.voice</td><td>en-us-lessac-medium</td><td>Active Piper voice</td></tr>
        <tr><td>tts.stop_key</td><td>[KEY_ESCAPE]</td><td>Global TTS interrupt</td></tr>
        <tr><td>tts.response_overlay</td><td>true</td><td>Show teal overlay during TTS</td></tr>
        <tr><td>mcp.server_enabled</td><td>false</td><td>Start MCP server on launch</td></tr>
        <tr><td>mcp.record_timeout</td><td>15.0</td><td>Default recording timeout (s)</td></tr>
        <tr><td>atspi.injection</td><td>true</td><td>Try at-spi2 insertText first</td></tr>
      </tbody>
    </table>

    <div class="docs-foot">
      <a href="dbus.php"><small>← previous</small><span>DBus control</span></a>
      <a href="architecture.php" style="text-align:right;"><small>next →</small><span>Architecture</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= BASE ?>/js/docs.js"></script>
</body>
</html>
