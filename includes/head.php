<?php
if (!isset($base)) {
    // Derive base URL from the calling script's URL path and its position
    // relative to the project root (parent of includes/).
    // Works regardless of what DOCUMENT_ROOT is set to.
    $projFs   = realpath(dirname(__DIR__));
    $scriptFs = realpath($_SERVER['SCRIPT_FILENAME']);
    $relDir   = ltrim(dirname(str_replace($projFs, '', $scriptFs)), '/');
    $base     = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
    if ($relDir !== '') {
        $base = substr($base, 0, strlen($base) - strlen($relDir) - 1);
    }
}
?>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title><?= htmlspecialchars($page_title ?? 'VoxCtr — the audio control layer for your AI stack') ?></title>
<meta name="description" content="<?= htmlspecialchars($page_desc ?? 'VoxCtr is a programmable voice broker for Linux. 100% on-device Whisper transcription, per-target routing, MCP server, and neural TTS. MIT licensed.') ?>" />
<link rel="icon" href="<?= $base ?>/assets/favicon.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="<?= $base ?>/css/base.css" />
<link rel="stylesheet" href="<?= $base ?>/css/components.css" />
<link rel="stylesheet" href="<?= $base ?>/css/docs.css" />
<link rel="stylesheet" href="<?= $base ?>/css/responsive.css" />
</head>
