import axios from "axios";

const API_BASE_URL = "https://aerodatabox.p.rapidapi.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-RapidAPI-Key": "OvEezA3997msh66qZgNJ66YsAWs0p13mlOMjsnO4L2P0BG7sM4",
    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
  },
});

export const flightAPI = {
  // Tìm chuyến bay theo số hiệu
  searchByFlightNumber: async (flightNumber: string) => {
    const response = await api.get(`/flights/number/${flightNumber}`);
    return response.data;
  },

  // Tìm chuyến bay theo sân bay
  searchByAirport: async (
    airportCode: string,
    fromTime?: string,
    toTime?: string
  ) => {
    const params: any = {};
    if (fromTime) params.fromTime = fromTime;
    if (toTime) params.toTime = toTime;

    const response = await api.get(`/flights/airports/icao/${airportCode}`, {
      params,
    });
    return response.data;
  },

  // Lấy thông tin chuyến bay theo ID
  getFlightById: async (flightId: string) => {
    const response = await api.get(`/flights/${flightId}`);
    return response.data;
  },
};

export const airportAPI = {
  // Tìm sân bay theo từ khóa
  searchAirports: async (query: string) => {
    const response = await api.get(`/airports/search/term`, {
      params: { q: query },
    });
    return response.data;
  },

  // Lấy thông tin sân bay theo ICAO
  getAirportByIcao: async (icao: string) => {
    const response = await api.get(`/airports/icao/${icao}`);
    return response.data;
  },

  // Lấy thông tin sân bay theo IATA
  getAirportByIata: async (iata: string) => {
    const response = await api.get(`/airports/iata/${iata}`);
    return response.data;
  },
};
