import { Directive, HostListener, Input,ElementRef } from '@angular/core';
import { ControlValueAccessor,  } from '@angular/forms';
import { MzToastService } from 'ng2-materialize';
import { empty } from 'rxjs/Observer';


@Directive({ 
    selector: '[formatDoc]',
 })
export class FormatDocsDirective implements ControlValueAccessor {

    constructor(
       private elementRef: ElementRef,
       private toastService: MzToastService,
    ) { }

    onChange: any;
    onTouched: any;

    @Input('formatDoc') formatDoc:  string

    writeValue(obj: any): void {
        
        if (obj) {
            let valor = obj.replace(/\D/g, '');
            this.elementRef.nativeElement.value = this.formataDoc(String(valor));
        }
}
    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
       this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        
    }
    
    @HostListener('keyup',['$event'])
    onKeyup($event: any) 
    {
        let valor = $event.target.value.replace(/\D/g, '');
        let exp = /\-|\.|\/|\(|\)| /g
        let pad = this.formatDoc.replace(exp, '').replace(/9/g, '_');
        let valorMask = valor + pad.substring(0, pad.length - valor.length);
     
        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
          this.onChange = valor
          return;
        }
     
        if (valor.length <= pad.length) {
            this.onChange = valor
            
        }
     
        let valorMaskPos = 0;
        valor = '';
        for (let i = 0; i < this.formatDoc.length; i++) {
          
          if (isNaN(parseInt(this.formatDoc.charAt(i)))) {
            valor += this.formatDoc.charAt(i);
          } else {
            valor += valorMask[valorMaskPos++];
          }
        }
        
        if (valor.indexOf('_') > -1) {
          valor = valor.substr(0, valor.indexOf('_'));
        }
        
        $event.target.value = valor;
      }

    

    @HostListener('blur', ['$event'])
    onblur($event: any)
    {
        if( $event.target.value.length > 0)
        {
            if($event.target.value.length !== this.formatDoc.length)
            {
                $event.target.value = null;
                return
            }

            if(this.formatDoc.length === 14) //Cpf 
            {
                if(!this.ValidarCPF($event.target.value))
                    this.toastService.show("CPF Inválido!", 3000,'black z-depth-5'); 
            }

            if(this.formatDoc.length === 17) //Cnpj
            {
                if(!this.ValidarCNPJ($event.target.value))
                    this.toastService.show("CPF Inválido!", 3000,'black z-depth-5'); 
            } 
           
            if(this.formatDoc.length === 10) //Data
            {
                if(this.dateIsInvalid($event.target.value))
                    this.toastService.show("Data invalida!", 3000,'black z-depth-5'); 
            } 
        }
    }


    formataDoc(valor: string): string
    {
        let valorMaskPos = 0;
        let pad =  ''
        let w: number = 0
        do
        {
            pad += '_'
            w++;
        }
        while(w <= valor.length )

        let valorMask = valor + pad.substring(0, pad.length - valor.length);
        valor = '';
        for (let i = 0; i < this.formatDoc.length; i++) {
          
            if (isNaN(parseInt(this.formatDoc.charAt(i)))) {
                valor += this.formatDoc.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
          }
          
          if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
          }

          return valor;
    }

    ValidarCPF(Objcpf: any): boolean 
    {
        let cpf = Objcpf;
        let exp = /\.|\-/g
        cpf = cpf.replace( exp, "" ); 
        let  digitoDigitado = parseInt(cpf.charAt(9)+cpf.charAt(10));
        let  soma1=0, soma2=0;
        let  vlr =11;

        for(let i = 0; i < 9; i++){
                soma1 += (cpf.charAt(i)*(vlr-1));
                soma2 += (cpf.charAt(i)*vlr);
                vlr--;
        }       
        soma1 = (((soma1*10)%11) === 10 ? 0:((soma1*10)%11)) as number;
        soma2 =(((soma2+(2*soma1))*10)%11) as number;

        let digitoGerado=(soma1*10)+soma2;

        return (digitoGerado === digitoDigitado)                 
    }

    ValidarCNPJ(ObjCnpj): boolean
    {
        let cnpj = ObjCnpj;
        let valida = new Array(6,5,4,3,2,9,8,7,6,5,4,3,2);
        let dig1: number = 0;
        let dig2: number = 0;

        let exp = /\.|\-|\//g
        cnpj = cnpj.replace( exp, "" ); 
        let digito: number = parseInt(cnpj.charAt(12)+cnpj.charAt(13));

        for(let i = 0; i < valida.length; i++){
                dig1 += (i > 0 ? (parseInt(cnpj.charAt(i-1)) * valida[i]) : 0)   
                dig2 += parseInt(cnpj.charAt(i)) * valida[i];       
        }
        dig1 = (((dig1 % 11)<2)? 0:(11-(dig1 % 11)));
        dig2 = (((dig2%11)<2)? 0:(11-(dig2%11)));

        return ((dig1*10)+dig2) === digito
    }

    dateIsInvalid(objData): boolean
    {
        let isDataValide = false;
        if((+objData.split('/')[0] < 1 ) || (+objData.split('/')[0] > 31 )) 
            isDataValide =  true;
        
        if((+objData.split('/')[1] < 1 ) || (+objData.split('/')[1] > 12 )) 
            isDataValide =  true;
        
        if((+objData.split('/')[2] < 1900 ) || (+objData.split('/')[2] > (new Date()).getFullYear())) 
            isDataValide =  true;

        return isDataValide
    }
   
}