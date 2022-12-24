const Discord = require('discord.js');
const openai = require('openai');
const config = require("./config.json");

openai.apiKey = config.openaiapikey;

const client = new Discord.Client();
client.login(bottokenkey);

client.on('message', message => {
  if (message.content.startsWith('pingchatgpt')) {
    message.channel.send('Pong! I am up and running.');
  } else if (message.content.startsWith(config.botprefix)) {
    const prompt = message.content.split(' ').slice(1).join(' ');

    openai.completions.create({
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }).then(response => {
      const chatgptResponse = response.choices[0].text;
      message.channel.send(chatgptResponse);
    }).catch(console.error);
  }
});
