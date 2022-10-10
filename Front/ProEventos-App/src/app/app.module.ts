import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalestrantesComponent } from './components/Palestrantes/Palestrantes.component';
import { EventosComponent } from './components/Eventos/Eventos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/Nav/Nav.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxCurrencyModule } from 'ngx-currency';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from './services/evento.service';
import { LoteService } from './services/lote.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ContatosComponent } from './components/Contatos/Contatos.component';
import { PerfilComponent } from './components/User/Perfil/Perfil.component';
import { DashboardComponent } from './components/Dashboard/Dashboard.component';
import { TituloComponent } from './shared/Titulo/Titulo.component';
import { EventoDetalheComponent } from './components/Eventos/Evento-Detalhe/Evento-Detalhe.component';
import { EventoListaComponent } from './components/Eventos/Evento-Lista/Evento-Lista.component';
import { UserComponent } from './components/User/User.component';
import { LoginComponent } from './components/User/Login/Login.component';
import { RegistroComponent } from './components/User/Registro/Registro.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { defineLocale } from 'ngx-bootstrap/chronos'
import { ptBrLocale } from 'ngx-bootstrap/locale'

defineLocale('pt-br', ptBrLocale)

@NgModule({
  declarations: [
    AppComponent,
    PalestrantesComponent,
    EventosComponent,
    ContatosComponent,
    PerfilComponent,
    DashboardComponent,
    TituloComponent,
    NavComponent,
    DateTimeFormatPipe,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistroComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule
  ],
  providers: [
    EventoService,
    LoteService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
