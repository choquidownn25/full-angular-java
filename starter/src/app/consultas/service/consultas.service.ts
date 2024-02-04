import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Producto } from '../class/producto';
import { ProductoResponse } from '../class/productoresponse';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  baseUrlProductos = environment.API_URL_TODOS_PRODUCTO_JAVA;
  baseUrl=environment.API_URL_TODOS_PRODUCTO_BYID_JAVA;
  constructor(private httpClient: HttpClient) {}
  get(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.baseUrlProductos);
  }
  getProducto(): Observable<Producto[]> {
    return this.httpClient.get(this.baseUrlProductos).pipe(
      map(producto => producto as Producto[])
    );
  }
  getID(id: any): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.baseUrl}/${id}`);
  }
}
