import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './components/Contatos/Contatos.component';
import { DashboardComponent } from './components/Dashboard/Dashboard.component';
import { EventosComponent } from './components/Eventos/Eventos.component';
import { PalestrantesComponent } from './components/Palestrantes/Palestrantes.component';
import { PerfilComponent } from './components/Perfil/Perfil.component';

const routes: Routes = [
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  {path: 'Eventos', component: EventosComponent},
  {path: 'Palestrantes', component: PalestrantesComponent},
  {path: 'Perfil', component: PerfilComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Contatos', component: ContatosComponent},
  {path: '**', redirectTo: 'Dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
