import TelegramBot from "node-telegram-bot-api";

const token = "6524276387:AAFoKHzWnV5VNtDpUHYoBInI70S2SUyUf78";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([{ command: "/start", description: "Start the bot" }]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  console.log(msg);

  if (text === "/start") {
    return await bot.sendMessage(
      chatId,
      "Welcome, please enter the name of the city"
    );
  }

  if (!msg.entities && text) {
    return await bot.sendMessage(chatId, msg.text!, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Forecast for tomorrow", callback_data: "1" }],
          [{ text: "Forecast for 3 days", callback_data: "3" }],
          [{ text: "Forecast for the next week", callback_data: "7" }],
        ],
      },
    });
  }

  return await bot.sendMessage(
    chatId,
    "I don't have this command, please enter the city name to get the forecast"
  );
});
