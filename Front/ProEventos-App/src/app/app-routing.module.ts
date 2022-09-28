import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './components/Contatos/Contatos.component';
import { DashboardComponent } from './components/Dashboard/Dashboard.component';
import { EventoDetalheComponent } from './components/Eventos/Evento-Detalhe/Evento-Detalhe.component';
import { EventoListaComponent } from './components/Eventos/Evento-Lista/Evento-Lista.component';
import { EventosComponent } from './components/Eventos/Eventos.component';
import { PalestrantesComponent } from './components/Palestrantes/Palestrantes.component';
import { PerfilComponent } from './components/User/Perfil/Perfil.component';
import { LoginComponent } from './components/User/Login/Login.component';
import { RegistroComponent } from './components/User/Registro/Registro.component';
import { UserComponent } from './components/User/User.component';

const routes: Routes = [
  {path: 'Eventos', redirectTo: 'Eventos/Lista'},
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  {
    path: 'Eventos', component: EventosComponent,
    children: [
      {path: 'Detalhe/:id', component: EventoDetalheComponent},
      {path: 'Detalhe', component: EventoDetalheComponent},
      {path: 'Lista', component: EventoListaComponent}
    ]
  },
  {
    path: 'User', component: UserComponent,
    children: [
      {path: 'Login', component: LoginComponent},
      {path: 'Registro', component: RegistroComponent}
    ]
  },
  {path: 'Palestrantes', component: PalestrantesComponent},
  {path: 'User/Perfil', component: PerfilComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Contatos', component: ContatosComponent},
  {path: '**', redirectTo: 'Dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
