import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

import { Apollo } from 'apollo-angular-boost';
import gql from 'graphql-tag';

@Component({
  selector: 'app-admin-conta',
  templateUrl: './admin-conta.component.html',
  styleUrls: ['./admin-conta.component.scss']
})
export class AdminContaComponent implements OnInit {
  title = 'conta';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    fornecedorId: new FormControl(''),
    valor: new FormControl(''),
  });

  @Input()
  public contas: any;

  public preEdite: number;

  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    //lembrar a de alterar os retornos dos metodos mutation para retornar
    //apenas o criado ou deletado e depois realizar um push no this.contas
    this.javascript();

    this.apollo.query({
      query: gql`
        query {
          getContas {
            valor,
            fornecedorId
          }
        }
      `,
    })
      .subscribe(({ data }) => {
        let aux: any = data;
        this.contas = aux.getContas;
      })
    
     
    //subscription que esculta mudanças(del) na tabela de contas
    this.apollo.subscribe({
      query: gql`
        subscription{
          contaAdded{
            valor,
            fornecedorId
          }
        }
      `,
    }).subscribe(data => {
      let aux: any = data;
      this.contas.push(aux.data.contaAdded);
    })

    //subscription que esculta mudanças(del) na tabela de contas
    this.apollo.subscribe({
      query: gql`
        subscription{
          contasDeleteAdded{
            valor,
            fornecedorId
          }
        }
      `,
    }).subscribe(data => {
      const aux: any = data;
      this.contas = aux.data.contasDeleteAdded;
    })
  }
  
  
  deletar(id: number) {
    console.log(id)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteConta(data: {
            id: ${id}
          }){
            id,
            nome,
            fornecedorId
          }
        }
      `,
    }).subscribe(({ data }) => {
      let aux: any = data;
      this.contas = aux.deleteConta;
     })
  }

  editar(conta: any) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          updateConta(data: {
            id: ${this.preEdite},
            valor: ${conta.valor},
            fornecedorId: ${conta.fornecedorId},
          }){
            id,
            nome,
            fornecedorId
          }
        }
      `,
    }).subscribe(({ data }) => {
      console.log(data)
      let aux: any = data;
      this.contas = aux.updateConta;
     })
    
  }

  adicionar(conta: any) {
    console.log(conta)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          createConta(data: {
            valor: ${conta.valor},
            fornecedorId: ${conta.fornecedorId},
          }){
            id,
            nome,
            fornecedorId,
          }
        },
      `,
    }).subscribe(({ data }) => {
      console.log(data)
      let aux: any = data;
      this.contas = aux.createConta;
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
