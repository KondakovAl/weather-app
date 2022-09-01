export interface DateProps {
    hour: number;
    time: string;
    weekday: string;
    monthAndDay: string;
}

export interface LocationCardProps {
    card: {
      name: string;
      main: {
        temp_min: number;
        temp_max: number;
      };
      weather: {
        description: string;
        icon: string;
      }[];
    };
  }