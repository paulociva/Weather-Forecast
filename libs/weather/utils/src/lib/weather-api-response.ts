export interface CityResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface Temperature {
  day: number;
}

export interface Daily {
  dt: number;
  temp: Temperature;
}

export interface Hourly {
  dt: number
  temp: number;
}

export interface DataResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily?: Daily[];
  hourly?: Hourly[];
}
