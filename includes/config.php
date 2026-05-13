<?php
// Dynamically determine BASE relative path based on current script depth
$app_root_dir = str_replace('\\', '/', realpath(__DIR__ . '/..'));
$script_filename = str_replace('\\', '/', realpath($_SERVER['SCRIPT_FILENAME']));

// The relative path of the script within the application (e.g., "/docs/quickstart.php")
$rel_script_path = str_replace($app_root_dir, '', $script_filename);

// SCRIPT_NAME contains the URL path to the script (e.g., "/voxctr/docs/quickstart.php")
$script_name = $_SERVER['SCRIPT_NAME'];

// Remove the relative script path from the end of SCRIPT_NAME to get the base URL
$base_url = '';
if (!empty($rel_script_path) && substr($script_name, -strlen($rel_script_path)) === $rel_script_path) {
    $base_url = substr($script_name, 0, -strlen($rel_script_path));
} else {
    // Fallback if something weird happens with URL rewriting
    $is_docs = strpos($script_name, '/docs/') !== false;
    $base_url = $is_docs ? dirname(dirname($script_name)) : dirname($script_name);
}

// Ensure base_url doesn't end with a slash, unless it's just "/"
$base_url = rtrim($base_url, '/');

define('BASE', $base_url);
