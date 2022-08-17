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
              `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${city}`,
              getAPIOptions
            )
        if (!res.ok) {
          console.error( `Couldn't fetch location.`, res.status)
        //   return false;
        }
        // console.log( await res.json());
        const resJSON = await res.json(); 
        return await resJSON.data.map(
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
  } catch (error) {
    if (error instanceof Error) {
      console.error( `Couldn't fetch location.`, error.message)
    }
    //   return false;
  }

};



// export const getLocation = (city: string) => {
//  const data = fetch(
//         `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${city}`,
//         getAPIOptions
//       )
//         .then((response) => response.json())
//         .then((response) => 
//               {const responseData = response.data.map(
//                 (city: {
//                   longitude: number;
//                   latitude: number;
//                   name: string;
//                   countryCode: string;
//                 }) => {
//                   return {
//                     value: `${city.latitude} ${city.longitude}`,
//                     label: `${city.name}, ${city.countryCode}`,
//                   };
//                 }
//               )
//               return  responseData;
//             }
//           )
//         .catch((err) => console.error(err));
//         return  responseData;
//   };


// export const getAPIOptions = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3c2a94143amshe8df28fbd7bf5efp1999a4jsn610312e6d0e4',
// 		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
// 	}
// };

// const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

// export const getLocation = (city: string) => {
//     fetch(
//       `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${city}`,
//       getAPIOptions
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         return {
//           options: response.data.map(
//             (city: {
//               longitude: number;
//               latitude: number;
//               name: string;
//               countryCode: string;
//             }) => {
//               return {
//                 value: `${city.latitude} ${city.longitude}`,
//                 label: `${city.name} ${city.countryCode}`,
//               };
//             }
//           ),
//         };
//       })
//       .catch((err) => console.error(err));
//   };