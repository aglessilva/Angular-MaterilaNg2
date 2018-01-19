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


    this.corpo = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
  }

  apertouSim(){
    console.log('Sim')

  }
  apertouNao()
  {
    console.log('apertou o botão NAO!!');
  }

}
