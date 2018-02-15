import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent  {


  @Input('yesOrNo') private yesOrNo: boolean;
  @Input('params') private params: any;
  @Input('message') private message: IMenssage;
  @Output('onYes') onYes =  new EventEmitter<any>()
  @Output('onNo') onNo =  new EventEmitter<any>()

  
  constructor() {}
  
  ngOnInit() {

    $(document).ready(function(){
       $('.modal').modal();
    });
  }

  actYes(){ this.onYes.emit(this.params); }
  actNo(){ this.onNo.emit(this.params);  }

  modalOpen()
  {
    $('#modal1').modal('open');
  }
  
}
interface IMenssage {
  title: string   
  textBody: any,
}




