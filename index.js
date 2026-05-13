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

  // Give the new member direct access to existing client channels
const channelIdsToGiveAccess = [
  // Categories
  '1467981074125553964',
  '1504215276462276719',
  '1504215383102718042',

  // Channels
  '1467981074125553965',
  '1504215759683977298',
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

  // Create clean channel name from member display name
  const cleanName = member.displayName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 30);

  const channelName = `🤵‍♂️┃${cleanName}`;

  const adminRole = guild.roles.cache.find(role => role.name === 'Admin');
  const ceoRole = guild.roles.cache.find(role => role.name === 'CEO');

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

  if (adminRole) {
    permissionOverwrites.push({
      id: adminRole.id,
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ReadMessageHistory
      ]
    });
  }

  if (ceoRole) {
    permissionOverwrites.push({
      id: ceoRole.id,
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ReadMessageHistory
      ]
    });
  }

  // Create private onboarding channel OUTSIDE category
  const channel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    permissionOverwrites
  });

  // Send onboarding message
  await channel.send({
    content: `
# 👋 Welcome to Bling Empire
Hey it's ${member.displayName}.

You just joined Bling Empire and we're excited to help you scale your business and take you to the next level.

Thank you for investing your attention and time into joining this.

While it's true that the infrastructure and info we provide can guide you to scale your business, now it's up to you to implement and take action.

## __Follow The 6 Steps Below To Onboard:__
### 1️⃣ Complete Your Onboarding Form
[Secondary Form](https://6gt0cl3u8ji.typeform.com/to/PuwtfufM)
### 2️⃣ Access the Video Modules
[Video Modules](https://your-video-modules-link.com)
### 3️⃣ Subscribe to the Group Call
[Add to Google Calendar](https://your-google-calendar-link.com)
### 4️⃣ Go Through Our Vision Document
[Vision Doc](https://docs.google.com/document/d/1FXXDqdwKfab_9HRAxqKlnm-YWV09ILRWbhR2Drh-VEE/edit?tab=t.0)
### 5️⃣ Access Your Notion Systems
Check your email and 1-1 support chat. Our VA Ricardo will send your Notion systems.
### 6️⃣ Book Your Onboarding Call
[Onboarding Call](https://calendly.com/scotthoho/bling-empire-onboarding-call)

✅ Final Note
Super excited to start this journey with you.

See you on the War Map Call.

Scott Ho
`,
    flags: MessageFlags.SuppressEmbeds
  });
});

client.login(process.env.DISCORD_TOKEN);