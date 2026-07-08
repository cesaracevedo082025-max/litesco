<?php
/**
 * LITESCO - Meta Conversions API (server-side)
 *
 * CRÍTICO: $customData y $userData jamás deben incluir contenido de mensajes,
 * detalles de litigios, información financiera o cualquier dato de casos de clientes.
 * Solo se envían identificadores técnicos (IP, user agent, cookies fbp/fbc) y
 * metadatos no sensibles del contenido visitado (nombre/categoría del servicio).
 */

require_once __DIR__ . '/../env.php';

/** Genera un event_id único para deduplicar entre el Pixel de navegador y CAPI */
function generateMetaEventId($prefix = 'ev') {
    return $prefix . '_' . bin2hex(random_bytes(8));
}

function sha256Lower($value) {
    return hash('sha256', strtolower(trim((string) $value)));
}

/**
 * Envía el evento a Meta de forma síncrona (bloqueante, con timeout corto).
 * Devuelve false silenciosamente si no hay credenciales configuradas o falla la llamada.
 */
function sendMetaCapiEvent($eventName, $eventId, $eventSourceUrl, $customData = [], $userData = []) {
    $pixelId = env('META_PIXEL_ID');
    $token   = env('META_CAPI_ACCESS_TOKEN');
    if (!$pixelId || !$token) return false;

    $userData = array_merge([
        'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? null,
        'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
    ], $userData);
    $userData = array_filter($userData, fn($v) => $v !== null && $v !== '');

    $event = [
        'event_name'       => $eventName,
        'event_time'       => time(),
        'event_id'         => $eventId,
        'event_source_url' => $eventSourceUrl,
        'action_source'    => 'website',
        'user_data'        => $userData,
        'custom_data'      => $customData,
    ];
    $payload = ['data' => [$event]];
    $testCode = env('META_CAPI_TEST_EVENT_CODE');
    if ($testCode) $payload['test_event_code'] = $testCode;

    $url = "https://graph.facebook.com/v19.0/{$pixelId}/events?access_token=" . urlencode($token);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 2,
        CURLOPT_CONNECTTIMEOUT => 2,
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    if ($curlErr || $httpCode >= 400) {
        error_log("[meta-capi] $eventName failed: HTTP $httpCode $curlErr $response");
        return false;
    }
    return true;
}

/**
 * Envía el evento DESPUÉS de que la respuesta HTML ya salió al navegador
 * (vía fastcgi_finish_request si el hosting corre PHP-FPM), para no añadir
 * latencia a la carga de la página. Si no está disponible, hace un fallback
 * síncrono con timeout corto (ver sendMetaCapiEvent).
 */
function fireMetaCapiEventAsync($eventName, $eventId, $eventSourceUrl, $customData = [], $userData = []) {
    register_shutdown_function(function () use ($eventName, $eventId, $eventSourceUrl, $customData, $userData) {
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }
        sendMetaCapiEvent($eventName, $eventId, $eventSourceUrl, $customData, $userData);
    });
}
