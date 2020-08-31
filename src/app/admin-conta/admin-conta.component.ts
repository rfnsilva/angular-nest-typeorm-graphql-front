import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

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
