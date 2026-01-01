import esbuild from "esbuild";
import fs from "fs";

export async function transpileJSX(filePath: string) {
  const source = fs.readFileSync(filePath, "utf-8");

  const result = await esbuild.transform(source, {
    loader: "jsx",
    format: "esm",
    jsx: "automatic",
    platform: "node",
  });

  return result.code;
}
