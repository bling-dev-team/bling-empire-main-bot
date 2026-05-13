require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ChannelType
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.first();

  const categoryName = '╰── TEST MAX CATEGORY ──╮';

  const category = guild.channels.cache.find(
    channel =>
      channel.name === categoryName &&
      channel.type === ChannelType.GuildCategory
  );

  if (!category) {
    console.log(`Category not found: ${categoryName}`);
    process.exit();
  }

  for (let i = 1; i <= 55; i++) {
    try {

      const channelName = `🤵‍♂️┃test-client-${i}`;

      const channel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        parent: category.id
      });

      console.log(`✅ Created ${i}: ${channel.name}`);

    } catch (error) {

      console.log(`❌ FAILED AT ${i}`);
      console.log(error.message);

      break;
    }
  }

  console.log('🔥 Stress test finished.');
  process.exit();
});

client.login(process.env.DISCORD_TOKEN);