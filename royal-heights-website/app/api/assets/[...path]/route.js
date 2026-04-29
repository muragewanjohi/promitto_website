import { promises as fs } from "fs";
import path from "path";

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export async function GET(_request, { params }) {
  const parts = params.path ?? [];
  const relativePath = parts.join("/");

  // Prevent path traversal attacks and enforce serving only from assets/.
  if (!relativePath || relativePath.includes("..")) {
    return new Response("Invalid asset path", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "assets", relativePath);

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Asset not found", { status: 404 });
  }
}
