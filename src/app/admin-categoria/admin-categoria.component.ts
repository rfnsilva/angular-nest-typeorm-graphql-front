import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular-boost';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.scss']
})
export class AdminCategoriaComponent implements OnInit {
  title = 'categoria';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    fornecedorId: new FormControl(''),
  });

  @Input()
  public categorias: any;

  public preEdite: number;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    //lembrar a de alterar os retornos dos metodos mutation para retornar
    //apenas o criado ou deletado e depois realizar um push no this.fornecedores
    this.javascript();

    //query que retorna todas as categoria salvas no banco
    this.apollo.query({
      query: gql`
        query {
          getCategorias {
            id,
            nome,
            fornecedorId,
            createdAt
          }
        }
      `,
    })
      .subscribe(({ data }) => {
        let aux: any = data;
        this.categorias = aux.getCategorias;
      })
    
    //subscription que esculta mudanças(add) na tabela de categorias
    this.apollo.subscribe({
      query: gql`
        subscription{
          categoriaAdded{
            id,
            nome,
            fornecedorId,
            createdAt
          }
        }
      `,
    }).subscribe(data => {
      let aux: any = data;
      this.categorias.push(aux.data.categoriaAdded);
    })

    //subscription que esculta mudanças(del) na tabela de categorias
    this.apollo.subscribe({
      query: gql`
        subscription{
          categoriaDeleteAdded{
            id,
            nome,
            fornecedorId
          }
        }
      `,
    }).subscribe(data => {
      const aux: any = data;
      console.log(aux)
      this.categorias = aux.data.categoriaDeleteAdded;
    })

  }
    

  deletar(id: number) {
    console.log(id)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteCategoria(data: {
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
      this.categorias = aux.deleteCategoria;
     })
  }

  editar(categoria: any) {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          updateCategoria(data: {
            id: ${this.preEdite},
            nome: "${categoria.nome}",
            fornecedorId: ${categoria.fornecedorId},
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
      this.categorias = aux.updateCategoria;
     })
    
  }

  adicionar(categoria: any) {
    console.log(categoria)
    this.apollo.mutate({
      mutation: gql`
        mutation {
          createCategoria(data: {
            nome: "${categoria.nome}",
            fornecedorId: ${categoria.fornecedorId},
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
      this.categorias = aux.createCategoria;
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
