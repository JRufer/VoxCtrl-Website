<?php
require_once __DIR__ . '/../includes/config.php';
$page_title     = 'Hotkeys & Gestures — VoxCtr Docs';
$page_desc      = 'VoxCtr listens at the evdev layer for true global hotkeys — no window focus required, no compositor cooperation needed.';
$active_section = 'docs';
$active_doc     = 'hotkeys';
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
    <div class="crumbs">INPUT &amp; ROUTING <span>/</span> HOTKEYS</div>
    <h1>Hotkeys &amp; gestures</h1>
    <p class="lede">VoxCtr listens at the evdev layer for true global hotkeys — no window focus required, no compositor cooperation needed.</p>

    <h2>Default bindings</h2>
    <table class="docs-table">
      <thead><tr><th>Gesture</th><th>Keys</th><th>Action</th></tr></thead>
      <tbody>
        <tr><td>Hold-to-talk</td><td>Super + Space</td><td>Hold while speaking, release to deliver</td></tr>
        <tr><td>Toggle-to-talk</td><td>Ctrl + Super + Space</td><td>Tap to start, tap again to stop</td></tr>
        <tr><td>Double-tap</td><td>Alt</td><td>Double-tap and hold Alt to record</td></tr>
      </tbody>
    </table>
    <p>All configurable in Settings → Hotkeys or directly in <code>bindings.toml</code>. Each gesture can be disabled without deleting it.</p>

    <h2>Gesture modes</h2>
    <h3>Hold</h3>
    <p>Most predictable. Press, speak, release. Mic state is unambiguous — visible in the overlay.</p>
    <h3>Toggle</h3>
    <p>Hands-free. Tap once to start, tap again to stop. VAD also stops on silence if configured.</p>
    <h3>Double-tap</h3>
    <p>Reuses an existing modifier without colliding with normal usage. Double-tapping <code>Alt</code> never fires when <code>Alt</code> is held as part of <code>Alt+Tab</code>. Default tap window: 250ms.</p>

    <h2>Conflict detection</h2>
    <p>The Settings UI checks for collisions as you record new keys:</p>
    <ul>
      <li><strong>Exact duplicate</strong> — both gestures fire simultaneously</li>
      <li><strong>Subset collision</strong> — shorter binding always fires with longer</li>
      <li><strong>Double-tap overlap</strong> — double-tap key appears in a hold/toggle combo</li>
      <li><strong>Bare single key</strong> — non-modifier key alone intercepts every press</li>
    </ul>

    <h2>Recording new bindings</h2>
    <p>Press the <strong>Bind</strong> button next to a key field. The button turns orange and shows "Recording…". Press your keys. The display updates live as keys are held. Release — binding captured.</p>
    <div class="note"><span class="icon">ⓘ</span> For Chord bindings the editor exposes two Bind fields: hold keys (modifiers) and trigger key (held while pressing).</div>

    <h2>Configuration</h2>
    <p>The full schema for <code>~/.config/voxctr/bindings.toml</code> with one binding per gesture:</p>

    <div class="docs-foot">
      <a href="concepts.php"><small>← previous</small><span>Core concepts</span></a>
      <a href="routing.php" style="text-align:right;"><small>next →</small><span>Routing &amp; targets</span></a>
    </div>
  </main>

  <aside class="docs-toc" id="docsToc"></aside>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
<script src="<?= BASE ?>/js/docs.js"></script>
</body>
</html>
