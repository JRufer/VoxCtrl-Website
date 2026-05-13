<aside class="docs-side">
  <div class="group">
    <span class="h">Getting started</span>
    <a class="item <?= ($active_doc ?? '') === 'quickstart' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/quickstart.php"><span class="glyph">⌃</span> Quickstart</a>
    <a class="item <?= ($active_doc ?? '') === 'install' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/install.php"><span class="glyph">⊞</span> Installation</a>
    <a class="item <?= ($active_doc ?? '') === 'concepts' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/concepts.php"><span class="glyph">◇</span> Core concepts</a>
  </div>
  <div class="group">
    <span class="h">Input &amp; routing</span>
    <a class="item <?= ($active_doc ?? '') === 'hotkeys' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/hotkeys.php"><span class="glyph">⌁</span> Hotkeys</a>
    <a class="item <?= ($active_doc ?? '') === 'routing' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/routing.php"><span class="glyph">⊳</span> Routing &amp; targets</a>
    <a class="item <?= ($active_doc ?? '') === 'atspi' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/atspi.php"><span class="glyph">∷</span> AT-SPI2</a>
    <a class="item <?= ($active_doc ?? '') === 'codemode' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/codemode.php"><span class="glyph">⟨/⟩</span> Code mode</a>
  </div>
  <div class="group">
    <span class="h">AI &amp; voice</span>
    <a class="item <?= ($active_doc ?? '') === 'ai' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/ai.php"><span class="glyph">∇</span> AI processing</a>
    <a class="item <?= ($active_doc ?? '') === 'tts' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/tts.php"><span class="glyph">⊕</span> Voice output</a>
    <a class="item <?= ($active_doc ?? '') === 'overlays' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/overlays.php"><span class="glyph">⌬</span> Overlays</a>
  </div>
  <div class="group">
    <span class="h">Integrations</span>
    <a class="item <?= ($active_doc ?? '') === 'mcp' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/mcp.php"><span class="glyph">⊞</span> MCP server</a>
    <a class="item <?= ($active_doc ?? '') === 'dbus' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/dbus.php"><span class="glyph">∴</span> DBus control</a>
  </div>
  <div class="group">
    <span class="h">Reference</span>
    <a class="item <?= ($active_doc ?? '') === 'config' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/config.php"><span class="glyph">≡</span> Configuration</a>
    <a class="item <?= ($active_doc ?? '') === 'architecture' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/architecture.php"><span class="glyph">▣</span> Architecture</a>
  </div>
</aside>
