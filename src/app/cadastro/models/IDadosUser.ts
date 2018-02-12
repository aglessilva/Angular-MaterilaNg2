
interface IUsuario {

    idUsuario: number;
    nome: string;
    documento: string;
    dataNascimento: string;
    sexo: any;
    email: string;
    login: string;
    senha: string;
    isAuthentication: boolean
}

interface IEndereco {
    id: number;
    idUsuario: number;
    bairro: string;
    logradouro: string;
    cep: string;
    localidade: string;
    complemento: string;
    seachCep: string;
  }

interface IContratoUsuario {
      usuario: IUsuario;
      enderecos: Array<IEndereco>;
      endereco: IEndereco;
  }

