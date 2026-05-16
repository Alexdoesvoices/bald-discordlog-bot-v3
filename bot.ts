import * as dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.DISCORD_TOKEN;

import Database from 'better-sqlite3';
const db = new Database('messages.db', { verbose: console.log });

// 1. Define your interface
interface MessageInfo {
  id: string;
  content: string;
  author: string;
  channel: string;
  timestamp: string;
}

// 2. Create the table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    content TEXT,
    author TEXT,
    channel TEXT,
    timestamp TEXT
  )
`);



// 3. Save Message Statement
// We pass an object matching the MessageInfo shape into this statement
const insertMessage = db.prepare<MessageInfo, void>(`
  INSERT OR REPLACE INTO messages (id, content, author, channel, timestamp)
  VALUES (@id, @content, @author, @channel, @timestamp)
`);

// 4. Get Message Statement
// We pass a string (id) and expect a MessageInfo row back
const getMessageById = db.prepare<string, MessageInfo>(`
  SELECT * FROM messages WHERE id = ?
`);

/**
 * Saves a Discord message log to the SQLite database
 */
export function saveMessage(message: MessageInfo): void {
  try {
    insertMessage.run(message);
  } catch (error) {
    console.error(`Failed to save message ${message.id}:`, error);
  }
}

/**
 * Retrieves a logged message by its Discord ID
 */
export function getMessage(id: string): MessageInfo | undefined {
  try {
    return getMessageById.get(id);
  } catch (error) {
    console.error(`Failed to fetch message ${id}:`, error);
    return undefined;
  }
}

const sampleMessage: MessageInfo = {
  id: '123456789012345678',
  content: 'Hello world! This is a test log.',
  author: 'AlexR#1234',
  channel: 'general',
  timestamp: new Date().toISOString()
};

saveMessage(sampleMessage);

import { 
    Client, GatewayIntentBits, EmbedBuilder, Partials, 
    Message, Events, ActivityType, TextChannel, 
    Options
  } from 'discord.js';
  import path from "node:path";
  import { fileURLToPath, pathToFileURL } from "node:url";




const client = new Client({
    intents: [
      GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel],
  });


  client.login(TOKEN);