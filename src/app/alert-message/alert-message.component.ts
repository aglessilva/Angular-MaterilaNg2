import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MsgBoxService } from '../loader.service';


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
  private descriptions: Subscription
  
  constructor(private msgBoxService: MsgBoxService) {}
  
  ngOnInit() {

    $(document).ready(function(){
       $('.modal').modal(
        {
          dismissible: false, 
          opacity: .5, 
          inDuration: 300, 
          outDuration: 200,
          startingTop: '4%',
          endingTop: '10%', 
          
        }
       );
    });

    this.msgBoxService.statusMessage.subscribe((fn:boolean)=>{
        if(fn)
            this.modalOpen()
      })
    }

  actYes():boolean { this.onYes.emit(this.params); return true; }
  actNo(): boolean { this.onNo.emit(this.params);  return false; }


  modalOpen()
  {
    $('#modal1').modal('open');
  }
  
}
interface IMenssage {
  title: string   
  textBody: any,
}




