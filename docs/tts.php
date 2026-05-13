<?php
$page_title     = 'Voice Output (TTS) — VoxCtr Docs';
$page_desc      = 'On-device neural TTS via Piper, with espeak-ng as automatic fallback. Eight curated voices, all downloadable in-app.';
$active_section = 'docs';
$active_doc     = 'tts';
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
    <div class="crumbs">AI &amp; VOICE <span>/</span> VOICE OUTPUT</div>
    <h1>Voice output (TTS)</h1>
    <p class="lede">On-device neural TTS via Piper, with espeak-ng as automatic fallback. Eight curated voices, all downloadable in-app.</p>

    <h2>Voice catalog</h2>
    <table class="docs-table">
      <thead><tr><th>Voice</th><th>Language</th><th>Quality</th><th>Size</th></tr></thead>
      <tbody>
        <tr><td>en-us-lessac-medium</td><td>US English</td><td>Medium</td><td>~55 MB</td></tr>
        <tr><td>en-us-ryan-high</td><td>US English</td><td>High</td><td>~130 MB</td></tr>
        <tr><td>en-us-amy-low</td><td>US English</td><td>Low</td><td>~5 MB</td></tr>
        <tr><td>en-us-joe-medium</td><td>US English</td><td>Medium</td><td>~55 MB</td></tr>
        <tr><td>en-gb-alan-low</td><td>GB English</td><td>Low</td><td>~5 MB</td></tr>
      </tbody>
    </table>

    <h2>Setup</h2>
    <ul>
      <li>Open Settings → Voice Output</li>
      <li>Pick a voice from the dropdown</li>
      <li>Click <strong>⬇ Download</strong> — progress bar in-app, files land in <code>~/.local/share/voxctl/voices/</code></li>
      <li>Click <strong>▶ Test Voice</strong> to preview</li>
      <li>Toggle <strong>Enable TTS</strong></li>
    </ul>

    <h2>Stop key</h2>
    <p>Default <code>Escape</code>. Press it from any window to interrupt TTS playback instantly. Configure in Settings → Voice Output → TTS Stop Key.</p>

    <h2>Response overlay</h2>
    <p>When enabled, a teal floating overlay appears while TTS plays — distinct from the recording overlay so you always know when the app is speaking.</p>

    <div class="docs-foot">
      <a href="ai.php"><small>← previous</small><span>AI processing</span></a>
      <a href="overlays.php" style="text-align:right;"><small>next →</small><span>Overlays</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= $base ?>/js/docs.js"></script>
</body>
</html>
