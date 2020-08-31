import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';


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

  constructor() { }

  ngOnInit(): void {
    this.javascript();
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
