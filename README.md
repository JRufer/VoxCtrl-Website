# voxctrl Website

Marketing and documentation website for [voxctrl](https://github.com/jrufer/voxctrl) — a programmable voice broker for Linux and Windows.

Hand-written, static HTML/CSS/JS with no build step and no framework. Served at `jrufer.com/voxctrl/`, which corresponds to this repo's `voxctrl/` folder with the landing page (and its own `css/`, `js/`, `assets/`) laid over the top.

## Structure

```
index.html              # Landing page — this IS the deployed page, no build step
css/, js/, assets/      # Landing page's stylesheet, script, and media
changelog.md            # Appended automatically by the app repo's update-changelog.yml
voxctrl/docs/           # Documentation pages (14 pages), own css/js/assets
```

## Local development

Any static file server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).
