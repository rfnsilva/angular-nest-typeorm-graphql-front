import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
