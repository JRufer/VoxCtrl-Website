# VoxCtr Website

Marketing and documentation website for [VoxCtr](https://github.com/jrufer/voxctr) — a programmable voice broker for Linux.

Built with PHP includes for shared layout, with separate pages for the landing/marketing section and a full documentation section covering quickstart, installation, configuration, integrations, and architecture.

## Structure

```
index.php              # Landing page
includes/              # Shared PHP partials (head, nav, footer, docs sidebar)
docs/                  # Documentation pages (14 pages)
js/                    # landing.js, docs.js
css/                   # Stylesheets
assets/                # Images, GIFs, favicon
```

## Local development

Requires a PHP server:

```bash
php -S localhost:8000
```

Then open [http://localhost:8000](http://localhost:8000).
