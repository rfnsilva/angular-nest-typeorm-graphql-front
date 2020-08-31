import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

import { Apollo, gql } from 'apollo-angular-boost';

@Component({
  selector: 'app-admin-fornecedor',
  templateUrl: './admin-fornecedor.component.html',
  styleUrls: ['./admin-fornecedor.component.scss']
})
export class AdminFornecedorComponent implements OnInit {
  title = 'fornecedor';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    endereco: new FormControl(''),
    telefone: new FormControl(''),
  });

  @Input()
  public fornecedores: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.javascript();

    this.apollo.watchQuery({
      query: gql`
        query {
          getFornecedores {
            id,
            nome,
            cnpj,
            endereco,
            telefone,
            createdAt
          }
        }
      `,
    })
     .valueChanges
      .subscribe(({ data }) => {
        let aux: any = data;
        this.fornecedores = aux.getFornecedores;
     })
  }

  deletar(id: number) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteFornecedor(data: {
            id: ${id}
          }){
            id,
            nome,
            cnpj,
            endereco,
            telefone
          }
        }
      `,
    }).subscribe(({ data }) => {
      let aux: any = data;
      this.fornecedores = aux.deleteFornecedor;
     })
  }
  
  onSubmit() {
    
  }

  onSubmit1() {
    
  }

  javascript() {
    $(document).ready(function () {
      $("#navbar-cliente").css("display", "none");
      $("#navbar-admin").css("display", "block");
    });
  }

}
