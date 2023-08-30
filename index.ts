import TelegramBot from "node-telegram-bot-api";
import { getWeather } from "./api";

const token = "6524276387:AAFoKHzWnV5VNtDpUHYoBInI70S2SUyUf78";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([{ command: "/start", description: "Start the bot" }]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

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
          [{ text: "Forecast for tomorrow", callback_data: "2" }],
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

bot.on("callback_query", async (msg) => {
  const days = Number(msg.data);
  const chatId = msg.message!.chat.id;
  const text = msg.message!.text;

  try {
    const weatherData = await getWeather(text!, days, chatId);

    await bot.sendMessage(
      chatId,
      `Forecast for ` +
        (days === 2
          ? `the next day`
          : days === 3
          ? `the next three days`
          : days === 7
          ? `the next week`
          : "")
    );

    if (days === 2) {
      return await bot.sendMessage(
        chatId,
        `Date: ${weatherData.forecast.forecastday[1].date} 
        \nMax Temperature: ${weatherData.forecast.forecastday[1].day.maxtemp_c}
        \nMin Temperature: ${weatherData.forecast.forecastday[1].day.mintemp_c}
        \nAvg Temperature: ${weatherData.forecast.forecastday[1].day.avgtemp_c}
        \nHumidity: ${weatherData.forecast.forecastday[1].day.avghumidity}`
      );
    }

    weatherData.forecast.forecastday.map((day: any) => {
      return bot.sendMessage(
        chatId,
        `Date: ${day.date} 
          \nMax Temperature: ${day.day.maxtemp_c}
          \nMin Temperature: ${day.day.mintemp_c}
          \nAvg Temperature: ${day.day.avgtemp_c}
          \nHumidity: ${day.day.avghumidity}`
      );
    });
  } catch (error: any) {
    return await bot.sendMessage(chatId, error.response.data.error.message);
  }
});
