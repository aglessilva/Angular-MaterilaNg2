import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  @Input('title') private _title: boolean;
  @Input('icon') private _icon: string;
  @Input('body') private _body: any;
 
  constructor() { }
  
  ngOnInit() {
  }
  
  hbt()
  {
     
      let box = document.getElementsByClassName('box')[0]
      
        if (box.classList.contains('box-hidden')) {
          // show
          box.classList.add('box-transition');
          box.clientWidth; // force layout to ensure the now display: block and opacity: 0 values are taken into account when the CSS transition starts.
          box.classList.remove('box-hidden');
        } else {
          // hide
          box.classList.add('box-transition');
          box.classList.add('box-hidden');
        }    
  }
}
