export class Negocio {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  password: string;
  tipo_negocio: string;
  constructor() {
    this.id = 0;
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
    this.email = '';
    this.password = '';
    this.tipo_negocio = '';
  }
}
