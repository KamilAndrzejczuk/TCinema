import { CheckReservationsComponent } from './components/check-reservations/check-reservations.component';
import { SuccessComponent } from './components/success/success.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { HomeComponent } from './components/home/home.component';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeanceSeatsInfoComponent } from './components/seance-seats-info/seance-seats-info.component';
import { ReservationPersonInfoComponent } from './components/reservation-person-info/reservation-person-info.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'reservations', component: CheckReservationsComponent },
  { path: '**', component: HomeComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    SuccessComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SeanceSeatsInfoComponent,
    ReservationPersonInfoComponent,
    CheckReservationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
