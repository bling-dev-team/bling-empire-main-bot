// send-guide-ops-team.js
require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const START_HERE_CHANNEL_ID = '1465731071432724713';

const channels = {
  startHere: '1465731071432724713',
  announcements: '1504555573419442196',

  scalersChat: '1465435761653583932',
  general: '1465725977610162398',
  wins: '1478441202268241950',
  questions: '1503550024393425128',
  grindMode: '1503531944498040992',
  socialShoutouts: '1503532302876020940',

  adsSupport: '1479280828541308959',
  whopSupport: '1469104904902541478',
  everfitSupport: '1471257496416030925',

  westCoasters: '1503525871120814262',
  midwesters: '1503525951462440991',
  eastCoasters: '1503526079007166565',
  internationals: '1503526265406357634',

  coworkingLounge: '1503547547124240526'
};

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(START_HERE_CHANNEL_ID);

  if (!channel) {
    console.log('❌ Ops Team channel not found.');
    process.exit(1);
  }

  const bannerEmbed = new EmbedBuilder()
    .setImage('https://media.discordapp.net/attachments/1504215883227332769/1511771827670745258/BE_SERVER.png?ex=6a21aabb&is=6a20593b&hm=3ae22f268ede3f3125618f90680f621805508843f3fc14439a789196cda67cb6&=&format=webp&quality=lossless&width=839&height=839');

  const introEmbed = new EmbedBuilder()
    .setTitle('👋 Welcome to Bling Empire')
    .setDescription(
      `Everything you need to navigate the community and get the most value from your membership.\n\n` +
      `Start by reviewing the sections below so you know where to go, where to ask questions, and how to connect with the community.`
    );

    const teamEmbed = new EmbedBuilder()
  .setTitle('👥 The Bling Team')
  .setDescription(
    `If you need support, guidance, or have questions, here are the people to reach out to:\n\n` +

    `💜 **Celi | CSM**\n` +
    `Your main point of contact to help ensure your success in the program.\n\n` +

    `💰 **Julian | Sales Specialist**\n` +
    `All sales-related questions.\n\n` +

    `📈 **Ronda | Ads/Ops Specialist**\n` +
    `All ads + operations-related questions.\n\n` +

    `👑 **Scott | CEO**\n` +
    `High-level business strategy questions.`
  );

  const onboardingEmbed = new EmbedBuilder()
    .setTitle('╰── 📌 Onboarding ──╮')
    .setDescription(
      `Everything you need to get started in Bling Empire. Review these channels first to stay informed, complete your onboarding, and make the most of your membership.\n\n` +
      `📌 <#${channels.startHere}>\nStart here first. Important onboarding steps, resources, and instructions for all members.\n\n` +
      `📢 <#${channels.announcements}>\nOfficial updates, community news, events, and important announcements from the team.`
    );

  const blingEmpireEmbed = new EmbedBuilder()
    .setTitle('╰── 🚀 Bling Empire Chats ──╮')
    .setDescription(
      `Everything related to community discussions, networking, accountability, and celebrating progress happens here.\n\n` +
      `🚀 <#${channels.scalersChat}> *(Scalers Only)*\nExclusive channel for Scaler members to network, share strategies, and discuss advanced growth topics.\n\n` +
      `💬 <#${channels.general}>\nThe main community chat. Ask questions, connect with members, and join the conversation.\n\n` +
      `💎 <#${channels.wins}>\nCelebrate your victories, milestones, client results, and business achievements.\n\n` +
      `🙋 <#${channels.questions}>\nNeed help? Ask your questions here and get support from the community and team.\n\n` +
      `💪 <#${channels.grindMode}>\nDaily accountability, action-taking, and progress updates.\n\n` +
      `📱 <#${channels.socialShoutouts}>\nShare your social media content that need extra engagement and support fellow members.`
    );

  const supportEmbed = new EmbedBuilder()
    .setTitle('╰── 🛠️ Support Chats ──╮')
    .setDescription(
      `Need help with tools, platforms, or partner services? Use these channels for support and troubleshooting.\n\n` +
      `📊 <#${channels.adsSupport}>\nQuestions about paid ads, campaigns, lead generation, and advertising strategies.\n\n` +
      `💰 <#${channels.whopSupport}>\nSupport related to Whop setup, access, payments, and platform questions.\n\n` +
      `🏋️ <#${channels.everfitSupport}>\nSupport related to Everfit setup, client management, and fitness coaching systems.`
    );

  const regionalEmbed = new EmbedBuilder()
    .setTitle('╰── 🌎 Regional Chats ──╮')
    .setDescription(
      `Connect with members in your region, build local relationships, coordinate meetups, and network with people in similar time zones.\n\n` +
      `🏝️ <#${channels.westCoasters}>\nConnect with members in the Pacific Time Zone (PST).\n\n` +
      `🌽 <#${channels.midwesters}>\nConnect with members in the Central Time Zone (CST).\n\n` +
      `🗽 <#${channels.eastCoasters}>\nConnect with members in the Eastern Time Zone (EST).\n\n` +
      `✈️ <#${channels.internationals}>\nConnect with members outside the United States.`
    );

  const coworkingEmbed = new EmbedBuilder()
    .setTitle('╰── 🎙️ Coworking Lounge ──╮')
    .setDescription(
      `Join live voice conversations, networking sessions, coworking calls, and collaborative discussions with fellow members.\n\n` +
      `🎙️ <#${channels.coworkingLounge}>\nHop into voice chats, coworking sessions, networking, and live collaboration with other members.`
    );

await channel.send({
  embeds: [
    bannerEmbed,
    introEmbed,
    teamEmbed,
    onboardingEmbed,
    blingEmpireEmbed,
    supportEmbed,
    regionalEmbed,
    coworkingEmbed
  ]
});

  console.log('✅ Bling Empire Server Guide sent successfully.');

  process.exit(0);
});

client.login(process.env.DISCORD_TOKEN);