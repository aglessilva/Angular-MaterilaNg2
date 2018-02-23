 let msgRequired: string = 'Este campo é obrigatório.'
 let msgEmailPattern: string = 'E-Mail inválido.'
 let msgCepPattern: string = 'Código postal inválido'

 export const ValidatorErrorMessage = {

            responsavel: {
            required: msgRequired,
            },
            
            documento: {
              minlength:'informe todos digitos.',
              required: msgRequired
            },
            
            email: {
              required: msgRequired,
              pattern: msgEmailPattern
            },

            dataNascimento: {
              required: msgRequired
            },
            nome: {
              minlength: 'Este campo deve ter pelo menos 3 caracteres.',
              maxlength: 'Este campo não deve ter mais que 20 caracteres.',
              required:  msgRequired
            },
            
            logradouro: {
              required: msgRequired
            },
            cep: {
              pattern : msgEmailPattern
            },
            uf: {
              required: msgRequired
            },
}