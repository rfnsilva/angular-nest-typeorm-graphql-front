import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

import { Apollo } from 'apollo-angular-boost';
import gql from 'graphql-tag';

@Component({
  selector: 'app-admin-produto',
  templateUrl: './admin-produto.component.html',
  styleUrls: ['./admin-produto.component.scss']
})
export class AdminProdutoComponent implements OnInit {
  title = 'produto';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
    valor: new FormControl(''),
    fornecedorId: new FormControl(''),
    categoriaId: new FormControl(''),
  });

  @Input()
  public produtos: any;

  public preEdite: number;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    //lembrar a de alterar os retornos dos metodos mutation para retornar
    //apenas o criado ou deletado e depois realizar um push no this.fornecedores
    this.javascript();

    //query que retorna todas as produto salvas no banco
    this.apollo.query({
      query: gql`
        query {
          getProdutos {
            id,
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
        this.produtos = aux.getCategorias;
      })
    
    //subscription que esculta mudanças(add) na tabela de produtos
    this.apollo.subscribe({
      query: gql`
        subscription{
          produtoAdded{
            id,
            descricao,
            valor,
            categoriaId,
            fornecedorId,
            createdAt
          }
        }
      `,
    }).subscribe(data => {
      let aux: any = data;
      this.produtos.push(aux.data.produtoAdded);
    })

    //subscription que esculta mudanças(del) na tabela de produtos
    this.apollo.subscribe({
      query: gql`
        subscription{
          produtoDeleteAdded{
            descricao,
            valor,
            categoriaId,
            fornecedorId,
          }
        }
      `,
    }).subscribe(data => {
      const aux: any = data;
      this.produtos = aux.data.produtoDeleteAdded;
    })

  }

  deletar(id: number) {
    console.log(id)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteProduto(data: {
            id: ${id}
          }){
            id,
            descricao,
            valor,
            categoriaId,
            fornecedorId,
          }
        }
      `,
    }).subscribe(({ data }) => {
      let aux: any = data;
      this.produtos = aux.deleteProduto;
     })
  }

  editar(produto: any) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          updateProduto(data: {
            id: ${this.preEdite},
            nome: "${produto.nome}",
            descricao: "${produto.descricao}",
            valor: ${produto.valor},
            categoriaId: ${produto.categoriaId},
            fornecedorId: ${produto.fornecedorId},
          }){
            id,
            descricao,
            valor,
            categoriaId,
            fornecedorId,
          }
        }
      `,
    }).subscribe(({ data }) => {
      console.log(data)
      let aux: any = data;
      this.produtos = aux.updateProduto;
     })
    
  }

  adicionar(produto: any) {
    console.log(produto)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          createProduto(data: {
            nome: "${produto.nome}",
            descricao: "${produto.descricao}",
            valor: ${produto.valor},
            categoriaId: ${produto.categoriaId},
            fornecedorId: ${produto.fornecedorId},
          }){
            id,
            descricao,
            valor,
            categoriaId,
            fornecedorId,
          }
        },
      `,
    }).subscribe(({ data }) => {
      console.log(data)
      let aux: any = data;
      this.produtos = aux.createProduto;
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
