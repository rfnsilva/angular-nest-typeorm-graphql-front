import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { AdminFornecedorComponent } from './admin-fornecedor/admin-fornecedor.component';
import { AdminCategoriaComponent } from './admin-categoria/admin-categoria.component';
import { AdminContaComponent } from './admin-conta/admin-conta.component';
import { AdminVendaComponent } from './admin-venda/admin-venda.component'

const routes: Routes = [
  { path: '',   redirectTo: 'admin-home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-produto', component: AdminProdutoComponent },
  { path: 'admin-fornecedor', component: AdminFornecedorComponent },
  { path: 'admin-categoria', component: AdminCategoriaComponent },
  { path: 'admin-conta', component: AdminContaComponent },
  { path: 'admin-venda', component: AdminVendaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
