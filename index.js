require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  ChannelType,
  MessageFlags
} = require('discord.js');

const processingMembers = new Set();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  if (processingMembers.has(member.id)) {
    console.log(`⚠️ Already processing ${member.displayName}`);
    return;
  }

  processingMembers.add(member.id);

  try {
    const guild = member.guild;

    const channelIdsToGiveAccess = [
      // CATEGORIES
      '1465432980288831600',
      '1504555573419442196',
      '1479277944739205190',
      '1479277944739205190',

      // SHARED CHANNELS
'1465731071432724713',
'1504555573419442196',
'1465725977610162398',
'1478441202268241950',
'1503550024393425128',
 '1503531944498040992',
 '1503532302876020940',
'1479280828541308959',
'1469104904902541478',
 '1471257496416030925',
'1503525871120814262',
 '1503525951462440991',
'1503526079007166565',
 '1503526265406357634'
    ];

    for (const channelId of channelIdsToGiveAccess) {
      const existingChannel = guild.channels.cache.get(channelId);

      if (existingChannel) {
        await existingChannel.permissionOverwrites.edit(member.id, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true
        });

        console.log(`✅ Gave access to ${member.displayName} for ${existingChannel.name}`);
      } else {
        console.log(`⚠️ Channel not found by ID: ${channelId}`);
      }
    }

    const cleanName = member.displayName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);

    const channelName = `🤵‍♂️┃${cleanName}`;

    const existingPrivateChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    if (existingPrivateChannel) {
      console.log(`⚠️ Channel already exists: ${channelName}`);
      return;
    }

const allowedRoleNames = [
  'Admin',
  'Zapier',
  'CEO',
  'Bling Empire Mastermind',
  'Operator',
  'Bling Team'
];

    const permissionOverwrites = [
      {
        id: guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel]
      },
      {
        id: member.id,
        allow: [
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.ReadMessageHistory
        ]
      }
    ];

    for (const roleName of allowedRoleNames) {
      const role = guild.roles.cache.find(role => role.name === roleName);

      if (role) {
        permissionOverwrites.push({
          id: role.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        });
      } else {
        console.log(`⚠️ Role not found: ${roleName}`);
      }
    }

    const channel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites
    });

    await channel.send({
      content: `
# Welcome to Bling Empire Mastermind 🙌

Super excited to help you grow the business.

Before we get into it, there’s a couple more steps to make sure you’re completely onboarded ✅

If you have any questions, let us know in the chat. Let’s build!

## __Links for the Onboarding Steps:__
### 1️⃣ Complete the Secondary Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/NfeZDBpK)
### 2️⃣ Request access to Skool Video Modules
[Skool Video Modules](https://www.skool.com/bling-empire-consulting-5896/about?ref=697423a6d62d4269b28f16b10909225f)
### 3️⃣ Subscribe to the Group Call
[Bling Empire Group Calls](https://docs.google.com/document/d/1tEcUfFURxgV7yKIIHbmUGkEdCT7u8YjVX3CiYv1SzOc/edit?tab=t.0)
### 4️⃣ Notion
Wait for our EA to give you access to your notion portal
### 5️⃣ Watch the Onboarding Video
[Onboarding Video](https://tinyurl.com/bling-empire-onboarding)
`,
      flags: MessageFlags.SuppressEmbeds
    });

  } catch (error) {
    console.error(`❌ Error processing ${member.displayName}:`, error);
  } finally {
    processingMembers.delete(member.id);
  }
});

client.login(process.env.DISCORD_TOKEN);