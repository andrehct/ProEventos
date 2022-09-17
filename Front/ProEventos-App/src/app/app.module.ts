import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalestrantesComponent } from './Palestrantes/Palestrantes.component';
import { EventosComponent } from './Eventos/Eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './Nav/Nav.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
      PalestrantesComponent,
      EventosComponent,
      NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
