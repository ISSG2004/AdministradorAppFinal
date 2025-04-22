export class Cita {
  id: string;
  fecha_cita: string;
  estado: string;//disponible, reservada
  usuario_id: number;
  negocio_id: number;
  constructor() {
    this.id = '';
    this.fecha_cita = '';
    this.estado = "disponible";
    this.usuario_id = 0;
    this.negocio_id = 0;
  }
}
