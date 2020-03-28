import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/guard/auth-guard/auth.guard';

import { ConnexionComponent } from './components/connexion/connexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import {UsersComponent } from './components/users/users.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { DetailPersonnelComponent } from './components/detail-personnel/detail-personnel.component';
import { AdminsComponent } from './components/admins/admins.component';


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
    path: 'user',
    name: 'user',
    component: UsersComponent,
    canActivate: [AuthGuard] ,
  },
  {
    path: 'personnel',
    name: 'personnel',
    component: PersonnelComponent,
    canActivate: [AuthGuard] ,
  },
  {
    path: 'personnel/:id',
    name: 'detailPersonnel',
    component: DetailPersonnelComponent,
    canActivate: [AuthGuard] ,
  },
  {
    path: 'admin',
    name: 'admin',
    component: AdminsComponent,
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
