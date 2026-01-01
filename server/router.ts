import fs from "fs";
import path from "path";
import { renderPage } from "./render.ts";
import { IncomingMessage, ServerResponse } from "http";

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  console.log("REQ:", req.url);
  if (!req.url) return;

  // 1. STATIC FILES
  if (req.url.startsWith("/client") || req.url.startsWith("/pages")) {
    serveStatic(req, res);
    return;
  }

  // 2. PAGE ROUTING
  const url = req.url === "/" ? "/index" : req.url;

  try {
    const html = await renderPage(url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } catch (err) {
    console.error("SSR ERROR:", err);
    res.writeHead(500);
    res.end("SSR crashed");
  }
}

function serveStatic(req: IncomingMessage, res: ServerResponse) {
  if (!req.url) return;

  const filePath = path.join(process.cwd(), req.url);

  if (!fs.existsSync(filePath)) {
    console.error("STATIC NOT FOUND:", filePath);
    res.writeHead(404);
    res.end("Static file not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": "application/javascript",
  });

  res.end(fs.readFileSync(filePath));
}
