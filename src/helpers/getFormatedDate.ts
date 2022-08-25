export const getFormatedDate = (unix: number) => {
    const date = new Date((unix ) * 1000);


    const weekday = date.toLocaleString("en-US", {weekday: "short"}) 
    const monthAndDay = date.toLocaleString("en-US", {month: 'short', day: 'numeric'}) 


    return {weekday, monthAndDay};
  };