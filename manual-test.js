require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  MessageFlags
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// TESTING CHANNEL
const TEST_CHANNEL_ID = '1509758624959037521';

// GENERAL CHAT CHANNEL
const GENERAL_CHANNEL_ID = '1465725977610162398';

client.once('clientReady', async () => {

  console.log(`Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.first();

  const channel = guild.channels.cache.get(TEST_CHANNEL_ID);

  if (!channel) {
    console.log('❌ Test channel not found');
    return;
  }

  await channel.send({
    content: `
# Welcome to Bling Empire Mastermind 🙌

Super excited to help you grow the business.

Before we get into it, there’s a couple more steps to make sure you’re completely onboarded ✅

If you have any questions, let us know in the chat. Let’s build!

## __Links for the Onboarding Steps:__
### 1️⃣ Complete Your Onboarding Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/NfeZDBpK)
### 2️⃣ Request access to Skool Video Modules
[Skool Video Modules](https://www.skool.com/bling-empire-consulting-5896/about?ref=697423a6d62d4269b28f16b10909225f)
### 3️⃣ Subscribe to the Group Call
[Bling Empire Group Calls](https://docs.google.com/document/d/1tEcUfFURxgV7yKIIHbmUGkEdCT7u8YjVX3CiYv1SzOc/edit?tab=t.0)
### 4️⃣ Notion
Our EA will send over your client portal once it’s ready.
### 5️⃣ Watch the Onboarding Video
[Onboarding Video](https://tinyurl.com/bling-empire-onboarding)

━━━━━━━━━━━━━━━━
Lastly, please take a moment to introduce yourself in <#${GENERAL_CHANNEL_ID}> so everyone can get to know you 🙌
Feel free to share your:
• IG handle
• Age
• Location
• Business niche
• Goals inside Bling
• Fun fact outside of business
`,
    flags: MessageFlags.SuppressEmbeds
  });

  console.log('✅ Test onboarding message sent.');

});

client.login(process.env.DISCORD_TOKEN);