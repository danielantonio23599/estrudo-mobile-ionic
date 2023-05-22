import {UsuarioModel} from "./usuario.model";

export interface PerfilModel {
  id: number;
  nome: string;
  usuarios: UsuarioModel[];
}
