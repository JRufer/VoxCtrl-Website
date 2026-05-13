<?php
$page_title     = 'Routing & Targets — VoxCtr Docs';
$page_desc      = 'Targets are named output destinations. Bindings tell VoxCtr which target each hotkey should route to.';
$active_section = 'docs';
$active_doc     = 'routing';
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
    <div class="crumbs">INPUT &amp; ROUTING <span>/</span> ROUTING</div>
    <h1>Routing &amp; targets</h1>
    <p class="lede">Targets are named output destinations. Bindings tell VoxCtr which target each hotkey should route to.</p>

    <h2>Delivery types</h2>
    <table class="docs-table">
      <thead><tr><th>Type</th><th>Mechanism</th><th>Use for</th></tr></thead>
      <tbody>
        <tr><td>inject</td><td>at-spi2 → wtype → xdotool</td><td>Default dictation</td></tr>
        <tr><td>clipboard</td><td>wl-copy / xclip</td><td>Copy for manual paste</td></tr>
        <tr><td>exec</td><td>subprocess shell=False</td><td>CLI agents, llm, claude-cli</td></tr>
        <tr><td>pipe</td><td>FIFO write O_NONBLOCK</td><td>Persistent agent processes</td></tr>
        <tr><td>socket</td><td>TCP / Unix domain</td><td>Remote / containerised agents</td></tr>
        <tr><td>file</td><td>append + timestamp</td><td>Voice journal, meeting notes</td></tr>
        <tr><td>dbus</td><td>signal emission</td><td>Waybar, Rofi, automation</td></tr>
      </tbody>
    </table>

    <h2>Post-processing modes</h2>
    <ul>
      <li><code>default</code> — full pipeline: snippets, spoken punctuation, Ollama rewrite</li>
      <li><code>none</code> — raw Whisper output (best for agents)</li>
      <li><code>strip_fillers</code> — remove um/uh/hmm only</li>
      <li><code>snippets_only</code> — expand snippets, no rewriting</li>
      <li><code>ollama_only</code> — skip snippets, run Ollama rewrite only</li>
    </ul>
    <div class="note warn"><span class="icon">!</span> Agent targets (<code>exec</code>, <code>pipe</code>, <code>socket</code>) should almost always use <code>post_processing = "none"</code> or <code>"strip_fillers"</code>. Rewriting alters command semantics.</div>

    <h2>Common patterns</h2>
    <h3>Agent command pipe</h3>
    <p>Send voice commands to a CLI agent via FIFO. Strip fillers so the agent gets clean input. Use <code>response_pipe</code> to stream replies back as TTS.</p>
    <h3>Voice journal</h3>
    <p>Append timestamped entries to a markdown file. Use Ollama to format each utterance as a concise note. Set <code>file_prefix = "- "</code> for bullets.</p>
    <h3>Shell command execution</h3>
    <p>Use <code>delivery = "exec"</code> with <code>command = "claude --print {TEXT}"</code>. The <code>{TEXT}</code> placeholder is substituted as a literal argument with <code>shell=False</code> to prevent injection.</p>
    <h3>TCP socket to remote agent</h3>
    <p>Forward transcripts over TCP for distributed or containerised setups. Set <code>socket_host</code> and <code>socket_port</code>; VoxCtr opens a connection per utterance.</p>

    <h2>Config file locations</h2>
    <ul>
      <li><code>~/.config/voxctr/config.json</code> — global settings (managed by Settings UI)</li>
      <li><code>~/.config/voxctr/targets.toml</code> — output target definitions</li>
      <li><code>~/.config/voxctr/bindings.toml</code> — hotkey → target bindings</li>
      <li><code>~/.config/voxctr/backups/</code> — auto-backups, last 20 kept</li>
    </ul>

    <div class="docs-foot">
      <a href="hotkeys.php"><small>← previous</small><span>Hotkeys &amp; gestures</span></a>
      <a href="atspi.php" style="text-align:right;"><small>next →</small><span>AT-SPI2</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include '../includes/footer.php'; ?>
<script src="<?= $base ?>/js/docs.js"></script>
</body>
</html>
