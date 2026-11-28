import { ConversationModel } from "../models/conversation.model.js";

/** Creates and persists a conversation for a user.
 * @param {{user: string, title: string}} input Conversation owner and title.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>>} The new conversation.
 * @throws {Error} If persistence fails.
 */
export async function createConversation(input) {
  return ConversationModel.create(input);
}

/** Finds a conversation only when it belongs to the supplied user.
 * @param {string} conversationId Conversation identifier.
 * @param {string} userId Owner identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Matching conversation, if any.
 * @throws {Error} If the database query fails.
 */
export async function findConversationById(conversationId, userId) {
  return ConversationModel.findOne({ _id: conversationId, user: userId });
}

/** Updates a conversation's activity dates for a newly persisted message.
 * @param {string} conversationId Conversation identifier.
 * @param {string} userId Owner identifier.
 * @param {Date} [lastMessageAt=new Date()] Timestamp of the latest message.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Updated conversation, if owned by the user.
 * @throws {Error} If the database update fails.
 */
export async function updateConversationActivity(conversationId, userId, lastMessageAt = new Date()) {
  return ConversationModel.findOneAndUpdate(
    { _id: conversationId, user: userId },
    { $set: { lastUpdate: lastMessageAt, lastMessage: lastMessageAt } },
    { new: true, runValidators: true },
  );
}


export async function findConversationByUserId(userId){
  return ConversationModel.find({user : userId})
}