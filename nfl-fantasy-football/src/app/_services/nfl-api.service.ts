import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NflApiService {

  constructor(private http: HttpClient) { }

  getGameStats() {
    const gameStatsURL = 'http://api.fantasy.nfl.com/v1/game/stats?format=json';

    const params =
      new HttpParams()
        .set('format', 'json');

    // return this.http.get(gameStatsURL, { headers: this.setHeaders() });
    return this.http.get(gameStatsURL);
  }

  getAllPlayersPastSeasonStats(year: number) {
    const allPlayersPastSeasonStatsURL = `http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=${year}&format=json`;
    return this.http.get(allPlayersPastSeasonStatsURL, { headers: this.setHeaders() });
  }

  setHeaders() {
    const header = 
      new HttpHeaders()
        .set('Content-Type', 'application/json');
        // .set('Access-Control-Allow-Origin', '*');

    return header;
  }

}
