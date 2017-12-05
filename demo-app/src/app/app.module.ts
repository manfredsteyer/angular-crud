import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FlightModule } from './flight/flight.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
 
@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot([{ 
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    }]),
    FlightModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }