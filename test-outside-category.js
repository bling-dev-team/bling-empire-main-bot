require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ChannelType,
  PermissionsBitField
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.first();

  for (let i = 1; i <= 55; i++) {
    try {
      const channelName = `🤵‍♂️┃outside-test-${i}`;

      const channel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
          }
        ]
      });

      console.log(`✅ Created ${i}: ${channel.name}`);
    } catch (error) {
      console.log(`❌ FAILED AT ${i}`);
      console.log(error.message);
      break;
    }
  }

  console.log('🔥 Outside-category stress test finished.');
  process.exit();
});

client.login(process.env.DISCORD_TOKEN);