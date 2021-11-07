import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PersonneComponent} from './components/pages/personne/personne.component';
import {HomeComponent} from "./components/pages/home/home.component";
import {TicketComponent} from './components/pages/ticket/ticket.component';
import {ListPersonneComponent} from "./components/pages/personne/list-personne/list-personne.component";
import {EditPersonneComponent} from "./components/pages/personne/edit-personne/edit-personne.component";
import {ListTicketComponent} from "./components/pages/ticket/list-ticket/list-ticket.component";
import {EditTicketComponent} from "./components/pages/ticket/edit-ticket/edit-ticket.component";
import {ListCategorieComponent} from "./components/pages/categorie/list-categorie/list-categorie.component";
import {CategorieComponent} from "./components/pages/categorie/categorie.component";

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
        path: 'liste-personne', component: ListPersonneComponent
      },
      {
        path: 'edite-personne', component: EditPersonneComponent
      }
    ]
  },
  {
    path: 'ticket',
    component: TicketComponent,
    children: [
      {
        path: 'liste-ticket', component: ListTicketComponent
      },
      {
        path: 'edite-ticket', component: EditTicketComponent
      }
    ]
  },
  {
    path: 'categorie',
    component: CategorieComponent,
    children: [
      {
        path: 'liste-categorie', component: ListCategorieComponent
      },
      /*{
        path:'edite-categorie', component: EditCategorieComponent
      }*/
    ]
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

export class AppRoutingModule {
}
