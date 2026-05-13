<?php
require_once '../includes/config.php';
$page_title     = 'Code Mode — VoxCtr Docs';
$page_desc      = 'Spoken constructs converted to syntax. Say it, get valid code.';
$active_section = 'docs';
$active_doc     = 'codemode';
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
    <div class="crumbs">INPUT &amp; ROUTING <span>/</span> CODE MODE</div>
    <h1>Code mode</h1>
    <p class="lede">Spoken constructs converted to syntax. Say it, get valid code.</p>

    <h2>How it works</h2>
    <p>Code mode is a post-processing stage. When active, transcribed words like "underscore", "dot", "open paren" are converted to symbols, and identifier-like phrases are camel-cased or snake-cased.</p>

    <h2>Examples</h2>
    <table class="docs-table">
      <thead><tr><th>You say</th><th>Code mode produces</th></tr></thead>
      <tbody>
        <tr><td>get underscore user dot name</td><td><code>get_user.name</code></td></tr>
        <tr><td>function handle user login</td><td><code>handleUserLogin</code></td></tr>
        <tr><td>constant max retries</td><td><code>MAX_RETRIES</code></td></tr>
        <tr><td>open paren x comma y close paren</td><td><code>(x, y)</code></td></tr>
      </tbody>
    </table>

    <h2>Triggering code mode</h2>
    <p>Three ways:</p>
    <ul>
      <li><strong>Per-target setting:</strong> set <code>post_processing = "code_mode"</code> on a target dedicated to your editor</li>
      <li><strong>Global toggle:</strong> Settings → Dictation → Code mode</li>
      <li><strong>Auto code mode:</strong> AT-SPI2 sees a terminal/IDE focused and switches automatically</li>
    </ul>

    <div class="docs-foot">
      <a href="atspi.php"><small>← previous</small><span>AT-SPI2</span></a>
      <a href="ai.php" style="text-align:right;"><small>next →</small><span>AI processing</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= BASE ?>/js/docs.js"></script>
</body>
</html>
