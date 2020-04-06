import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard/auth-guard/auth.guard';
import { AdminGuard } from './services/guard/admin-guard/admin.guard';

import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  {
    path: '',
    name: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'connexion',
    name: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'accueil',
    name: 'accueil',
    component: AccueilComponent,
    canActivate: [AuthGuard] ,
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard] ,
  },
  {
    path: 'personnel',
    name: 'personnel',
    component: PersonnelComponent,
    canActivate: [AuthGuard] ,
  },
  {
    path: 'personnel/:id',
    name: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard] ,
  },
] as Array<{
    name?: string;
    path: string;
    component: any
}>;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
