import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ApolloBoostModule, ApolloBoost, Subscription, split } from 'apollo-angular-boost';
import {WebSocketLink} from 'apollo-link-ws';
import { HttpLink } from 'apollo-angular-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';

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
  constructor(private apolloBoost: ApolloBoost, private httpLink: HttpLink) {

    const http = httpLink.create({
      uri: 'http://localhost:3000/graphql'
    })

    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:5000/',
      options: {
        reconnect: true
      }
    })

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      http,
    );

    export default new apolloBoost({
      link
    })
  }
}
