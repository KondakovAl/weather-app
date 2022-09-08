export interface DateProps {
    hour: number;
    time: string;
    weekday: string;
    monthAndDay: string;
}

export interface ThemeProps {
  background: string;
  color: string
}

export interface CurrentLocationProps {
  value: string;
  label: string;
}

export interface CoordsProps {
  lon: string; 
  lat: string;
}

export interface DragCardProps { 
  id: number;
  order: number;
}

export interface FavCardProps {
  name: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  id: number;
  }

export interface CardMainProps {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  }
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  timezone?: number;
  }

  /*Sum component*/

export interface CardOtherProps  {
  city: {
    timezone: number;
  };
  list: {
    slice: Array<never>['slice'];
    dt: number;
    dt_txt: string;
     main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: {
      description: string;
      main: string;
      icon: string;
    }[];
 }
}

/*Sum_1 component*/
export interface CardHourlyProps {
  city: {
    timezone: number;
  };
  list: {
    slice: Array<never>['slice'];
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
    description: string;
    main: string;
    icon: string;
    }[];
  }
}
  
/*Sum_2 component*/
  export interface CardDailyProps {
    list: {
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: {
        description: string;
        icon: string;
      }[]; 
     }[]; 
  }