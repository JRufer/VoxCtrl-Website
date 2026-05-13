<?php
$page_title     = 'Overlays — VoxCtr Docs';
$page_desc      = 'Three overlay styles ship by default. Drop a Python file into ~/.config/voxctr/overlays/ and you\'ve made one.';
$active_section = 'docs';
$active_doc     = 'overlays';
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
    <div class="crumbs">AI &amp; VOICE <span>/</span> OVERLAYS</div>
    <h1>Overlays</h1>
    <p class="lede">Three overlay styles ship by default. Drop a Python file into <code>~/.config/voxctr/overlays/</code> and you've made one.</p>

    <h2>Built-in styles</h2>
    <ul>
      <li><strong>Voice Card</strong> (default) — scrolling bar history with horizontal gradient and routing badge in the header</li>
      <li><strong>Waveform</strong> — OpenGL oscilloscope rendering raw min/max envelope</li>
      <li><strong>Pulse Circle</strong> — soft glowing circle that expands with RMS amplitude, 30fps with exponential decay</li>
    </ul>

    <h2>Routing indicator badge</h2>
    <p>Every overlay shows a small label with the active target's human-readable name (Focused Window, Hermes Agent, Voice Journal). When you use multiple hotkeys to route to different destinations, the badge changes with each activation. The label comes from the <code>label</code> field on the active <code>OutputTarget</code>.</p>

    <h2>Custom overlays</h2>
    <p>Drop a <code>.py</code> file into <code>~/.config/voxctr/overlays/</code>. Click <strong>Open Overlays Folder</strong> in Settings to go there directly. A <code>_template.py</code> starter is created automatically the first time you open the folder.</p>

    <h3>Required structure</h3>
    <ul>
      <li><code>DISPLAY_NAME</code> — string shown in the dropdown</li>
      <li><code>class OverlayUI(QWidget)</code> — the widget itself</li>
      <li>Three methods: <code>update_audio(data)</code>, <code>show_mode(label)</code>, <code>hide_mode()</code></li>
    </ul>
    <div class="note"><span class="icon">ⓘ</span> Files whose names begin with <code>_</code> (e.g. <code>_template.py</code>) are ignored by the loader — use this convention for notes, drafts, or helper modules.</div>

    <h3>The three methods</h3>
    <p><code>update_audio(data)</code> — called from the audio thread every 20–60ms. <code>data</code> is a numpy float32 ndarray, ~1024 samples, ±32768 amplitude range. Don't draw here; store and call <code>QMetaObject.invokeMethod(self, "update", QueuedConnection)</code>.</p>
    <p><code>show_mode(label)</code> — called on the Qt main thread when recording starts. <code>label</code> is the active target name (use it for your routing badge or ignore it).</p>
    <p><code>hide_mode()</code> — called on the Qt main thread when recording stops.</p>

    <div class="docs-foot">
      <a href="tts.php"><small>← previous</small><span>Voice output</span></a>
      <a href="mcp.php" style="text-align:right;"><small>next →</small><span>MCP server</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="/js/docs.js"></script>
</body>
</html>
