<nav class="nav">
  <a class="nav-brand" href="<?= $base ?>/">
    <img src="<?= $base ?>/assets/voxctr.gif" alt="VoxCtr" />
    <span>vox<span class="v">ctr</span></span>
    <span class="nav-version">v1.0</span>
  </a>
  <div class="nav-links">
    <a class="nav-link <?= ($active_section ?? '') === 'home' ? 'is-active' : '' ?>" href="<?= $base ?>/">Overview</a>
    <a class="nav-link <?= ($active_section ?? '') === 'docs' ? 'is-active' : '' ?>" href="<?= $base ?>/docs/quickstart.php">Documentation</a>
  </div>
  <div class="nav-spacer"></div>
  <div class="nav-tools">
    <a class="btn-pill" id="gh-star" href="https://github.com/JRufer/VoxCtr" target="_blank" rel="noreferrer">
      <span class="stars">★</span> <span id="gh-star-count">…</span>
    </a>
  </div>
</nav>
