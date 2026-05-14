require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  ChannelType,
  MessageFlags
} = require('discord.js');

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
  const guild = member.guild;

const channelIdsToGiveAccess = [
    // Categories
  '1467981074125553964',
  '1504215276462276719',
  '1504215383102718042',

  // Channels
'1467981074125553965',
'1504215883227332769',
'1504216163259912213',
'1504216237327126608',
'1504216311755051110',
'1504216381539745903',
'1504215520159994028',
'1504215614762389765',
'1504215691912548513'
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

  const allowedRoleNames = [
    'Admin',
    'CEO',
    'Sales Coach',
    'CSM',
    'Ads Coach'
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

You just made one of the best decisions for your business and I don't say that lightly.

This program has one mission: help you build your brand, grow your audience and turn your passion into a sustainable business.

The roadmap is here. The community is here. Our team is here.

Now it's on you to show up and do the work. 💪

Let's build 💎

## __Links for the Onboarding Steps:__
### 1️⃣ Secondary Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/NfeZDBpK)
### 2️⃣ Skool
[Skool](https://www.skool.com/bling-empire-consulting-5896/about?ref=697423a6d62d4269b28f16b10909225f)
### 3️⃣ Group Calls
[Bling Empire Group Calls](https://docs.google.com/document/d/1tEcUfFURxgV7yKIIHbmUGkEdCT7u8YjVX3CiYv1SzOc/edit?tab=t.0)
### 4️⃣ Vision Document
[Vision Document](https://docs.google.com/document/d/1FXXDqdwKfab_9HRAxqKlnm-YWV09ILRWbhR2Drh-VEE/edit?tab=t.0)
### 5️⃣ Notion
Work in Progress
### 6️⃣ Onboarding Call
[Onboarding Call](https://calendly.com/scotthoho/bling-empire-onboarding-call)
`,
    flags: MessageFlags.SuppressEmbeds
  });
});

client.login(process.env.DISCORD_TOKEN);