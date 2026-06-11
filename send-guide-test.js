// send-guide-test.js
require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ChannelType
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const START_HERE_CHANNEL_ID = '1467981074125553965';

const channels = {
  startHere: '1467981074125553965',
  announcements: '1504866414631325846',

  scalersChat: '1505909005040750853',
  general: '1504215883227332769',
  wins: '1504216163259912213',
  questions: '1504216237327126608',
  grindMode: '1504216311755051110',
  socialShoutouts: '1504216381539745903',

  adsSupport: '1504215520159994028',
  whopSupport: '1504215614762389765',
  everfitSupport: '1504215691912548513',

  westCoasters: '1504867410082267346',
  midwesters: '1504867594564403270',
  eastCoasters: '1504867450850902056',
  internationals: '1504867662298222854',

  coworkingLounge: '1511381117473657074'
};

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(START_HERE_CHANNEL_ID);

  if (!channel) {
    console.log('❌ Start Here channel not found.');
    process.exit(1);
  }

  const bannerEmbed = new EmbedBuilder()
    .setImage('https://media.discordapp.net/attachments/1504215883227332769/1511771827670745258/BE_SERVER.png');

  const introEmbed = new EmbedBuilder()
    .setTitle('👋 Welcome to Bling Empire')
    .setDescription(
      `Everything you need to navigate the community and get the most value from your membership.\n\n` +
      `Start by reviewing the sections below so you know where to go, where to ask questions, and how to connect with the community.`
    );

  const onboardingEmbed = new EmbedBuilder()
    .setTitle('╰── 📌 Onboarding ──╮')
    .setDescription(
      `Everything you need to get started in Bling Empire. Review these channels first to stay informed, complete your onboarding, and make the most of your membership.\n\n` +
      `📌 <#${channels.startHere}>\nGet started here with onboarding steps and resources.\n\n` +
      `📢 <#${channels.announcements}>\nImportant updates, community news, and official announcements.`
    );

  const blingEmpireEmbed = new EmbedBuilder()
    .setTitle('╰── 🚀 Bling Empire ──╮')
    .setDescription(
      `Everything related to community discussions, networking, accountability, and celebrating progress happens here.\n\n` +
      `🚀 <#${channels.scalersChat}> *(Scalers Only)*\nExclusive channel for Scaler members to network, share strategies, and discuss advanced growth topics.\n\n` +
      `💬 <#${channels.general}>\nThe main community chat. Ask questions, connect with members, and join the conversation.\n\n` +
      `💎 <#${channels.wins}>\nCelebrate your victories, milestones, client results, and business achievements.\n\n` +
      `🙋 <#${channels.questions}>\nAsk questions and get support from the community and team.\n\n` +
      `💪 <#${channels.grindMode}>\nStay accountable by posting daily actions, goals, and progress updates.\n\n` +
      `📱 <#${channels.socialShoutouts}>\nShare your social media content, Instagram handles, wins, and support fellow members. Use the **💎 IG HANDLES 💎** thread to drop your IG handle.`
    );

  const supportEmbed = new EmbedBuilder()
    .setTitle('╰── 🛠️ Partnership Support ──╮')
    .setDescription(
      `Need help with tools, platforms, or partner services? Use these channels for support and troubleshooting.\n\n` +
      `📊 <#${channels.adsSupport}>\nQuestions about ads, campaigns, and lead generation.\n\n` +
      `💰 <#${channels.whopSupport}>\nHelp with Whop access, payments, and account-related concerns.\n\n` +
      `🏋️ <#${channels.everfitSupport}>\nSupport for Everfit setup, coaching systems, and client management.`
    );

  const regionalEmbed = new EmbedBuilder()
    .setTitle('╰── 🌎 Regional Chats ──╮')
    .setDescription(
      `Connect with members in your region, build local relationships, coordinate meetups, and network with people in similar time zones.\n\n` +
      `🏝️ <#${channels.westCoasters}>\nConnect with members located in the Pacific Time Zone (PST).\n\n` +
      `🌽 <#${channels.midwesters}>\nNetwork with members based in the Central Time Zone (CST).\n\n` +
      `🗽 <#${channels.eastCoasters}>\nConnect with members in the Eastern Time Zone (EST).\n\n` +
      `✈️ <#${channels.internationals}>\nMeet and collaborate with members located outside the United States.`
    );

  const coworkingEmbed = new EmbedBuilder()
    .setTitle('╰── 🎙️ Coworking Lounge ──╮')
    .setDescription(
      `Join live voice conversations, networking sessions, coworking calls, and collaborative discussions with fellow members.\n\n` +
      `🎙️ <#${channels.coworkingLounge}>\nHop into voice chats to network, collaborate, work alongside other members, and build meaningful connections within the community.`
    );

  await channel.send({
    embeds: [
      bannerEmbed,
      introEmbed,
      onboardingEmbed,
      blingEmpireEmbed,
      supportEmbed,
      regionalEmbed,
      coworkingEmbed
    ]
  });

  console.log('✅ Bling Empire Server Guide sent successfully.');

  const socialChannel = await client.channels.fetch(channels.socialShoutouts);

  if (!socialChannel || socialChannel.type !== ChannelType.GuildText) {
    console.log('❌ Social Shoutouts channel not found or not a text channel.');
    process.exit(1);
  }

  const thread = await socialChannel.threads.create({
    name: '💎 IG HANDLES 💎',
    autoArchiveDuration: 10080,
    reason: 'IG handles directory for Bling Empire members'
  });

  await thread.send({
    content:
`You can put in your IG handles here for everyone to see your content and follow you! 💎

SAMPLE IG 1
SAMPLE IG 2
SAMPLE IG 3`
  });

  console.log('✅ IG HANDLES thread created and message sent.');

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);