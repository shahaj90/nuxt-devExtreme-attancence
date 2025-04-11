import formidable from "formidable";
import { IncomingMessage } from "http";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: false });

  const [fields, files] = await new Promise<any[]>((resolve, reject) => {
    form.parse(event.node.req as IncomingMessage, (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  const file = files.file?.[0] ?? files.file;

  if (!file) {
    setResponseStatus(event, 400);
    return { error: "No file uploaded" };
  }

  const tempPath = file.filepath;
  const newFilename = `${Date.now()}_${file.originalFilename}`;
  const uploadDir = path.join("src/public/uploads");

  // Make sure uploads folder exists
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const destination = path.join(uploadDir, newFilename);
  const buffer = await readFile(tempPath);
  await writeFile(destination, buffer);

  return { success: true, filename: newFilename };
});
