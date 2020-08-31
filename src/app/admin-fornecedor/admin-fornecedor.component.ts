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

  public preEdite: number;

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
     
    this.apollo.subscribe({
      query: gql`
        subscription{
          fornecedorAdded{
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

  editar(fornecedor: any) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          updateFornecedor(data: {
            id: ${this.preEdite},
            nome: "${fornecedor.nome}",
            cnpj: "${fornecedor.cnpj}",
            endereco: "${fornecedor.endereco}",
            telefone: "${fornecedor.telefone}"
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
      console.log(data)
      let aux: any = data;
      this.fornecedores = aux.updateFornecedor;
     })
    
  }

  adicionar(fornecedor: any) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          createFornecedor(data: {
            nome: "${fornecedor.nome}",
            cnpj: "${fornecedor.cnpj}",
            endereco: "${fornecedor.endereco}",
            telefone: "${fornecedor.telefone}"
          }){
            id,
            nome,
            cnpj,
            endereco,
            telefone
          }
        },
      `,
    }).subscribe(({ data }) => {
      let aux: any = data;
      this.fornecedores = aux.createFornecedor;
     })
  }
  
  onSubmit() {
    this.editar(this.profileForm.value)
  }

  onSubmit1() {
    this.adicionar(this.profileForm.value)
  }

  preEditar(id: number) {
    this.preEdite = id;
  }

  javascript() {
    $(document).ready(function () {
      $("#navbar-cliente").css("display", "none");
      $("#navbar-admin").css("display", "block");
    });
  }

}
