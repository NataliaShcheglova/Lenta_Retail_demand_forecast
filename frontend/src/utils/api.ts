import { categoriesData } from './categories';
import { forecastData } from './forecast_archive';
import { salesData } from './sales';
import { storesData } from './stores';
import { BASE_URL, HEADERS} from './constants';
import {HttpHeaders} from './types';

class Api {
    private _url: string;
    private _headers: HttpHeaders;

    constructor(BASE_URL: string, HEADERS: HttpHeaders) {
        this._url = BASE_URL;
        this._headers = HEADERS;
    }

    //имитация базы данных по продажам
    public getSalesData() {
        return salesData;
    }

    //имитация прогнозов
    public forecastData() {
        return forecastData;
    }

    //имитация базы данных с магазинами
    public storesData() {
        return storesData;
    }

    // имитация базы данных с категориями товаров
    public categoriesData() {
        return categoriesData;
    }
}

const api = new Api(BASE_URL, HEADERS);

export default api;
