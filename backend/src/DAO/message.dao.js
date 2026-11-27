import { MessageModel } from "../models/message.model.js";

/** Creates and persists a message.
 * @param {{role: "user"|"assistant"|"tool", content: string, conversation: string}} input Message fields.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>>} The new message.
 * @throws {Error} If persistence fails.
 */
export async function createMessage(input) {
  return MessageModel.create(input);
}

/** Finds messages in a conversation from oldest to newest.
 * @param {string} conversationId Conversation identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>[]>} Conversation messages.
 * @throws {Error} If the database query fails.
 */
export async function findMessagesByConversationId(conversationId) {
  return MessageModel.find({ conversation: conversationId });
}
