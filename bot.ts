import * as dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

// *: Define discord intents:
import { 
    Client, GatewayIntentBits, EmbedBuilder, Partials, 
    Message, Events, ActivityType, TextChannel 
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