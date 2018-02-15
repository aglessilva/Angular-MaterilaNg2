import { CustumerMessageService } from './../../alert-message/custumerMessage-service';
import { Component, OnInit } from '@angular/core';

import { AlertMessageComponent } from './../../alert-message/alert-message.component';


@Component({
  selector: 'app-dependentes',
  templateUrl: './dependentes.component.html',
  styleUrls: ['./dependentes.component.css'],
})
export class DependentesComponent implements OnInit  {
  modalJanela: any
  corpo: any
  constructor() {}

  ngOnInit() {

    this.corpo = 'ola mundo como vai todos vcs'
  }

  apertouSim(){
    alert('apertou o botao sim')

  }
  apertouNao()
  {
    alert('apertou o botão NAO!!');
  }

}
