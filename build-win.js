#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import readline from "readline";
import chalk from "chalk";

// Leer la versión actual
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const currentVersion = pkg.version;

// Función para calcular la nueva versión según bump
function getNewVersion(current, bump) {
  const [major, minor, patch] = current.split(".").map(Number);
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  if (bump === "major") return `${major + 1}.0.0`;
  return current;
}

// Mostrar opciones con colores y ejemplos
console.log(chalk.cyan.bold("\nSelecciona el incremento de versión:\n"));
console.log(
  `${chalk.green("1) patch")}  → ${chalk.yellow(currentVersion)} → ${chalk.green(getNewVersion(currentVersion, "patch"))}`,
);
console.log(
  `${chalk.green("2) minor")}  → ${chalk.yellow(currentVersion)} → ${chalk.green(getNewVersion(currentVersion, "minor"))}`,
);
console.log(
  `${chalk.green("3) major")}  → ${chalk.yellow(currentVersion)} → ${chalk.green(getNewVersion(currentVersion, "major"))}`,
);
console.log(`${chalk.gray("4) ninguno")}`);
console.log(`${chalk.red("5) cancelar")} (salir sin hacer nada)`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(chalk.bold("\nOpción (1-5): "), (answer) => {
  let bump = null;
  if (answer === "1") bump = "patch";
  else if (answer === "2") bump = "minor";
  else if (answer === "3") bump = "major";
  else if (answer === "5") {
    console.log(chalk.red("\n❌ Operación cancelada.\n"));
    rl.close();
    process.exit(0); // Termina el script
  }

  if (bump) {
    console.log(chalk.blueBright(`\nIncrementando versión (${bump})...`));
    execSync(`npm version ${bump} --no-git-tag-version`, { stdio: "inherit" });
  } else {
    console.log(chalk.yellow("\nNo se incrementa la versión."));
  }

  console.log(chalk.magenta("\nIniciando build para Windows..."));
  execSync(`npm run build && electron-builder --win --dir && node rename-folder.js`, { stdio: "inherit" });

  // Leer la nueva versión
  const newPkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const newVersion = newPkg.version;

  console.log(chalk.blueBright(`\n✅ Proceso finalizado. Versión actual: ${chalk.bold(newVersion)}\n`));
  rl.close();
});
