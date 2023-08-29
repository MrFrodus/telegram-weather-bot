import TelegramBot from "node-telegram-bot-api";

const token = "6524276387:AAFoKHzWnV5VNtDpUHYoBInI70S2SUyUf78";

const bot = new TelegramBot(token, {polling: true});

bot.on("message", msg => {
    console.log(msg);
})