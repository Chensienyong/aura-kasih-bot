const express = require('express');
const bodyParser = require('body-parser');

const Promise = require('bluebird');
Promise.config({
    cancellation: true
  });

  const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '461308497:AAEN6IgZUOPvBrnD11zEjTv6QxpgjkT6zMI';
// const url = 'https://aura-kasih-bot.herokuapp.com/';
const url = 'http://local.host:8000';
const port = process.env.PORT || 8000;
const bot = new TelegramBot(TOKEN, {polling: true});
const group_id = -296076031

//https://api.telegram.org/bot{token}/{method}
//data={'chat_id': 12345, 'text': 'hello friend'}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/bot${TOKEN}`, (req, res) => {
    console.log(req.body);
    report_stuff = req.body;
    message = `
        \*\*Ada Laporan Query ${(report_stuff.type == 'mysql') ? "MySQL" : "Mongo"} dari ${report_stuff.reporter_name}<__[${report_stuff.reporter_email}](mailto:${report_stuff.reporter_email})__>!\n\*\*\`\`\`${report_stuff.query}\`\`\`\nAlasan pelaporan: ${report_stuff.reason}\n\nEngineers yang mungkin terlibat:\n`;
    report_stuff.blamed_users.forEach(function(entry) {
        message += `- \`${entry.line}\` - ${entry.name},\nkarena commit di PR: ${entry.pull_requests}\n`
    });
    bot.sendMessage(group_id, message, {
      parse_mode: "Markdown"
    });
    res.sendStatus(200);
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