<?php
$page_title     = 'Core Concepts — VoxCtr Docs';
$page_desc      = 'How VoxCtr models voice input, routing, and processing. Read this once and the rest of the docs make sense.';
$active_section = 'docs';
$active_doc     = 'concepts';
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
    <div class="crumbs">GETTING STARTED <span>/</span> CORE CONCEPTS</div>
    <h1>Core concepts</h1>
    <p class="lede">How VoxCtr models voice input, routing, and processing. Read this once and the rest of the docs make sense.</p>

    <h2>The five abstractions</h2>
    <h3>Binding</h3>
    <p>A hotkey gesture mapped to a target. Specifies keys, gesture type (hold / toggle / double-tap), and which named target receives the transcript.</p>
    <h3>Target</h3>
    <p>A named output destination with its own delivery type and post-processing pipeline. You can have many targets and switch between them by using different hotkeys.</p>
    <h3>Pipeline</h3>
    <p>An ordered sequence of processing stages applied to the raw Whisper transcript before delivery. Stages: <code>strip_fillers</code>, <code>snippets</code>, <code>spoken_punct</code>, <code>code_mode</code>, <code>ollama_rewrite</code>.</p>
    <h3>AT-SPI2</h3>
    <p>The Linux accessibility bus. Used for context-aware text injection (avoiding keypress simulation) and to read the text before the cursor to prime Whisper with relevant vocabulary.</p>
    <h3>MCP server</h3>
    <p>VoxCtr's built-in Model Context Protocol server. Exposes <code>transcribe_voice</code>, <code>speak_text</code>, and <code>get_status</code> as tools any MCP-capable AI can call.</p>

    <h2>The broker model</h2>
    <p>VoxCtr is not a dictation app — it is a voice input <strong>broker</strong>. A dictation app types what you say into the focused window. A broker can send the same utterance — or differently processed versions — to multiple independent systems simultaneously.</p>
    <ul>
      <li><strong>Single utterance, multiple destinations.</strong> Inject into your editor, log to a file, send to an agent — all from one keypress.</li>
      <li><strong>Per-destination AI shaping.</strong> Editor target gets grammar correction; agent target gets raw output; journal target gets bullet formatting.</li>
      <li><strong>No coupling between input and processing.</strong> Switch hotkey gestures, switch backends, switch routes — all independently.</li>
    </ul>

    <div class="docs-foot">
      <a href="install.php"><small>← previous</small><span>Installation</span></a>
      <a href="hotkeys.php" style="text-align:right;"><small>next →</small><span>Hotkeys &amp; gestures</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= $base ?>/js/docs.js"></script>
</body>
</html>
