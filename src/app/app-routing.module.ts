import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { PersonneComponent } from './components/pages/personne/personne.component';
import {HomeComponent} from "./components/pages/home/home.component";
import { TicketComponent } from './components/pages/ticket/ticket.component';
import {ListPersonneComponent} from "./components/pages/personne/list-personne/list-personne.component";
import {EditPersonneComponent} from "./components/pages/personne/edit-personne/edit-personne.component";

const appRouteList: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'personne',
    component: PersonneComponent,
    children: [
      {
        path:'liste-personne', component: ListPersonneComponent
      },
      {
        path:'edite-personne', component: EditPersonneComponent
      }
      ]
  },
  {
    path: 'ticket',
    component: TicketComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
];


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList)
  ]
})

export class AppRoutingModule { }
