import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {ApolloBoostModule, ApolloBoost} from 'apollo-angular-boost';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProdutoComponent } from './admin-produto/admin-produto.component';
import { AdminFornecedorComponent } from './admin-fornecedor/admin-fornecedor.component';
import { AdminCategoriaComponent } from './admin-categoria/admin-categoria.component';
import { AdminContaComponent } from './admin-conta/admin-conta.component';

import uri from './config/graphql.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    AdminProdutoComponent,
    AdminFornecedorComponent,
    AdminCategoriaComponent,
    AdminContaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ApolloBoostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apolloBoost: ApolloBoost) {
    this.apolloBoost.create({
      uri,
    });
  }
}
