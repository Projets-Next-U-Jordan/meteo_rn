import * as Location from 'expo-location';

export class APIResponseItem {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;

    getIconUrl(): string {
        return `http://openweathermap.org/img/wn/${this.weather[0].icon}@4x.png`;
    }

    static fromJSON(json: any): APIResponseItem {
        let item:APIResponseItem = new APIResponseItem();
        item.dt = json.dt;
        item.main = json.main;
        item.weather = json.weather;
        item.clouds = json.clouds;
        item.wind = json.wind;
        item.sys = json.sys;
        item.dt_txt = json.dt_txt;
        return item;
    }
}

export class APIResponseCity {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;

    static fromJSON(json: any): APIResponseCity {
        let city:APIResponseCity = new APIResponseCity();
        city.id = json.id;
        city.name = json.name;
        city.coord = json.coord;
        city.country = json.country;
        return city;
    }
}

export class APIResponse {
    cod: string;
    message: number;
    cnt: number;
    list: Array<APIResponseItem>;
    city: APIResponseCity;
    
    constructor() {
        this.list = [];
        this.city = new APIResponseCity();
    }

    static fromJSON(json: any): APIResponse {
        let response:APIResponse = new APIResponse();
        response.cod = json.cod;
        response.message = json.message;
        response.cnt = json.cnt;
        response.list = json.list.map(APIResponseItem.fromJSON);
        response.city = APIResponseCity.fromJSON(json.city);
        return response;
    }
}

export class Api {

    private static lastCallTime: number | null = null;
    private static COOLDOWN_TIME = 90000;

    private static API_KEY = process.env.EXPO_PUBLIC_API_KEY;
    private static API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

    static async getLocation(): Promise<Location.LocationObjectCoords|null> {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        return location.coords;
    }

    static async getWeather(lat:number, lon:number, lang:string="fr", units:string="metric"): Promise<APIResponse> {
        if (this.lastCallTime !== null && Date.now() - this.lastCallTime < this.COOLDOWN_TIME) {
            return null;
        }
        console.log(Api.API_KEY);
        let url = `${Api.API_URL}?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${Api.API_KEY}`;
        let response = await fetch(url);
        let json = await response.json();
        // let json = JSON.parse(mockData);
        return APIResponse.fromJSON(json);
    }

    static getWeatherIconUrl(icon: string): string {
        return `http://openweathermap.org/img/wn/${icon}@4x.png`;
    }

}

export const TimeOfDayGradient = {
    MORNING: ['#FFA500', '#FF4500'], // Shades of orange
    AFTERNOON: ['#87CEEB', '#0000FF'], // Shades of blue
    EVENING: ['#FFD700', '#8B4513'], // Shades of gold and brown
    NIGHT: ['#483D8B', '#191970'], // Shades of dark blue
    getGradient(timestamp: number|undefined): Array<string> {
        if (timestamp === undefined) {
            return ["#191970","#002395"];
        }
        let date = new Date(timestamp * 1000);
        let hours = date.getUTCHours();
        if (hours >= 6 && hours < 12) {
            return this.MORNING;
        } else if (hours >= 12 && hours < 16) {
            return this.AFTERNOON;
        } else if (hours >= 16 && hours < 20) {
            return this.EVENING;
        } else {
            return this.NIGHT;
        }
    }
}


const mockData = `
{
	"cod": "200",
	"message": 0,
	"cnt": 40,
	"list": [
		{
			"dt": 1712869200,
			"main": {
				"temp": 13.34,
				"feels_like": 12.32,
				"temp_min": 10.97,
				"temp_max": 13.34,
				"pressure": 1033,
				"sea_level": 1033,
				"grnd_level": 1001,
				"humidity": 61,
				"temp_kf": 2.37
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02n"
				}
			],
			"clouds": {
				"all": 15
			},
			"wind": {
				"speed": 1.89,
				"deg": 308,
				"gust": 3.58
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-11 21:00:00"
		},
		{
			"dt": 1712880000,
			"main": {
				"temp": 11.17,
				"feels_like": 10.09,
				"temp_min": 9.49,
				"temp_max": 11.17,
				"pressure": 1033,
				"sea_level": 1033,
				"grnd_level": 1001,
				"humidity": 67,
				"temp_kf": 1.68
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03n"
				}
			],
			"clouds": {
				"all": 33
			},
			"wind": {
				"speed": 1.3,
				"deg": 315,
				"gust": 2.18
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-12 00:00:00"
		},
		{
			"dt": 1712890800,
			"main": {
				"temp": 8.37,
				"feels_like": 8.37,
				"temp_min": 8.37,
				"temp_max": 8.37,
				"pressure": 1034,
				"sea_level": 1034,
				"grnd_level": 1001,
				"humidity": 75,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 51
			},
			"wind": {
				"speed": 1.17,
				"deg": 311,
				"gust": 1.7
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-12 03:00:00"
		},
		{
			"dt": 1712901600,
			"main": {
				"temp": 8.63,
				"feels_like": 8.63,
				"temp_min": 8.63,
				"temp_max": 8.63,
				"pressure": 1034,
				"sea_level": 1034,
				"grnd_level": 1001,
				"humidity": 77,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 65
			},
			"wind": {
				"speed": 0.56,
				"deg": 325,
				"gust": 1.18
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-12 06:00:00"
		},
		{
			"dt": 1712912400,
			"main": {
				"temp": 13.93,
				"feels_like": 13.02,
				"temp_min": 13.93,
				"temp_max": 13.93,
				"pressure": 1034,
				"sea_level": 1034,
				"grnd_level": 1001,
				"humidity": 63,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02d"
				}
			],
			"clouds": {
				"all": 21
			},
			"wind": {
				"speed": 2.31,
				"deg": 2,
				"gust": 3.16
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-12 09:00:00"
		},
		{
			"dt": 1712923200,
			"main": {
				"temp": 18.31,
				"feels_like": 17.61,
				"temp_min": 18.31,
				"temp_max": 18.31,
				"pressure": 1032,
				"sea_level": 1032,
				"grnd_level": 1000,
				"humidity": 54,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02d"
				}
			],
			"clouds": {
				"all": 12
			},
			"wind": {
				"speed": 2.45,
				"deg": 6,
				"gust": 3.07
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-12 12:00:00"
		},
		{
			"dt": 1712934000,
			"main": {
				"temp": 19.94,
				"feels_like": 19.32,
				"temp_min": 19.94,
				"temp_max": 19.94,
				"pressure": 1030,
				"sea_level": 1030,
				"grnd_level": 998,
				"humidity": 51,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 83
			},
			"wind": {
				"speed": 2.67,
				"deg": 360,
				"gust": 3.73
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-12 15:00:00"
		},
		{
			"dt": 1712944800,
			"main": {
				"temp": 16.78,
				"feels_like": 16.34,
				"temp_min": 16.78,
				"temp_max": 16.78,
				"pressure": 1030,
				"sea_level": 1030,
				"grnd_level": 998,
				"humidity": 70,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 49
			},
			"wind": {
				"speed": 2.24,
				"deg": 323,
				"gust": 3.86
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-12 18:00:00"
		},
		{
			"dt": 1712955600,
			"main": {
				"temp": 14.14,
				"feels_like": 13.67,
				"temp_min": 14.14,
				"temp_max": 14.14,
				"pressure": 1031,
				"sea_level": 1031,
				"grnd_level": 998,
				"humidity": 79,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 68
			},
			"wind": {
				"speed": 1.51,
				"deg": 303,
				"gust": 2.06
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-12 21:00:00"
		},
		{
			"dt": 1712966400,
			"main": {
				"temp": 12.73,
				"feels_like": 12.2,
				"temp_min": 12.73,
				"temp_max": 12.73,
				"pressure": 1030,
				"sea_level": 1030,
				"grnd_level": 998,
				"humidity": 82,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 80
			},
			"wind": {
				"speed": 0.8,
				"deg": 297,
				"gust": 0.95
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-13 00:00:00"
		},
		{
			"dt": 1712977200,
			"main": {
				"temp": 11.68,
				"feels_like": 11.1,
				"temp_min": 11.68,
				"temp_max": 11.68,
				"pressure": 1030,
				"sea_level": 1030,
				"grnd_level": 997,
				"humidity": 84,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 804,
					"main": "Clouds",
					"description": "couvert",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 97
			},
			"wind": {
				"speed": 0.45,
				"deg": 299,
				"gust": 0.68
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-13 03:00:00"
		},
		{
			"dt": 1712988000,
			"main": {
				"temp": 11.93,
				"feels_like": 11.37,
				"temp_min": 11.93,
				"temp_max": 11.93,
				"pressure": 1030,
				"sea_level": 1030,
				"grnd_level": 997,
				"humidity": 84,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 804,
					"main": "Clouds",
					"description": "couvert",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 95
			},
			"wind": {
				"speed": 0.41,
				"deg": 296,
				"gust": 0.54
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-13 06:00:00"
		},
		{
			"dt": 1712998800,
			"main": {
				"temp": 17.78,
				"feels_like": 17.31,
				"temp_min": 17.78,
				"temp_max": 17.78,
				"pressure": 1029,
				"sea_level": 1029,
				"grnd_level": 997,
				"humidity": 65,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 34
			},
			"wind": {
				"speed": 1.08,
				"deg": 68,
				"gust": 0.69
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-13 09:00:00"
		},
		{
			"dt": 1713009600,
			"main": {
				"temp": 22.93,
				"feels_like": 22.61,
				"temp_min": 22.93,
				"temp_max": 22.93,
				"pressure": 1027,
				"sea_level": 1027,
				"grnd_level": 995,
				"humidity": 51,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 33
			},
			"wind": {
				"speed": 1.04,
				"deg": 82,
				"gust": 0.39
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-13 12:00:00"
		},
		{
			"dt": 1713020400,
			"main": {
				"temp": 24.53,
				"feels_like": 24.21,
				"temp_min": 24.53,
				"temp_max": 24.53,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 45,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 55
			},
			"wind": {
				"speed": 1.15,
				"deg": 107,
				"gust": 0.65
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-13 15:00:00"
		},
		{
			"dt": 1713031200,
			"main": {
				"temp": 20.73,
				"feels_like": 20.45,
				"temp_min": 20.73,
				"temp_max": 20.73,
				"pressure": 1024,
				"sea_level": 1024,
				"grnd_level": 992,
				"humidity": 61,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 40
			},
			"wind": {
				"speed": 0.88,
				"deg": 170,
				"gust": 0.86
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-13 18:00:00"
		},
		{
			"dt": 1713042000,
			"main": {
				"temp": 17.44,
				"feels_like": 17.17,
				"temp_min": 17.44,
				"temp_max": 17.44,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 74,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02n"
				}
			],
			"clouds": {
				"all": 14
			},
			"wind": {
				"speed": 1.35,
				"deg": 234,
				"gust": 1.36
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-13 21:00:00"
		},
		{
			"dt": 1713052800,
			"main": {
				"temp": 16.2,
				"feels_like": 15.94,
				"temp_min": 16.2,
				"temp_max": 16.2,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 79,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03n"
				}
			],
			"clouds": {
				"all": 49
			},
			"wind": {
				"speed": 0.88,
				"deg": 234,
				"gust": 0.94
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-14 00:00:00"
		},
		{
			"dt": 1713063600,
			"main": {
				"temp": 15.04,
				"feels_like": 14.79,
				"temp_min": 15.04,
				"temp_max": 15.04,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 84,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 804,
					"main": "Clouds",
					"description": "couvert",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 85
			},
			"wind": {
				"speed": 0.6,
				"deg": 273,
				"gust": 0.78
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-14 03:00:00"
		},
		{
			"dt": 1713074400,
			"main": {
				"temp": 15.14,
				"feels_like": 14.93,
				"temp_min": 15.14,
				"temp_max": 15.14,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 85,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 804,
					"main": "Clouds",
					"description": "couvert",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 92
			},
			"wind": {
				"speed": 0.7,
				"deg": 307,
				"gust": 0.7
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-14 06:00:00"
		},
		{
			"dt": 1713085200,
			"main": {
				"temp": 20.12,
				"feels_like": 19.94,
				"temp_min": 20.12,
				"temp_max": 20.12,
				"pressure": 1025,
				"sea_level": 1025,
				"grnd_level": 993,
				"humidity": 67,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 67
			},
			"wind": {
				"speed": 1.96,
				"deg": 21,
				"gust": 2.3
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-14 09:00:00"
		},
		{
			"dt": 1713096000,
			"main": {
				"temp": 23.7,
				"feels_like": 23.69,
				"temp_min": 23.7,
				"temp_max": 23.7,
				"pressure": 1023,
				"sea_level": 1023,
				"grnd_level": 991,
				"humidity": 60,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 44
			},
			"wind": {
				"speed": 2.02,
				"deg": 31,
				"gust": 2.1
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-14 12:00:00"
		},
		{
			"dt": 1713106800,
			"main": {
				"temp": 24.64,
				"feels_like": 24.65,
				"temp_min": 24.64,
				"temp_max": 24.64,
				"pressure": 1020,
				"sea_level": 1020,
				"grnd_level": 988,
				"humidity": 57,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 35
			},
			"wind": {
				"speed": 2.14,
				"deg": 33,
				"gust": 2.06
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-14 15:00:00"
		},
		{
			"dt": 1713117600,
			"main": {
				"temp": 21.04,
				"feels_like": 21.08,
				"temp_min": 21.04,
				"temp_max": 21.04,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 72,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 29
			},
			"wind": {
				"speed": 1.51,
				"deg": 17,
				"gust": 2.25
			},
			"visibility": 698,
			"pop": 0.2,
			"rain": {
				"3h": 0.21
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-14 18:00:00"
		},
		{
			"dt": 1713128400,
			"main": {
				"temp": 16.94,
				"feels_like": 17.04,
				"temp_min": 16.94,
				"temp_max": 16.94,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 90,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10n"
				}
			],
			"clouds": {
				"all": 78
			},
			"wind": {
				"speed": 1.16,
				"deg": 314,
				"gust": 1.06
			},
			"visibility": 10000,
			"pop": 1,
			"rain": {
				"3h": 1.67
			},
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-14 21:00:00"
		},
		{
			"dt": 1713139200,
			"main": {
				"temp": 15.12,
				"feels_like": 15.19,
				"temp_min": 15.12,
				"temp_max": 15.12,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 96,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 501,
					"main": "Rain",
					"description": "pluie modérée",
					"icon": "10n"
				}
			],
			"clouds": {
				"all": 71
			},
			"wind": {
				"speed": 1.83,
				"deg": 318,
				"gust": 3.05
			},
			"visibility": 10000,
			"pop": 1,
			"rain": {
				"3h": 3.25
			},
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-15 00:00:00"
		},
		{
			"dt": 1713150000,
			"main": {
				"temp": 14.62,
				"feels_like": 14.64,
				"temp_min": 14.62,
				"temp_max": 14.62,
				"pressure": 1018,
				"sea_level": 1018,
				"grnd_level": 986,
				"humidity": 96,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10n"
				}
			],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 1.46,
				"deg": 300,
				"gust": 1.58
			},
			"visibility": 10000,
			"pop": 1,
			"rain": {
				"3h": 0.9
			},
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-15 03:00:00"
		},
		{
			"dt": 1713160800,
			"main": {
				"temp": 14.4,
				"feels_like": 14.38,
				"temp_min": 14.4,
				"temp_max": 14.4,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 95,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 2.53,
				"deg": 331,
				"gust": 5.89
			},
			"visibility": 10000,
			"pop": 1,
			"rain": {
				"3h": 0.62
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-15 06:00:00"
		},
		{
			"dt": 1713171600,
			"main": {
				"temp": 15.08,
				"feels_like": 14.5,
				"temp_min": 15.08,
				"temp_max": 15.08,
				"pressure": 1021,
				"sea_level": 1021,
				"grnd_level": 989,
				"humidity": 71,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 2.87,
				"deg": 330,
				"gust": 5.47
			},
			"visibility": 10000,
			"pop": 0.9,
			"rain": {
				"3h": 0.92
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-15 09:00:00"
		},
		{
			"dt": 1713182400,
			"main": {
				"temp": 16.66,
				"feels_like": 15.77,
				"temp_min": 16.66,
				"temp_max": 16.66,
				"pressure": 1020,
				"sea_level": 1020,
				"grnd_level": 988,
				"humidity": 53,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04d"
				}
			],
			"clouds": {
				"all": 76
			},
			"wind": {
				"speed": 4.15,
				"deg": 323,
				"gust": 5.39
			},
			"visibility": 10000,
			"pop": 0.7,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-15 12:00:00"
		},
		{
			"dt": 1713193200,
			"main": {
				"temp": 18.2,
				"feels_like": 17.17,
				"temp_min": 18.2,
				"temp_max": 18.2,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 42,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02d"
				}
			],
			"clouds": {
				"all": 23
			},
			"wind": {
				"speed": 4.18,
				"deg": 315,
				"gust": 5.99
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-15 15:00:00"
		},
		{
			"dt": 1713204000,
			"main": {
				"temp": 14.12,
				"feels_like": 13.08,
				"temp_min": 14.12,
				"temp_max": 14.12,
				"pressure": 1020,
				"sea_level": 1020,
				"grnd_level": 988,
				"humidity": 57,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 801,
					"main": "Clouds",
					"description": "peu nuageux",
					"icon": "02d"
				}
			],
			"clouds": {
				"all": 15
			},
			"wind": {
				"speed": 3.75,
				"deg": 339,
				"gust": 7.31
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-15 18:00:00"
		},
		{
			"dt": 1713214800,
			"main": {
				"temp": 11.61,
				"feels_like": 10.63,
				"temp_min": 11.61,
				"temp_max": 11.61,
				"pressure": 1022,
				"sea_level": 1022,
				"grnd_level": 989,
				"humidity": 69,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03n"
				}
			],
			"clouds": {
				"all": 49
			},
			"wind": {
				"speed": 2.09,
				"deg": 330,
				"gust": 7.14
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-15 21:00:00"
		},
		{
			"dt": 1713225600,
			"main": {
				"temp": 10.88,
				"feels_like": 9.9,
				"temp_min": 10.88,
				"temp_max": 10.88,
				"pressure": 1021,
				"sea_level": 1021,
				"grnd_level": 988,
				"humidity": 72,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 803,
					"main": "Clouds",
					"description": "nuageux",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 74
			},
			"wind": {
				"speed": 2.05,
				"deg": 319,
				"gust": 6.53
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-16 00:00:00"
		},
		{
			"dt": 1713236400,
			"main": {
				"temp": 11.13,
				"feels_like": 10.02,
				"temp_min": 11.13,
				"temp_max": 11.13,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 986,
				"humidity": 66,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 804,
					"main": "Clouds",
					"description": "couvert",
					"icon": "04n"
				}
			],
			"clouds": {
				"all": 99
			},
			"wind": {
				"speed": 1.89,
				"deg": 301,
				"gust": 7.05
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "n"
			},
			"dt_txt": "2024-04-16 03:00:00"
		},
		{
			"dt": 1713247200,
			"main": {
				"temp": 10.09,
				"feels_like": 9.24,
				"temp_min": 10.09,
				"temp_max": 10.09,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 987,
				"humidity": 80,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 4.33,
				"deg": 336,
				"gust": 7.26
			},
			"visibility": 10000,
			"pop": 0.2,
			"rain": {
				"3h": 0.19
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-16 06:00:00"
		},
		{
			"dt": 1713258000,
			"main": {
				"temp": 11.34,
				"feels_like": 9.99,
				"temp_min": 11.34,
				"temp_max": 11.34,
				"pressure": 1020,
				"sea_level": 1020,
				"grnd_level": 987,
				"humidity": 56,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 802,
					"main": "Clouds",
					"description": "partiellement nuageux",
					"icon": "03d"
				}
			],
			"clouds": {
				"all": 34
			},
			"wind": {
				"speed": 5.39,
				"deg": 332,
				"gust": 7.71
			},
			"visibility": 10000,
			"pop": 0,
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-16 09:00:00"
		},
		{
			"dt": 1713268800,
			"main": {
				"temp": 11.93,
				"feels_like": 10.54,
				"temp_min": 11.93,
				"temp_max": 11.93,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 986,
				"humidity": 52,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 61
			},
			"wind": {
				"speed": 5.11,
				"deg": 334,
				"gust": 7.3
			},
			"visibility": 10000,
			"pop": 0.2,
			"rain": {
				"3h": 0.15
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-16 12:00:00"
		},
		{
			"dt": 1713279600,
			"main": {
				"temp": 11.68,
				"feels_like": 10.34,
				"temp_min": 11.68,
				"temp_max": 11.68,
				"pressure": 1018,
				"sea_level": 1018,
				"grnd_level": 985,
				"humidity": 55,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 100
			},
			"wind": {
				"speed": 5.35,
				"deg": 344,
				"gust": 7.52
			},
			"visibility": 10000,
			"pop": 0.22,
			"rain": {
				"3h": 0.3
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-16 15:00:00"
		},
		{
			"dt": 1713290400,
			"main": {
				"temp": 8.26,
				"feels_like": 5.4,
				"temp_min": 8.26,
				"temp_max": 8.26,
				"pressure": 1019,
				"sea_level": 1019,
				"grnd_level": 986,
				"humidity": 79,
				"temp_kf": 0
			},
			"weather": [
				{
					"id": 500,
					"main": "Rain",
					"description": "légère pluie",
					"icon": "10d"
				}
			],
			"clouds": {
				"all": 90
			},
			"wind": {
				"speed": 5.03,
				"deg": 349,
				"gust": 8.77
			},
			"visibility": 10000,
			"pop": 1,
			"rain": {
				"3h": 0.63
			},
			"sys": {
				"pod": "d"
			},
			"dt_txt": "2024-04-16 18:00:00"
		}
	],
	"city": {
		"id": 2996944,
		"name": "MockCity",
		"coord": {
			"lat": 45.7485,
			"lon": 4.8467
		},
		"country": "FR",
		"population": 472317,
		"timezone": 7200,
		"sunrise": 1712811678,
		"sunset": 1712859684
	}
}
`;