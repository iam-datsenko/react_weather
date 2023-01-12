export type Card = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
  };
  name: string;
};

export type Details = {
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
  list: [
    {
      dt: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      weather: [
        {
          main: string;
          icon: string;
          description: string;
        }
      ];
      wind: {
        speed: number;
        gust: number;
        deg: number;
      };
      clouds: {
        all: number;
      };
      pop: number;
      visibility: number;
    }
  ];
};

export enum ErrorType {
  LoadError = 'Unable to load forecast data',
  SearchError = 'Incorrect city name',
  UpdateError = 'Unable to update forecast data',
  None = '',
}
