import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docs'
})
export class DocsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.formataCampo(value, args)
  }

  formataCampo(campo, Mascara) {
    let boleanoMascara;
    
    let exp = /\-|\.|\/|\(|\)| /g
    let campoSoNumeros = campo.toString().replace(exp, "");

    let posicaoCampo = 0;
    let NovoValorCampo = "";
    let TamanhoMascara = campoSoNumeros.length;;

    for (let i = 0; i <= TamanhoMascara; i++) {
      boleanoMascara = ((Mascara.charAt(i) === "-") || (Mascara.charAt(i) === ".") || (Mascara.charAt(i) === "/"))
      boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === "(")
        || (Mascara.charAt(i) === ")") || (Mascara.charAt(i) === " "))
      if (boleanoMascara) {
        NovoValorCampo += Mascara.charAt(i);
        TamanhoMascara++;
      } else {
        NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
        posicaoCampo++;
      }
    }
    return NovoValorCampo;
  }

}
