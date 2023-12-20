const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const config = require('./config.json');

// List of preset responses
const responses = [
  "probably not.",
  "yeah maybe.",
  "it really depends on how lucky you feel.",
  "nope."
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots

  if (message.content.startsWith('!hello')) {
    const userDisplayName = message.member.displayName;
    message.channel.send(`Hello, ${userDisplayName}!`);
  }

  if (message.content.startsWith('!q')) {
    // Extract the text following !q and trim any leading/trailing whitespace
    const questionText = message.content.slice('!q'.length).trim();

    // Check if there's text after !q
    if (questionText) {
      // Select a random response from the list
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Get the user's display name
      const userDisplayName = message.member.displayName;

      // Add a 500 ms delay before sending the response
      setTimeout(() => {
        // Send a bold message with the custom response
        message.channel.send(`Hi, ${userDisplayName}, you asked: ${questionText}\nI'm thinking.. **${randomResponse}**`);
      }, 500);
    } else {
      // No text after !q, reply with "I didn't get the question"
      message.channel.send("I didn't get the question.");
    }
  }
});

client.login(config.token);
