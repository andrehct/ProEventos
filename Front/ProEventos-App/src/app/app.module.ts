import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

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
import { AccountService } from './services/account.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './components/Home/Home.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PerfilDetalheComponent } from './components/User/Perfil/Perfil-Detalhe/Perfil-Detalhe.component';
import { PalestranteListaComponent } from './components/Palestrantes/Palestrante-Lista/Palestrante-Lista.component';
import { PalestranteDetalheComponent } from './components/Palestrantes/Palestrante-Detalhe/Palestrante-Detalhe.component';
import { RedesSociaisComponent } from './components/RedesSociais/RedesSociais.component';

defineLocale('pt-br', ptBrLocale)

@NgModule({
  declarations: [
    AppComponent,
    PalestrantesComponent,
    PalestranteListaComponent,
    PalestranteDetalheComponent,
    RedesSociaisComponent,
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
    RegistroComponent,
    HomeComponent,
    PerfilDetalheComponent
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
    NgxCurrencyModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [
    EventoService,
    LoteService,
    AccountService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
