import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlanejamentoComponent } from './pages/planejamento/planejamento.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
    {'path':'',component:HomeComponent},
    {'path':'planejamento',component:PlanejamentoComponent},
    {'path':'cadastro',component:CadastroComponent},
    {'path':'**',component:HomeComponent}
];
