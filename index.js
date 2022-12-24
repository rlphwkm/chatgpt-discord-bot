const Discord = require('discord.js');
const openai = require('openai');
const config = require('./config.json');

// Set the OpenAI API key
openai.apiKey = config.openaiapikey;

// Create a new Discord client
const client = new Discord.Client();

// Login to Discord using the bot token
client.login(config.bottokenkey);

// Listen for messages in Discord
client.on('message', message => {
  // Check if the message starts with the specified prefix
  if (message.content.startsWith(config.botprefix)) {
    // Get the prompt text by removing the prefix from the message
    const prompt = message.content.slice(config.botprefix.length).trim();

    // Send a request to the ChatGPT API with the prompt
    openai.completions.create({
      prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
      .then(response => {
        // Send the ChatGPT response back to the Discord channel
        message.channel.send(response.choices[0].text);
      })
      .catch(console.error);
  }
});
