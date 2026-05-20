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

  const guild = client.guilds.cache.first();

  const channel = guild.channels.cache.get('1504870257226023054');

  if (!channel) {
    console.log('❌ Channel not found');
    return;
  }

  await channel.send({
    content: `
# Welcome to Bling Empire Mastermind 🙌

You just made one of the best decisions for your business and I don't say that lightly.

This program has one mission: help you build your brand, grow your audience and turn your passion into a sustainable business.

The roadmap is here. The community is here. Our team is here.

Now it's on you to show up and do the work. 💪

Let's build 💎
## __Links for the Onboarding Steps:__
### 1️⃣ Complete Your Onboarding Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/NfeZDBpK)
### 2️⃣ Request access to Skool Video Modules
[Skool Video Modules](https://www.skool.com/bling-empire-consulting-5896/about?ref=697423a6d62d4269b28f16b10909225f)
### 3️⃣ Subscribe to the Group Call
[Bling Empire Group Calls](https://docs.google.com/document/d/1tEcUfFURxgV7yKIIHbmUGkEdCT7u8YjVX3CiYv1SzOc/edit?tab=t.0)
### 4️⃣ Notion
Work in Progress
### 5️⃣ Watch the Onboading Video
[Onboading Video](https://loom.com)
`,
    flags: MessageFlags.SuppressEmbeds
  });

  console.log('✅ Test onboarding message sent.');

});

client.login(process.env.DISCORD_TOKEN);