
import mongoose from 'mongoose';

//  User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: String,
  createdAt: { type: Date, default: Date.now }
});

//  Room Schema
const RoomSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['public', 'private'], default: 'public' },
  theme: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  createdAt: { type: Date, default: Date.now }
});

//  File Schema
const FileSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  url: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  createdAt: { type: Date, default: Date.now }
});

//  Chat Message Schema
const ChatMessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

// Export Models


export const User = mongoose.model('User', UserSchema);
export const Room = mongoose.model('Room', RoomSchema);
export const File = mongoose.model('File', FileSchema);
export const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
