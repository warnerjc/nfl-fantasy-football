import { Component, OnInit } from '@angular/core';
import { NflApiService } from '../_services/nfl-api.service';
import { forkJoin, throwError } from 'rxjs';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  gameStats: any;
  allPlayerStats2018: any;
  ffCollusionCornerPointsMapping: any;

  constructor(private nflApiService: NflApiService) { }

  ngOnInit() {
    this.getGameStats();
    this.getData();
  }

  getData() {

    // this.allPlayerStats2018 = this.nflApiService.getAllPlayersPastSeasonWeeklyStats('2018', 1);
    this.allPlayerStats2018 = this.nflApiService.getAllPlayersPastSeasonStats('2018');
    this.ffCollusionCornerPointsMapping = this.nflApiService.getLeaguePointsMapping('collusion-corner');

    forkJoin([
      this.allPlayerStats2018,
      this.ffCollusionCornerPointsMapping
    ]).subscribe(
      ((res: any) => {
        this.allPlayerStats2018 = res[0];
        this.ffCollusionCornerPointsMapping = res[1];

        this.calculatePastFantasyScores();
      }),
      err => {
        return throwError(err);
      }
    )
  }

  getGameStats() {
    this.nflApiService.getGameStats().subscribe(
      ((res: any) => {
        this.gameStats = res;
        console.log(this.gameStats);
      }),
      err => {
        console.log(err);
      }  
    );
  }

  calculatePastFantasyScores() {
    for (let i = 0; i < this.allPlayerStats2018['players'].length; i++) {
      let tempTotalScore = 0;

      for (let j = 0; j < this.ffCollusionCornerPointsMapping['ffLeagePoints'].length; j++) {
        let tempScore = 0;
        let tempValue = 0;
        let tempMultiplier = 0;

        if (this.allPlayerStats2018['players'][i].stats[this.ffCollusionCornerPointsMapping['ffLeagePoints'][j].id]) {
          tempValue = parseInt(this.allPlayerStats2018['players'][i].stats[this.ffCollusionCornerPointsMapping['ffLeagePoints'][j].id]);
          tempMultiplier = this.ffCollusionCornerPointsMapping['ffLeagePoints'][j].points;
          tempScore += (tempValue * tempMultiplier);
          tempTotalScore += tempScore;

          this.allPlayerStats2018['players'][i].fantasyScore = tempTotalScore;
        }

      }

      console.log(`name: ${this.allPlayerStats2018['players'][i].name}, stats: ${this.allPlayerStats2018['players'][i].fantasyScore}`);
    }
  }

}

