import mongoose from "mongoose";
import { config } from "./env.js";

/** Connects the application to MongoDB.
 * @returns {Promise<void>} Resolves after the database connection opens.
 * @throws {Error} If MongoDB cannot be reached.
 */
export async function connectDatabase() {
  await mongoose.connect(config.mongodbUri);
  console.log("Connected to MongoDB");
}
