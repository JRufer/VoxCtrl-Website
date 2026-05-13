<?php
$page_title     = 'AT-SPI2 Integration — VoxCtr Docs';
$page_desc      = 'Optional accessibility integration that gives you direct text insertion, context-aware transcription, and automatic code mode for terminals and IDEs.';
$active_section = 'docs';
$active_doc     = 'atspi';
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
    <div class="crumbs">INPUT &amp; ROUTING <span>/</span> AT-SPI2</div>
    <h1>AT-SPI2 integration</h1>
    <p class="lede">Optional accessibility integration that gives you direct text insertion, context-aware transcription, and automatic code mode for terminals and IDEs.</p>

    <h2>What it does</h2>
    <h3>Direct text insertion</h3>
    <p>Insert text directly via the <code>AT-SPI2 Text.insertText</code> interface instead of simulating keystrokes. No modifier-key conflicts when a hotkey is released at the same time virtual keyboard events are sent. The app falls back automatically to <code>wtype → portal → xdotool → clipboard</code> for widgets that don't expose the <code>Text</code> interface.</p>
    <h3>Context-aware transcription</h3>
    <p>When you press your recording hotkey, VoxCtr reads up to 300 characters of text immediately before the cursor and passes it to Whisper as an <code>initial_prompt</code>. This primes the model with your document's vocabulary, spelling, and style — reducing errors on specialised terminology and proper nouns without manual prompt config.</p>
    <h3>Auto code mode</h3>
    <p>When the focused widget is a terminal or IDE text area (AT-SPI2 role <code>terminal</code> or <code>text</code>), the app switches to code dictation mode automatically without changing your global Settings. Resets on the next recording.</p>

    <h2>Configuration</h2>
    <table class="docs-table">
      <thead><tr><th>Key</th><th>Default</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td>atspi.injection</td><td>true</td><td>Try insertText before falling back to wtype/xdotool</td></tr>
        <tr><td>atspi.context_prompt</td><td>true</td><td>Feed surrounding text to Whisper as initial_prompt</td></tr>
        <tr><td>atspi.auto_code_mode</td><td>true</td><td>Switch to code mode for terminal/IDE widgets</td></tr>
      </tbody>
    </table>
    <div class="note"><span class="icon">ⓘ</span> AppImage users: pyatspi is bundled. Source users: included in <code>requirements.txt</code>. If absent, AT-SPI2 features are gracefully disabled.</div>

    <div class="docs-foot">
      <a href="routing.php"><small>← previous</small><span>Routing &amp; targets</span></a>
      <a href="codemode.php" style="text-align:right;"><small>next →</small><span>Code mode</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="/js/docs.js"></script>
</body>
</html>
