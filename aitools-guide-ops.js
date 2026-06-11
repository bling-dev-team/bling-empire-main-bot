// send-ai-tools-section.js
require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const START_HERE_CHANNEL_ID = '1466856670369022129';

const channels = {
  aiSupport: '1514381014800142407',
  contentFinderBot: '1504548545892450406',
  contentFinderBotScalers: '1504548818790912142',
  scottAi: '1514381603340812409',
  aiClientStatsTracker: '1514381964017401916'
};

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(START_HERE_CHANNEL_ID);

  if (!channel) {
    console.log('❌ Start Here channel not found.');
    process.exit(1);
  }

  const aiToolsEmbed = new EmbedBuilder()
    .setTitle('╰── 🤖 AI Tools ──╮')
    .setDescription(
      `Access AI-powered tools to find resources, get support, and accelerate your learning and business growth inside Bling Empire.\n\n` +

      `🗣️ <#${channels.aiSupport}>\n` +
      `Get help with any AI-related questions, troubleshooting, or guidance on using Bling Empire's AI tools.\n\n` +

      `💡 <#${channels.contentFinderBot}>\n` +
      `Search and instantly find course modules, coaching call recordings, SOPs, templates, and resources available to all members.\n\n` +

      `💡 <#${channels.contentFinderBotScalers}> *(Scalers Only)*\n` +
      `Access everything in Content Finder plus exclusive Scalers-level trainings, resources, and advanced content.\n\n` +

      `🤖 <#${channels.scottAi}>\n` +
      `Ask ScottAI questions about business, sales, lead generation, client acquisition, systems, and implementation. Trained on Scott's course content, coaching calls, SOPs, and frameworks.\n\n` +

      `🔢 <#${channels.aiClientStatsTracker}>\n` +
      `Connect your software to an automated dashboard that tracks and visualizes your key business metrics in real time.`
    );

  await channel.send({
    embeds: [aiToolsEmbed]
  });

  console.log('✅ AI Tools section sent successfully.');

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);