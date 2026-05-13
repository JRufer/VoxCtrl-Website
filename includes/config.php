<?php
// Dynamically determine BASE relative path based on current script depth
$script_path = $_SERVER['SCRIPT_FILENAME'];
$root_path = str_replace('\\', '/', realpath(__DIR__ . '/..'));

$script_dir = str_replace('\\', '/', realpath(dirname($script_path)));

$relative_path = '.';
if ($script_dir !== false && strpos($script_dir, $root_path) === 0) {
    $diff = trim(substr($script_dir, strlen($root_path)), '/');
    if (!empty($diff)) {
        $depth = count(explode('/', $diff));
        $relative_path = str_repeat('../', $depth - 1) . '..';
    }
}

define('BASE', $relative_path);
