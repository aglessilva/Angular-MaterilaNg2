import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent  {

  private modalWindows: HTMLElement
  @Input('yesOrNo') private yesOrNo: boolean;
  @Input('params') private params: any;
  @Input('message') private message: IMenssage;
  @Output('onYes') onYes =  new EventEmitter<any>()
  @Output('onNo') onNo =  new EventEmitter<any>()

  
  constructor() {}
  
  ngOnInit() {

    this.message = {
      title: "titulo da mensagem",
      textBody: "In the examples above, we use a button to close the modal. However, with a little bit of JavaScript, you can also close the modal when clicking outside of the modal box:"
    }  as IMenssage
    // chamada com JQuery
    $(document).ready(function(){
      this.modalJanela = $('.modal').modal();
    });
  }

  actYes(){ this.onYes.emit(this.params); /*this.closeModal()*/; this.closeModalMaterialize() }
  actNo(){ this.onNo.emit(this.params);  /*this.closeModal();*/; this.closeModalMaterialize() }
  

  openModal()
  {
    document.getElementById('id01').style.display='block'
  }
  closeModal()
  {
    document.getElementById('id01').style.display='none'
  }

  closeModalMaterialize()
  {
    $('#modal1').modal('close');
  }

  
}
interface IMenssage {
  title: string   
  textBody: any,
}
