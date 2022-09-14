  export const getAPIOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3c2a94143amshe8df28fbd7bf5efp1999a4jsn610312e6d0e4',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

  export const getLocation = async (city:string) => {
  try {
      const res = await fetch(
              `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${city}`,
              getAPIOptions
            )
        const resLocation = await res.json(); 
        
        const location = resLocation.data.map(
            (city: {
              longitude: number;
              latitude: number;
              name: string;
              countryCode: string;
            }) => {
              return {
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
              };
            }
          )
          if (!res.ok) {
            console.error( `Couldn't fetch weather.`, res.status);
            return false;
          }
         
          return location;
          
  } catch (error) {
    if (error instanceof Error) {
      console.error( `Couldn't fetch location.`, error.message);
      
    }
  }

};