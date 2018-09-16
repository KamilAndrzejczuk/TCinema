import { MoviesService } from "./services/movies.service";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { ValidatorService } from "./services/validator.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserReservationHistoryComponent } from "./user-reservation-history/user-reservation-history.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    UserReservationHistoryComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    NgxPaginationModule,
  ],
  providers: [ValidatorService, AuthService, AuthGuard, MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
