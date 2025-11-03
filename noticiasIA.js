export default {
  async fetch(request, env) {
    // --- CONFIGURACIÓN ---
    const allowedOrigin = "https://crojasgit.github.io"; // tu dominio
    const apiKey = env.API_KEY; // secreto guardado en Cloudflare
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    // --- VALIDACIÓN DEL DOMINIO ---
    const origin = request.headers.get("Origin");
    if (origin !== allowedOrigin) {
      return new Response("Acceso denegado", { status: 403 });
    }

    // --- CORS: permitir solo tu dominio ---
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // --- Preflight OPTIONS ---
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // --- Reenvío de la petición a Google API ---
    try {
      const body = await request.json();

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(body),
      });

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
