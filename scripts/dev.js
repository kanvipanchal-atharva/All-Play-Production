import { spawn } from "node:child_process";
const children = [
  spawn(
    process.execPath,
    ["--watch", "--env-file-if-exists=.env", "server/index.js"],
    { stdio: "inherit" },
  ),
  spawn(
    process.execPath,
    ["../node_modules/vite/bin/vite.js", "--host", "0.0.0.0"],
    { cwd: "client", stdio: "inherit" },
  ),
];
// Resolve Vite from the root workspace installation.
children[1].on("error", () => process.exit(1));
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => {
    children.forEach((child) => child.kill());
    process.exit();
  });
