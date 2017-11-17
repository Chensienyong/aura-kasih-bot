const Promise = require('bluebird');
Promise.config({
    cancellation: true
  });
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '461308497:AAEN6IgZUOPvBrnD11zEjTv6QxpgjkT6zMI';
// const url = 'https://aura-kasih-bot.herokuapp.com/';
const url = 'http://local.host:8000';
const port = process.env.PORT || 8000;

const express = require('express');
const bodyParser = require('body-parser');
const bot = new TelegramBot(TOKEN, {polling: true});
const group_id = -296076031
//https://api.telegram.org/bot{token}/{method}
//data={'chat_id': 12345, 'text': 'hello friend'}

const app = express();
app.use(bodyParser.json());

app.post(`/bot${TOKEN}`, (req, res) => {
    /* res.sendStatus(200); */
    res.send(req);
});

app.get('/', function(req, res){
    res.send('hello world');
});

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name);
    }
});

app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});