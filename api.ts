import axios from "axios";

export const getWeather = async (city: string, days: number, chatId: number) => {
    try {
      const { data } = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json?",
        {
          params: { q: city, days, key: "8e41c12f8c6148b1b0b151654232908" },
        }
      );
  
      return data;
    } catch (error: any) {
      throw error;
    }
  };