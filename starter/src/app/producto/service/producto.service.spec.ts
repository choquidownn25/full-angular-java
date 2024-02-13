import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { environment } from 'environments/environment';
import { Producto } from '../class/producto';
fdescribe('ProductoService', () => {
  let service: ProductoService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ProductoService
      ]
    });
    service = TestBed.inject(ProductoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllSimple Producto', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Producto[] = [
        {
          id: 1,
          nombre: 'title',
          descripcion: 'Descripcion',
          precio: 1,
          cantidad: 112,
          imagen: 1
        }
      ];
      //Act
      service.getProductos()
      .subscribe((data)=> {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL_TODOS_PRODUCTO_JAVA}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });

});
