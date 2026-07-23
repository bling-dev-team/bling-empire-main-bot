require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  MessageFlags
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Replace with your test channel ID
  const channel = await client.channels.fetch('1522383857154785383');

  if (!channel) {
    console.log('❌ Channel not found.');
    process.exit(1);
  }

  const GENERAL_CHANNEL_ID = '1465725977610162398';

  const scalerOnboardingMessage = `
# Welcome to Bling Empire Mastermind 🙌

Welcome to the Scaler Program!

This program is built for business owners who are ready to optimize, implement, and scale. You'll work closely with our team to strengthen your systems, improve operations, and accelerate your business growth through advanced coaching and implementation.

Before we get started, please complete the onboarding steps below so we can get everything set up and support you as efficiently as possible.

If you need anything throughout the program, simply reach out in this channel. We're excited to help you scale to the next level.

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

  await channel.send({
    content: scalerOnboardingMessage,
    flags: MessageFlags.SuppressEmbeds
  });

  console.log('✅ Scaler onboarding message sent successfully!');
  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);