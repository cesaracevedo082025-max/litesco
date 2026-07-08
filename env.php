<?php
/**
 * LITESCO - Loader mínimo de variables de entorno (.env), sin dependencias externas.
 * Uso: require_once __DIR__ . '/env.php'; luego env('META_PIXEL_ID')
 */

function loadEnv($path) {
    static $loaded = false;
    if ($loaded) return;
    $loaded = true;
    if (!is_readable($path)) return;

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$key, $value] = explode('=', $line, 2);
        $key   = trim($key);
        $value = trim($value);
        // Quitar comillas envolventes si las hay
        if (strlen($value) >= 2 && (($value[0] === '"' && substr($value, -1) === '"') || ($value[0] === "'" && substr($value, -1) === "'"))) {
            $value = substr($value, 1, -1);
        }
        if (getenv($key) === false) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

function env($key, $default = null) {
    $value = getenv($key);
    return ($value === false || $value === '') ? $default : $value;
}

loadEnv(__DIR__ . '/.env');
