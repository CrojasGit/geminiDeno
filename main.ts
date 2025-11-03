import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  
  // Si el usuario pide /noticiasIA.js, devolvemos ese archivo
  if (url.pathname === "/noticiasIA.js") {
    return serveFile(req, "./noticiasIA.js");
  }

  // En cualquier otro caso, servimos el index.html
  return serveFile(req, "./index.html");
});
