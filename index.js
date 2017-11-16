const TelegramBot = require('node-telegram-bot-api');
const token = '461308497:AAEN6IgZUOPvBrnD11zEjTv6QxpgjkT6zMI';
const bot = new TelegramBot(token);
const group_id = -296076031
//https://api.telegram.org/bot{token}/{method}
//data={'chat_id': 12345, 'text': 'hello friend'}

bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.from.id, "Hello  " + msg.from.first_name);
    }
});