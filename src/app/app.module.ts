import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ApolloBoostModule, Apollo } from 'apollo-angular-boost';
import {WebSocketLink} from 'apollo-link-ws';
import { HttpLink } from 'apollo-angular-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';

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
import { AdminVendaComponent } from './admin-venda/admin-venda.component'

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
    AdminVendaComponent,
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
  constructor(private apollo: Apollo, private httpLink: HttpLink) {

    const http = this.httpLink.create({
      uri: 'http://localhost:3000/graphql'
    })

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:3000/graphql',
      options: {
        reconnect: true
      }
    })

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition') && (definition.operation === 'subscription');
      },
      wsLink,
      http,
    );

    this.apollo.create({
      link,
      cache: new InMemoryCache()
    });

  }
}