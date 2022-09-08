export const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        return `${lat} ${lon}`
      });
}