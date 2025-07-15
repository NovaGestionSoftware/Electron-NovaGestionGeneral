import fs from 'fs';
import path from 'path';

const outputDir = "C:/NovaGestion";
const originalFolder = path.join(outputDir, "win-unpacked");
const desiredFolder = path.join(outputDir, "NovaGeneral");

try {
  if (fs.existsSync(originalFolder)) {
    if (fs.existsSync(desiredFolder)) {
      // Eliminar carpeta destino si existe (opcional)
      await fs.promises.rm(desiredFolder, { recursive: true, force: true });
      console.log(`Se eliminó la carpeta destino existente: ${desiredFolder}`);
    }
    await fs.promises.rename(originalFolder, desiredFolder);
    console.log(`Carpeta renombrada correctamente a: ${desiredFolder}`);
  } else {
    console.error(`No se encontró la carpeta original: ${originalFolder}`);
  }
} catch (error) {
  console.error("Error renombrando la carpeta:", error);
}