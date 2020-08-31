import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

import { Apollo, gql } from 'apollo-angular-boost';


const CREATE_FORNECEDOR = gql`
  mutation createFornecedor($data: {
    nome: "fornecedor 1",
    cnpj: "123456678",
    endereco: "aasda",
    telefone: "998474"
  }) {
      id,
      nome,
      cnpj,
      endereco,
      telefone
    }
  }
`;

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

  public response: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.javascript();
    console.log(CREATE_FORNECEDOR)

    this.response = this.apollo.mutate({
      mutation: CREATE_FORNECEDOR
    }).subscribe();
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
