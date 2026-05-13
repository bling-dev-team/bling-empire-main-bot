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

  if (!guild) {
    console.log('No server found.');
    process.exit();
  }

  const channelsToDelete = guild.channels.cache.filter(channel => {
    const name = channel.name;

    return (
      channel.type === ChannelType.GuildText &&
      (
        name.includes('test-client-') ||
        name.includes('outside-test-')
      )
    );
  });

  console.log(`Found ${channelsToDelete.size} test channels to delete.`);

  for (const channel of channelsToDelete.values()) {
    try {
      await channel.delete('Bulk delete test channels');
      console.log(`✅ Deleted: ${channel.name}`);
    } catch (error) {
      console.log(`❌ Failed to delete: ${channel.name}`);
      console.log(error.message);
    }
  }

  console.log('🔥 Bulk delete finished.');
  process.exit();
});

client.login(process.env.DISCORD_TOKEN);