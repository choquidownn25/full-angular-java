export class Producto {
  id!: number;
  nombre!: string;
  descripcion!: string;
  precio!: number;
  cantidad!: number;
  imagen!: number;
  
  constructor(data: any) {
    this.id = data.id;
    this.cantidad = data.cantidad;
    this.descripcion = data.descripcion;
    this.imagen = data.imagen;
    this.nombre = data.nombre;
    // Add other properties if needed
  }
}
