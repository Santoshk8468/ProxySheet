export interface Country {
  code: string;
  name: string;
  cities?: {
    options: City[];
  };
}

export interface City {
  code: string;
  name: string;
}

export interface ProxyConfig {
  region: string;
  port: string;
  username: string;
  password: string;
  protocol: string;
  locRegion: string;
  country: string;
  city: string;
  state: string;
  isp: string;
}

export interface ProxyListConfig {
  quantity: number;
  addSession: boolean;
  sessionLifetime: string;
  highEndPool: boolean;      // _streaming-1 for fastest/most reliable proxies
  skipIspStatic: boolean;    // _skipispstatic-1 to skip static proxies
}

export interface LocationsData {
  countries: Country[];
}

