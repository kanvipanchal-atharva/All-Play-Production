import { createApp } from "./app.js";
const port = Number(process.env.PORT || 3000);
const server = createApp().listen(port, process.env.HOST || "0.0.0.0", (error) => {
  if (error) {
    console.error(`Unable to start the server (${error.code || 'listen error'}). Check PORT and HOST.`);
    process.exit(1);
  }
  console.log(`All Play Productions running at http://127.0.0.1:${port}`);
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
