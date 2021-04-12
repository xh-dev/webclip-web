import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostTextComponent} from './post-text/post-text.component';
import {GetTextComponent} from './get-text/get-text.component';


const routes: Routes = [
  { path: 'get', component: GetTextComponent},
  { path: 'post', component: PostTextComponent},
  { path: '',   redirectTo: '/get', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
