export class Cita {
  id: any;
  fecha_cita: string;
  estado: string;//disponible, reservada
  usuario_id: any;
  negocio_id: any;
  constructor() {
    this.id = '';
    this.fecha_cita = '';
    this.estado = "disponible";
    this.usuario_id = '';
    this.negocio_id = '';
  }
}
