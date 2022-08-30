export const getDate = (timezone: number) => {
    const date = new Date();
   
    /*Date to UTC 0*/
    const dateTimeStamp = date.getTime();
    const offsetTimeStamp = date.getTimezoneOffset() * 60 * 1000;
    const dateInUTC = dateTimeStamp + offsetTimeStamp;

    /*Date to current Timezone Date*/
    const dateInLocation = dateInUTC + timezone * 1000;
    const dateWithTimezone = new Date(dateInLocation);

    const hour = parseInt(dateWithTimezone.toLocaleString("en-US", {hour: "2-digit", hour12: false})); 
    const time = dateWithTimezone.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", })
    const weekday = date.toLocaleString("en-US", {weekday: "short"}) 
    const monthAndDay = date.toLocaleString("en-US", {month: 'short', day: 'numeric'})
  
    return {hour, time, weekday, monthAndDay};
};

export const getFormatedHours = (unix: number, timezone: number) => {
    const date = new Date(unix * 1000);

    /*Date to UTC 0*/
    const dateTimeStamp = date.getTime();
    const offsetTimeStamp = date.getTimezoneOffset() * 60 * 1000;
    const dateInUTC = dateTimeStamp + offsetTimeStamp;

    const dateInLocation = dateInUTC + timezone * 1000;
    const dateWithTimezone = new Date(dateInLocation);

    const time = dateWithTimezone.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", })

    return time
}