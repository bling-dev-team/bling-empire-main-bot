require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  MessageFlags
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = '1527537043494801569';
const GENERAL_CHANNEL_ID = '1465725977610162398';

const starterOnboardingMessage = `
# Welcome to Bling Empire Mastermind 🙌

We're excited to have you inside the Starter Program!

This program is designed to help you build the foundations of a successful online coaching business. Throughout your journey, you'll work through the training step by step, receive personalized guidance from our team, and build the systems needed to consistently attract clients and grow your business.

Before we dive in, please complete the onboarding steps below to make sure you're fully set up for success.

If you have any questions along the way, don't hesitate to reach out in this channel. We're here to help every step of the way.

Our goal is to help you build a strong foundation first. Once we build your business to the point where you're ready to hire and scale, we'll invite you into the **Scaler Program.** 🚀
## __Links for the Onboarding Steps:__
### 1️⃣ Complete the Secondary Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/NfeZDBpK)
### 2️⃣ Request access to Skool Video Modules
[Skool Video Modules](https://www.skool.com/bling-empire-consulting-5896/about?ref=697423a6d62d4269b28f16b10909225f)
### 3️⃣ Subscribe to the Group Calls
[Bling Empire Group Calls](https://docs.google.com/document/d/1tEcUfFURxgV7yKIIHbmUGkEdCT7u8YjVX3CiYv1SzOc/edit?tab=t.0)
### 4️⃣ Client Dashboard
Our team will provide you access to your Client Dashboard.
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
`;

client.once('clientReady', async () => {
  try {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel || !channel.isTextBased()) {
      throw new Error('Julius channel not found or is not text-based.');
    }

    await channel.send({
      content: starterOnboardingMessage,
      flags: MessageFlags.SuppressEmbeds
    });

    console.log('✅ Julius onboarding message sent successfully.');
  } catch (error) {
    console.error('❌ Failed to send Julius onboarding message:', error);
  } finally {
    client.destroy();
    process.exit(0);
  }
});

if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN is missing from the .env file.');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);