<?php
/**
 * LITESCO - Configuración central de conexión a MySQL.
 *
 * Lee las credenciales EXCLUSIVAMENTE desde variables de entorno (.env, ver env.php
 * y .env.example). No hay valores por defecto: las credenciales no se versionan.
 * Si faltan, la conexión PDO falla y cada script responde con su error genérico.
 */
// Carga el loader de .env si está presente.
if (is_file(__DIR__ . '/env.php')) {
    require_once __DIR__ . '/env.php';
}
if (!function_exists('env')) {
    function env($key, $default = null) {
        $v = getenv($key);
        return ($v === false || $v === '') ? $default : $v;
    }
}

if (env('DB_NAME') === null || env('DB_USER') === null || env('DB_PASS') === null) {
    error_log('LITESCO db-config: faltan DB_NAME / DB_USER / DB_PASS en .env');
}

return [
    'host'     => env('DB_HOST', 'localhost'),
    'dbname'   => env('DB_NAME', ''),
    'user'     => env('DB_USER', ''),
    'password' => env('DB_PASS', ''),
    'charset'  => env('DB_CHARSET', 'utf8mb4'),
];
