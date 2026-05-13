<?php
$page_title     = 'AI Processing — VoxCtr Docs';
$page_desc      = 'Optional Ollama integration for grammar correction, tone rewriting, and bullet formatting — all local.';
$active_section = 'docs';
$active_doc     = 'ai';
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
    <div class="crumbs">AI &amp; VOICE <span>/</span> AI PROCESSING</div>
    <h1>AI processing</h1>
    <p class="lede">Optional Ollama integration for grammar correction, tone rewriting, and bullet formatting — all local.</p>

    <h2>Recommended models</h2>
    <table class="docs-table">
      <thead><tr><th>Model</th><th>RAM / VRAM</th><th>Best for</th></tr></thead>
      <tbody>
        <tr><td>llama3.2:1b</td><td>~1.3 GB</td><td>Grammar, bullets — fastest</td></tr>
        <tr><td>phi3:mini</td><td>~2 GB</td><td>Simple rewrites</td></tr>
        <tr><td>mistral</td><td>~8 GB VRAM</td><td>Formal/casual rewrites</td></tr>
      </tbody>
    </table>

    <h2>Setup</h2>
    <ul>
      <li>Install Ollama: <code>curl -fsSL https://ollama.com/install.sh | sh</code></li>
      <li>Pull a model: <code>ollama pull llama3.2:1b</code></li>
      <li>Settings → AI → click <strong>Re-check</strong> to detect</li>
      <li>Toggle <strong>Enable AI Post-Processing</strong></li>
    </ul>
    <div class="note"><span class="icon">ⓘ</span> Per-target override: set <code>post_processing = "none"</code> on agent targets to skip Ollama for those routes even when globally enabled.</div>

    <div class="docs-foot">
      <a href="codemode.php"><small>← previous</small><span>Code mode</span></a>
      <a href="tts.php" style="text-align:right;"><small>next →</small><span>Voice output</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="/js/docs.js"></script>
</body>
</html>
