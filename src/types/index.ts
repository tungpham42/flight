export interface Airport {
  icao: string;
  iata: string;
  name: string;
  shortName: string;
  municipalityName: string;
  location: {
    lat: number;
    lon: number;
  };
  countryCode: string;
}

export interface Flight {
  number: string;
  status: string;
  departure: {
    airport: Airport;
    scheduledTime: string;
    actualTime?: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: Airport;
    scheduledTime: string;
    actualTime?: string;
    terminal?: string;
    gate?: string;
  };
  aircraft?: {
    model: string;
    reg: string;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
}

export interface FlightSearchParams {
  flightNumber?: string;
  airline?: string;
}

export interface AirportSearchParams {
  icao?: string;
  iata?: string;
  name?: string;
}
