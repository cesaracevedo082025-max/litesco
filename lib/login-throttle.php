<?php
/**
 * LITESCO - Límite de intentos de login por IP, sin base de datos.
 *
 * Guarda las marcas de tiempo de los intentos fallidos en archivos JSON bajo
 * cache/login/ (ese directorio está protegido por cache/.htaccess -> Require all
 * denied, no es accesible por web). Si el directorio no se puede escribir, todo
 * falla-abierto: nunca bloquea al admin legítimo por un problema de disco.
 *
 * Uso:
 *   require_once __DIR__ . '/lib/login-throttle.php';
 *   if (loginThrottleBlocked($ip)) { ... 429 ... }
 *   // en credenciales incorrectas:
 *   loginThrottleFail($ip);
 *   // en login correcto:
 *   loginThrottleReset($ip);
 */

function loginThrottleDir()
{
    $dir = dirname(__DIR__) . '/cache/login';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    return $dir;
}

function loginThrottleFile($ip)
{
    return loginThrottleDir() . '/' . sha1($ip !== '' ? $ip : 'unknown') . '.json';
}

function loginThrottleRead($ip, $windowSecs)
{
    $file = loginThrottleFile($ip);
    if (!is_file($file)) return [];
    $ts  = json_decode((string) @file_get_contents($file), true);
    if (!is_array($ts)) return [];
    $now = time();
    return array_values(array_filter($ts, fn($t) => is_numeric($t) && ($now - $t) < $windowSecs));
}

/** true si la IP acumula demasiados intentos fallidos dentro de la ventana. */
function loginThrottleBlocked($ip, $max = 8, $windowSecs = 900)
{
    return count(loginThrottleRead($ip, $windowSecs)) >= $max;
}

/** Registra un intento fallido para la IP. */
function loginThrottleFail($ip, $windowSecs = 900)
{
    $ts   = loginThrottleRead($ip, $windowSecs);
    $ts[] = time();
    if (count($ts) > 50) $ts = array_slice($ts, -50);
    @file_put_contents(loginThrottleFile($ip), json_encode($ts), LOCK_EX);
}

/** Limpia el historial tras un login correcto. */
function loginThrottleReset($ip)
{
    $file = loginThrottleFile($ip);
    if (is_file($file)) @unlink($file);
}
