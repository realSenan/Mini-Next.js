import path from "path";
import { transpileJSX } from "./transpile.ts";
import { pathToFileURL } from "url";
import fs from "fs";

export async function loadPage(url: string) {
  const filePath = path.join(process.cwd(), "pages", `${url}.jsx`);

  if (!fs.existsSync(filePath)) {
    throw new Error("Page not found");
  }

  const code = await transpileJSX(filePath);

  const tempFile = path.join(
    process.cwd(),
    ".tmp",
    `${url.replace("/", "")}.mjs`
  );

  fs.mkdirSync(path.dirname(tempFile), { recursive: true });
  fs.writeFileSync(tempFile, code);

  const moduleUrl = pathToFileURL(tempFile).href;
  return (await import(moduleUrl)).default;
}
