import {PerfilModel} from "./perfil.model";

export interface UsuarioModel{
  id: number;
  nome: string;
  cpf: string;
  login: string;
  senha: string;
  perfis: PerfilModel[];
}
