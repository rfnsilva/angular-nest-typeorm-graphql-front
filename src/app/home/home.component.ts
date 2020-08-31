import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.javascript();
  }

  javascript() {
    $(document).ready(function () {
      $("#navbar-admin").css("display", "none");
      $("#navbar-cliente").css("display", "block");
    });
  }

}
