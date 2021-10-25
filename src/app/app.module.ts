import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './components/layout/layout.component';
import {PersonneComponent} from './components/pages/personne/personne.component';
import {TicketComponent} from './components/pages/ticket/ticket.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/pages/home/home.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ListPersonneComponent} from './components/pages/personne/list-personne/list-personne.component';
import {ListTicketComponent} from './components/pages/ticket/list-ticket/list-ticket.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {EditPersonneComponent} from './components/pages/personne/edit-personne/edit-personne.component';
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from "../environments/environment";
import {ApplicationStore} from "./shared/state/reducers";
import { CollectionPersonneEffects } from './shared/state/effects/collection-personne.effects';
import { CollectionTicketEffects } from './shared/state/effects/collection-ticket.effects';
import { CollectionCategorieEffects } from './shared/state/effects/collection-categorie.effects';
import { CategorieComponent } from './components/pages/categorie/categorie.component';
import { ListCategorieComponent } from './components/pages/categorie/list-categorie/list-categorie.component';
import { EditCategorieComponent } from './components/pages/categorie/edit-categorie/edit-categorie.component';
import { EditTicketComponent } from './components/pages/ticket/edit-ticket/edit-ticket.component';
import reducer = ApplicationStore.reducer;
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SpinnerComponent} from "./components/spinner/spinner.component";

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
    EditPersonneComponent,
    CategorieComponent,
    ListCategorieComponent,
    EditCategorieComponent,
    EditTicketComponent,
    SpinnerComponent,
    SpinnerComponent,
  ],
  imports: [...modules, MatCheckboxModule, MatCardModule, MatGridListModule,
    StoreModule.forRoot({reducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([CollectionPersonneEffects]),
    EffectsModule.forFeature([CollectionTicketEffects, CollectionCategorieEffects]), MatProgressSpinnerModule,
  ],
  exports: [...modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
