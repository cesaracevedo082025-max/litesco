<?php
/**
 * LITESCO - Configuración central de conexión a MySQL.
 *
 * Lee las credenciales desde variables de entorno (.env, ver env.php). Los valores
 * por defecto solo existen como respaldo para no romper el sitio si el .env del
 * hosting todavía no define las variables DB_*.
 *
 * SEGURIDAD (pendiente): define DB_HOST / DB_NAME / DB_USER / DB_PASS en .env,
 * ROTA la contraseña en cPanel y elimina los valores por defecto de abajo. Hasta
 * entonces la contraseña sigue viviendo en el repositorio.
 */
require_once __DIR__ . '/env.php';

return [
    'host'     => env('DB_HOST', 'localhost'),
    'dbname'   => env('DB_NAME', 'myloptic1_litesco_blog'),
    'user'     => env('DB_USER', 'myloptic1_litesco_usr'),
    'password' => env('DB_PASS', 'j}34Ik49W@10'),
    'charset'  => env('DB_CHARSET', 'utf8mb4'),
];
