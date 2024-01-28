import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KindergartenComponent } from './kindergarten/kindergarten.component';
import { HomePageComponent } from './home-page/home-page.component';
import { KontaktPageComponent } from './kontakt-page/kontakt-page.component';

const routes: Routes = [
  { path: '', component:HomePageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'kindergarten', component:KindergartenComponent},
  { path: 'homepage', component:HomePageComponent},
  { path: 'kontaktpage', component:KontaktPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
