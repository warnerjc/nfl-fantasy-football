import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NflApiService {

  constructor(private http: HttpClient) { }

  getGameStats() {
    const gameStatsURL = 'http://localhost:4200/assets/nfl-api-json/game-stats.json';

    return this.http.get(gameStatsURL);
  }

  getAllPlayersPastSeasonStats(year: string) {
    const allPlayersPastSeasonStatsURL = `http://localhost:4200/assets/nfl-api-json/${year}/${year}-ps-season.json`;

    return this.http.get(allPlayersPastSeasonStatsURL);
  }

  getAllPlayersPastSeasonWeeklyStats(year: string, week: number) {
    const allPlayersPastSeasonStatsURL = `http://localhost:4200/assets/nfl-api-json/${year}/${year}-ps-week-${week}.json`;

    return this.http.get(allPlayersPastSeasonStatsURL);
  }

  getLeaguePointsMapping(league: string) {
    const leaguePointsMappingURL = `http://localhost:4200/assets/nfl-api-json/${league}-settings.json`;

    return this.http.get(leaguePointsMappingURL);
  }
}
