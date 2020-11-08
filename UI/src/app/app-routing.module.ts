import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './movie/comment/comment.component';
import { MovieComponent } from './movie/movie.component';
import { AuthenticateGuard } from './site/authenticate.guard';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'sign-up',component:SignupComponent},
  {path:'sign-in',component:LoginComponent},
{path:'show',component:MovieComponent,canActivate:[AuthenticateGuard]},
{path:'comment/:id',component:CommentComponent,canActivate:[AuthenticateGuard]},
{path:'**',redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
