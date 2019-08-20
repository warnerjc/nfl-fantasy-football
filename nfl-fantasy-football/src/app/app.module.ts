import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Application specific imports */
import { MaterialModule } from './_imports/material-module';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DataSourceComponent } from './data-source/data-source.component';

@NgModule({
  declarations: [
    AppComponent,
    DataSourceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
