import { MemesComponent } from './memes/memes.component';
import { AuthGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoticiasComponent } from './noticias/noticias.component';

export const appRoutes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component: LoginComponent},
{path: 'noticias', component: NoticiasComponent, canActivate:[AuthGuard]},
{path: 'memes', component: MemesComponent, canActivate:[AuthGuard]}
] 