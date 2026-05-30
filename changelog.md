# Changelog

## [v0.1.6] - 2026-05-30

Fix correctly updated version number v0.1.3

---

## [v0.1.5] - 2026-05-30

fix: annotate pos type to resolve E0282 on Windows
On Windows, the #[cfg(target_os = "linux")] blocks that use `pos` are
compiled out, leaving the compiler unable to infer the Option type.
Explicit annotation fixes the build without affecting Linux behaviour.
https://claude.ai/code/session_01WPCPCafF4rYNGMB11XuEFS

---

## [v0.1.4] - 2026-05-30

Feature: added support for selecting which monitor the overlay appears on. Also bumping the version to v0.1.4

---

## [v0.1.3] - 2026-05-26

updated version number

---

## [v0.1.2] - 2026-05-25

feat: update frontend styles and rebuild application assets

---

## [v0.1.1] - 2026-05-25

Merge pull request #33 from JRufer/claude/friendly-mccarthy-M5ZUT
UI fixes: Routing hotkey layout, History screen styling, and history enable/disable setting

---

## [v0.1.0] - 2026-05-24

fix: prep the app for appimage release,

---

All VoxCtr releases are listed here. Entries are added automatically when a new
tag is pushed to the [VoxCtr](https://github.com/jrufer/voxctr) repository.

---
