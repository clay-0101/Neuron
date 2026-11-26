import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: "New conversation",
    },
    lastUpdate: {
      type: Date,
      default: Date.now,
    },
    lastMessage: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const ConversationModel = mongoose.model("Conversation", conversationSchema);
