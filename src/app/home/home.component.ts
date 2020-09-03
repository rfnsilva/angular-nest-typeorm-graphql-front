import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { Apollo } from 'apollo-angular-boost';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input()
  public produtos: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.javascript();

    //query que retorna todas as produto salvas no banco
    this.apollo.query({
      query: gql`
        query {
          getProdutos {
            id,
            nome,
            descricao,
            valor,
            categoriaId,
            fornecedorId,
            createdAt
          }
        }
      `,
    })
      .subscribe(({ data }) => {
        let aux: any = data;
        this.produtos = aux.getProdutos;
      })
  }

  javascript() {
    $(document).ready(function () {
      $("#navbar-admin").css("display", "none");
      $("#navbar-cliente").css("display", "block");
    });
  }

}
