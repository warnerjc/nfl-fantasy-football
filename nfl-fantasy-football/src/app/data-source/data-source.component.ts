import { Component, OnInit } from '@angular/core';
import { NflApiService } from '../_services/nfl-api.service';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  gameStats: any;
  allPlayerStats2018: any;

  constructor(private nflApiService: NflApiService) { }

  ngOnInit() {
    this.getGameStats();
    this.getAllPlayersPastSeasonStats(2018);
  }

  getGameStats() {
    this.nflApiService.getGameStats().subscribe(
      ((res: any) => {
        this.gameStats = res;
      }),
      err => {
        console.log(err);
      }  
    );
    console.log(this.gameStats);
  }

  getAllPlayersPastSeasonStats(year: number) {
    this.nflApiService.getAllPlayersPastSeasonStats(year).subscribe(
      ((res: any) => {
        this.allPlayerStats2018 = res;
      }),
      err => {
        console.log(err.message);
      }
    );
    console.log(this.allPlayerStats2018);
  }

}
