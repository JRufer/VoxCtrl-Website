<?php
$page_title     = 'Architecture — VoxCtr Docs';
$page_desc      = 'What\'s inside the app, and how the parts talk to each other.';
$active_section = 'docs';
$assets         = '..';
$active_doc     = 'architecture';
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
    <div class="crumbs">REFERENCE <span>/</span> ARCHITECTURE</div>
    <h1>Architecture</h1>
    <p class="lede">What's inside the app, and how the parts talk to each other.</p>

    <h2>Source layout</h2>
    <ul>
      <li><code>main.py</code> — application entry point</li>
      <li><code>input_listener.py</code> — evdev hotkey engine (hold / toggle / double-tap / TTS stop)</li>
      <li><code>audio_recorder.py</code> — PyAudio capture + VU meter</li>
      <li><code>inference_engine.py</code> — transcription + post-processing</li>
      <li><code>text_injector.py</code> — text delivery thread + routing dispatch</li>
      <li><code>llm_postprocessor.py</code> — Ollama integration</li>
      <li><code>tts_engine.py</code> — Piper/espeak engine, voice catalog, downloads</li>
      <li><code>tts_responder.py</code> — ResponseListener: FIFO → TTSEngine</li>
      <li><code>mcp_server.py</code> — MCP JSON-RPC server (Unix socket)</li>
      <li><code>atspi_context.py</code> — focus tracking, context reading, injection</li>
    </ul>

    <h2>Threading model</h2>
    <ul>
      <li>One Qt main thread for UI</li>
      <li>One audio thread for capture (~20–60ms callbacks)</li>
      <li>One transcription worker per recording</li>
      <li>One delivery thread per active target</li>
      <li>One MCP accept thread + N short-lived per-connection threads</li>
      <li>One ResponseListener daemon per target with <code>response_pipe</code></li>
    </ul>

    <h2>Backend selection</h2>
    <p>At startup, <code>BackendSelector</code> probes the system in this order:</p>
    <ul>
      <li>nvidia-smi — if it returns devices, prefer faster-whisper</li>
      <li>sysfs DRM vendor IDs (<code>/sys/class/drm/card*/device/vendor</code>) — detect AMD/Intel</li>
      <li>vulkaninfo — confirm a Vulkan-capable device is present</li>
      <li>If GPU detected but no CUDA libs, fall back to whisper.cpp</li>
      <li>If no GPU at all, faster-whisper int8 on CPU</li>
    </ul>

    <h2>Test coverage</h2>
    <p>280+ tests across DoubleTapMachine timing, all delivery types, TOML round-trips, voice catalog, MCP JSON-RPC dispatch, BackendProtocol contract, AT-SPI2 focus tracking, and config validation.</p>

    <div class="docs-foot">
      <a href="config.php"><small>← previous</small><span>Configuration</span></a>
      <div></div>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= $assets ?>/js/docs.js"></script>
</body>
</html>
