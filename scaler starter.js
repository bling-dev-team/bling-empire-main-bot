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
  console.log(Logged in as ${client.user.tag});
});

client.on('guildMemberAdd', async (member) => {
  if (processingMembers.has(member.id)) return;

  processingMembers.add(member.id);

  try {
    const guild = member.guild;

    const channelCreationAlertId = '1508519056439775352';
    const GENERAL_CHANNEL_ID = '1465725977610162398';

    const channelIdsToGiveAccess = [
      '1465432980288831600',
      '1504555573419442196',
      '1479277944739205190',
      '1479277944739205190',
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
      }
    }

    let programType = 'Unknown';

    if (member.roles.cache.some(role => role.name === 'Client - Scaler')) {
      programType = 'Scaler';
    } else if (member.roles.cache.some(role => role.name === 'Client - Starter')) {
      programType = 'Starter';
    }

    const cleanName = member.displayName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);

    const channelName = 🤵‍♂️┃${cleanName};

    const existingPrivateChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    if (existingPrivateChannel) return;

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
      }
    }

    const channel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites
    });

    const starterOnboardingMessage = `
# Welcome to Bling Empire Mastermind 🙌

We're excited to have you inside the Starter Program!

This program is designed to help you build the foundations of a successful online coaching business. Throughout your journey, you'll work through the training step by step, receive personalized guidance from our team, and build the systems needed to consistently attract clients and grow your business.

Before we dive in, please complete the onboarding steps below to make sure you're fully set up for success.

If you have any questions along the way, don't hesitate to reach out in this channel. We're here to help every step of the way.

Our goal is to help you build a strong foundation first. Once we build your business to the point where you're ready to hire and scale, we'll invite you into the *Scaler Program.* 🚀

## _Links for the Onboarding Steps:_
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

    const scalerOnboardingMessage = `
# Welcome to Bling Empire Mastermind 🙌

Welcome to the Scaler Program!

This program is built for business owners who are ready to optimize, implement, and scale. You'll work closely with our team to strengthen your systems, improve operations, and accelerate your business growth through advanced coaching and implementation.

Before we get started, please complete the onboarding steps below so we can get everything set up and support you as efficiently as possible.

If you need anything throughout the program, simply reach out in this channel. We're excited to help you scale to the next level.

## _Links for the Onboarding Steps:_
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

let onboardingMessage;

if (programType === 'Scaler') {
  onboardingMessage = scalerOnboardingMessage;
} else if (programType === 'Starter') {
  onboardingMessage = starterOnboardingMessage;
} else {
  console.log(⚠️ ${member.displayName} joined without a valid program role.);
  return;
}

await channel.send({
  content: onboardingMessage,
  flags: MessageFlags.SuppressEmbeds
});

    const alertChannel = guild.channels.cache.get(channelCreationAlertId);

    if (alertChannel) {
      await alertChannel.send({
        content: `
🚨 *New Client Channel Created*

👤 *Client:* ${member.displayName}
🎯 *Program:* ${programType}
📁 *Channel:* ${channel}
📅 *Date Created:* <t:${Math.floor(Date.now() / 1000)}:F>
`,
        flags: MessageFlags.SuppressEmbeds
      });
    }
  } catch (error) {
    console.error(❌ Error processing ${member.displayName}:, error);
  } finally {
    processingMembers.delete(member.id);
  }
});

client.login(process.env.DISCORD_TOKEN);