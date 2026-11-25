import app from "./app.js";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

try {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`Neuron API listening on port ${config.port}`);
  });
} catch (error) {
  console.error("Unable to start Neuron API:", error);
  process.exitCode = 1;
}
