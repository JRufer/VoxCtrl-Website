<?php
require_once __DIR__ . '/../includes/config.php';
$page_title     = 'MCP Server — VoxCtr Docs';
$page_desc      = 'Built-in Model Context Protocol server. Any MCP-capable AI agent can drive your microphone and speak through your speakers.';
$active_section = 'docs';
$active_doc     = 'mcp';
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
    <div class="crumbs">INTEGRATIONS <span>/</span> MCP</div>
    <h1>MCP server</h1>
    <p class="lede">Built-in Model Context Protocol server. Any MCP-capable AI agent can drive your microphone and speak through your speakers.</p>

    <h2>Three tools</h2>
    <table class="docs-table">
      <thead><tr><th>Tool</th><th>What it does</th></tr></thead>
      <tbody>
        <tr><td>transcribe_voice</td><td>Opens the mic, records the user, returns the transcript</td></tr>
        <tr><td>speak_text</td><td>Queues text for TTS playback through the current voice</td></tr>
        <tr><td>get_status</td><td>Returns whether the mic is open and TTS is playing</td></tr>
      </tbody>
    </table>

    <h2>Transport</h2>
    <p>Unix domain socket at <code>/tmp/voxctr-mcp.sock</code>. Each connection gets its own daemon thread. Newline-delimited JSON-RPC 2.0 — one JSON object per line, terminated with <code>\n</code>.</p>

    <h2>Enabling</h2>
    <p>Settings → AI → MCP Server → toggle <strong>Enable MCP Server</strong>. Or in <code>config.json</code>: <code>{"mcp": {"server_enabled": true}}</code>.</p>

    <h2>Claude Desktop</h2>
    <p>Click <strong>Register in Claude Desktop</strong> in Settings — VoxCtr writes the socat bridge config to <code>~/.config/claude/claude_desktop_config.json</code>. Restart Claude Desktop. The three tools appear in the picker automatically.</p>
    <div class="note"><span class="icon">ⓘ</span> VoxCtr must already be running before Claude Desktop connects. The socket is created at app startup.</div>

    <h2>Protocol handshake</h2>
    <ul>
      <li>Send <code>initialize</code> — receive <code>protocolVersion 2024-11-05</code> and capability list</li>
      <li>Send <code>notifications/initialized</code> (no response expected)</li>
      <li>Send <code>tools/list</code> — receive the three tool definitions</li>
      <li>Call any tool with <code>tools/call</code></li>
    </ul>

    <h2>Behaviour notes</h2>
    <ul>
      <li>While <code>transcribe_voice</code> records, the recording overlay is always shown — the user always has a visual indicator that the mic is live</li>
      <li>The mic is released automatically once VAD detects silence or <code>timeout_seconds</code> elapses</li>
      <li>VoxCtr's full post-processing pipeline is applied before the transcript is returned</li>
      <li><code>speak_text</code> returns as soon as the text is queued — does not block until playback finishes</li>
      <li>Only one <code>transcribe_voice</code> call can be in flight at a time; concurrent calls queue</li>
    </ul>

    <h2>Response loopback (FIFO)</h2>
    <p>For agents that generate responses to a named FIFO, set <code>response_pipe</code> on the target. <code>ResponseListener</code> reads each line and passes it to <code>TTSEngine.speak()</code>. Each line in the FIFO becomes a separate utterance; empty lines are ignored. The listener re-opens the FIFO on EOF so the agent can restart without restarting VoxCtr.</p>

    <div class="docs-foot">
      <a href="overlays.php"><small>← previous</small><span>Overlays</span></a>
      <a href="dbus.php" style="text-align:right;"><small>next →</small><span>DBus control</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="<?= BASE ?>/js/docs.js"></script>
</body>
</html>
