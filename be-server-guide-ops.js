// update-server-guide-main.js
require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// BE MAIN SERVER: Channel containing the existing Server Guide
const START_HERE_CHANNEL_ID = '1465731071432724713';

// Existing Server Guide message to update
const SERVER_GUIDE_MESSAGE_ID = '1511820455562969210';

const channels = {
  startHere: '1465731071432724713',
  announcements: '1504555573419442196',

  scalersChat: '1465435761653583932',
  general: '1465725977610162398',
  wins: '1478441202268241950',
  questions: '1503550024393425128',
  grindMode: '1503531944498040992',
  socialShoutouts: '1503532302876020940',

  aiSupport: '1514381014800142407',
  contentFinderBot: '1504548545892450406',
  contentFinderBotScalers: '1504548818790912142',
  scottAi: '1514381603340812409',
  aiClientStatsTracker: '1514381964017401916',

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
  try {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(
      START_HERE_CHANNEL_ID
    );

    if (!channel) {
      throw new Error(
        'The channel containing the Server Guide was not found.'
      );
    }

    if (!channel.isTextBased()) {
      throw new Error(
        'The Server Guide channel is not a text-based channel.'
      );
    }

    console.log(
      `✅ Server Guide channel found: #${channel.name}`
    );

    const existingMessage = await channel.messages.fetch(
      SERVER_GUIDE_MESSAGE_ID
    );

    if (!existingMessage) {
      throw new Error(
        'The existing Server Guide message was not found.'
      );
    }

    console.log(
      '✅ Existing Server Guide message found.'
    );

    const bannerEmbed = new EmbedBuilder()
      .setImage(
        'https://media.discordapp.net/attachments/1504215883227332769/1511771827670745258/BE_SERVER.png'
      );

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

        `🤖 **Renzo | AI**\n` +
        `All operations and AI-related questions.\n\n` +

        `👑 **Scott | CEO**\n` +
        `High-level business strategy questions.`
      );

    const onboardingEmbed = new EmbedBuilder()
      .setTitle('╰── 📌 Onboarding ──╮')
      .setDescription(
        `Everything you need to get started in Bling Empire. Review these channels first to stay informed, complete your onboarding, and make the most of your membership.\n\n` +

        `📌 <#${channels.startHere}>\n` +
        `Start here first. Important onboarding steps, resources, and instructions for all members.\n\n` +

        `📢 <#${channels.announcements}>\n` +
        `Official updates, community news, events, and important announcements from the team.`
      );

    const blingEmpireEmbed = new EmbedBuilder()
      .setTitle('╰── 🚀 Bling Empire Chats ──╮')
      .setDescription(
        `Everything related to community discussions, networking, accountability, and celebrating progress happens here.\n\n` +

        `🚀 <#${channels.scalersChat}> *(Scalers Only)*\n` +
        `Exclusive channel for Scaler members to network, share strategies, and discuss advanced growth topics.\n\n` +

        `💬 <#${channels.general}>\n` +
        `The main community chat. Ask questions, connect with members, and join the conversation.\n\n` +

        `💎 <#${channels.wins}>\n` +
        `Celebrate your victories, milestones, client results, and business achievements.\n\n` +

        `🙋 <#${channels.questions}>\n` +
        `Need help? Ask your questions here and get support from the community and team.\n\n` +

        `💪 <#${channels.grindMode}>\n` +
        `Daily accountability, action-taking, and progress updates.\n\n` +

        `📱 <#${channels.socialShoutouts}>\n` +
        `Share your social media content that needs extra engagement and support fellow members.`
      );

    const aiToolsEmbed = new EmbedBuilder()
      .setTitle('╰── 🤖 AI Tools ──╮')
      .setDescription(
        `Access AI-powered tools to find resources, get support, and accelerate your learning and business growth inside Bling Empire.\n\n` +

        `💡 <#${channels.contentFinderBot}>\n` +
        `Search and instantly find course modules, coaching call recordings, SOPs, templates, and resources available to all members.\n\n` +

        `💡 <#${channels.contentFinderBotScalers}>\n` +
        `Access everything in Content Finder plus exclusive Scalers-level trainings, resources, and advanced content.\n\n` +

        `🤖 <#${channels.scottAi}>\n` +
        `Ask ScottAI questions about business, sales, lead generation, client acquisition, systems, and implementation. Trained on Scott's course content, coaching calls, SOPs, and frameworks.\n\n` +

        `🔢 <#${channels.aiClientStatsTracker}>\n` +
        `Connect your software to an automated dashboard that tracks and visualizes your key business metrics in real time.`
      );

    const supportEmbed = new EmbedBuilder()
      .setTitle('╰── 🛠️ Support Chats ──╮')
      .setDescription(
        `Need help with tools, platforms, partner services, operations, or AI? Use these channels for support and troubleshooting.\n\n` +

        `🤖 <#${channels.aiSupport}>\n` +
        `Main chat for operations, AI-related questions, troubleshooting, and guidance on using Bling Empire's AI tools.\n\n` +

        `📊 <#${channels.adsSupport}>\n` +
        `Questions about paid ads, campaigns, lead generation, and advertising strategies.\n\n` +

        `💰 <#${channels.whopSupport}>\n` +
        `Support related to Whop setup, access, payments, and platform questions.\n\n` +

        `🏋️ <#${channels.everfitSupport}>\n` +
        `Support related to Everfit setup, client management, and fitness coaching systems.`
      );

    const regionalEmbed = new EmbedBuilder()
      .setTitle('╰── 🌎 Regional Chats ──╮')
      .setDescription(
        `Connect with members in your region, build local relationships, coordinate meetups, and network with people in similar time zones.\n\n` +

        `🏝️ <#${channels.westCoasters}>\n` +
        `Connect with members in the Pacific Time Zone (PST).\n\n` +

        `🌽 <#${channels.midwesters}>\n` +
        `Connect with members in the Central Time Zone (CST).\n\n` +

        `🗽 <#${channels.eastCoasters}>\n` +
        `Connect with members in the Eastern Time Zone (EST).\n\n` +

        `✈️ <#${channels.internationals}>\n` +
        `Connect with members outside the United States.`
      );

    const coworkingEmbed = new EmbedBuilder()
      .setTitle('╰── 🎙️ Coworking Lounge ──╮')
      .setDescription(
        `Join live voice conversations, networking sessions, coworking calls, and collaborative discussions with fellow members.\n\n` +

        `🎙️ <#${channels.coworkingLounge}>\n` +
        `Hop into voice chats, coworking sessions, networking, and live collaboration with other members.`
      );

    await existingMessage.edit({
      embeds: [
        bannerEmbed,
        introEmbed,
        teamEmbed,
        onboardingEmbed,
        blingEmpireEmbed,
        aiToolsEmbed,
        supportEmbed,
        regionalEmbed,
        coworkingEmbed
      ]
    });

    console.log(
      '✅ Existing BE Main Server Guide updated successfully.'
    );

    console.log(
      '✅ No new Discord message was sent.'
    );
  } catch (error) {
    console.error(
      '❌ Failed to update the BE Main Server Guide:',
      error
    );

    process.exitCode = 1;
  } finally {
    client.destroy();
  }
});

client.login(process.env.DISCORD_TOKEN);