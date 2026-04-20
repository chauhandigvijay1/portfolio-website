import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.resolve(__dirname, "..");
const source = path.resolve(frontendRoot, "..", "shared", "portfolio-content.json");
const destinationDirectory = path.resolve(frontendRoot, "src", "data");
const destination = path.resolve(destinationDirectory, "portfolio-fallback.json");

await mkdir(destinationDirectory, { recursive: true });
await copyFile(source, destination);
