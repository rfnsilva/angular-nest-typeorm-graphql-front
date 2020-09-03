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
  @Input()
  public comparar_boolean: boolean = false;
  @Input()
  public verifica_qtd_comparar_boolean: boolean = true;

  public qtd_comparar: number = 0;

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
            checked,
            estoque,
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

  checkbox(id: number) {
    for (let i = 0; i < this.produtos.length; i++){
      if (this.produtos[i].id === id) {
        this.produtos[i].checked = !(this.produtos[i].checked);
        if (this.produtos[i].checked === true) {
          this.qtd_comparar++;
          console.log(this.qtd_comparar)
          if (this.qtd_comparar === 3) {
            this.verifica_qtd_comparar_boolean = !(this.verifica_qtd_comparar_boolean);
          }
        } else {
          console.log(this.qtd_comparar)
          this.qtd_comparar--;
        }
      }
    }
    this.comparar_boolean = true;
  }

  javascript() {
    $(document).ready(function () {
      $("#navbar-admin").css("display", "none");
      $("#navbar-cliente").css("display", "block");
    });
  }

}
