import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanejamentoComponent } from './shared/planejamento/planejamento.component';
import { CadastroComponent } from './shared/form-cadastro-usuario/cadastro.component';
import { ContratanteComponent } from './pages/contratante/contratante.component';
import { NoivosComponent } from './pages/noivos/noivos.component';
import { authGuard } from './services/auth.guard';  // Importe o guard criado
import { ServicosComponent } from './shared/servicos/servicos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'planejamento', component: PlanejamentoComponent, canActivate: [authGuard]},
  { path: 'acesso', component: CadastroComponent },
  { path: 'contratante', component: ContratanteComponent, canActivate: [authGuard] },
  //{ path: 'noivos', component: NoivosComponent, canActivate: [authGuard] },
  { path: '**', component: HomeComponent },
];
