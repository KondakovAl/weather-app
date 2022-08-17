const API_KEY = 'a649475c47dcbbaa183c75ff29553b09';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

export const getWeatherData = async (city:string) => {
    try {
        const res = await fetch(
          `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`);
          console.log( await res.json());
          console.log(res.ok)
          if (!res.ok) {
            console.error( `Couldn't fetch weather.`, res.status)
            return false;
          }
          return await res.json();    
    } catch (error) {
      if (error instanceof Error) {
        console.error( `Couldn't fetch weather.`, error.message)
      }
        return false;
    }
  };
