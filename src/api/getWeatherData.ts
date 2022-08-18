const API_KEY = 'a649475c47dcbbaa183c75ff29553b09';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

export const getWeatherData = async ( lon: number, lat: number ) => {
    try {
        const res = await fetch(
          `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
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

 


  // const API_KEY = 'a649475c47dcbbaa183c75ff29553b09';
  // const BASE_URL = 'https://api.openweathermap.org/data/3.0/'
  // const EXCLUDE = 'current,hourly,daily'
  
  // export const getWeatherData = async (lat: number, lon: number) => {
  //     try {
  //         const res = await fetch(
  //           `${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude=${EXCLUDE}&appid=${API_KEY}&units=metric`);
  //           console.log( await res.json());
  //           console.log(res.ok)
  //           if (!res.ok) {
  //             console.error( `Couldn't fetch weather.`, res.status)
  //             return false;
  //           }
  //           return await res.json();    
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.error( `Couldn't fetch weather.`, error.message)
  //       }
  //         return false;
  //     }
  //   };
  
  