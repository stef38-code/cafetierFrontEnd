import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { PersonneComponent } from './components/pages/personne/personne.component';
import { TicketComponent } from './components/pages/ticket/ticket.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/pages/home/home.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ListPersonneComponent } from './components/pages/personne/list-personne/list-personne.component';
import { ListTicketComponent } from './components/pages/ticket/list-ticket/list-ticket.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { EditPersonneComponent } from './components/pages/personne/edit-personne/edit-personne.component';
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  MatListModule,
  RouterModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  AppRoutingModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  ];
@NgModule({

  declarations: [
    AppComponent,
    LayoutComponent,
    PersonneComponent,
    TicketComponent,
    HomeComponent,
    ListPersonneComponent,
    ListTicketComponent,
    EditPersonneComponent

  ],
  imports: [...modules, MatCheckboxModule, MatCardModule, MatGridListModule],
  exports: [...modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
