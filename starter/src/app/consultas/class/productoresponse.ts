import { Message } from "./message";
import { Producto } from "./producto";

export class ProductoResponse {
  listProducto!: Producto[];
  message!: Message;
}