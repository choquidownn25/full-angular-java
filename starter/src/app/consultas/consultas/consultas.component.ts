import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { Producto } from '../class/producto';
import { ConsultasService } from '../service/consultas.service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { TableElement, TableExportUtil } from '@shared';
import { FormDialogComponent } from 'app/advance-table/dialogs/form-dialog/form-dialog.component';
import { AddComponent } from 'app/producto/dialog/add/add.component';
import { DeleteComponent } from 'app/producto/dialog/delete/delete.component';
import { EditComponent } from 'app/producto/dialog/edit/edit.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'app/producto/service/producto.service';
import { ProductoResponse } from '../class/productoresponse';


@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FileUploadComponent,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    //OwlDateTimeModule,
    //OwlNativeDateTimeModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'precio',
    'cantidad',
    'imagen',
    'actions',
  ];
  //productos!: MatTableDataSource<Producto>;
  productosList: any;
  product: Producto[] = [];
  producto: Producto[] = [];
  //productos: Producto[];
  productos: Producto[] = [];// Assuming 'productos' is of type 'any', replace with your actual type
  // No need for a separate constructor in this case
  productoElegido: Producto | null = null;
  dataSource!: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  rest!: Producto;
  id!: number;
  index!: number;
  //img: string;

  //modelos: Modelo[] = [];
  constructor(public productoSerivice: ConsultasService,
    public dialog: MatDialog,
    public dataService: ProductoService,
    private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.productoSerivice.getProducto().subscribe(producto => this.producto = producto);
  }
  onChangeState(event: any) {
    this.productoElegido = event.target.value;
    console.log(this.productoElegido);
    const productId = event.target.value;
    this.productoElegido = this.producto.find(p => p.id === parseInt(productId)) ?? null;
    console.log(this.productoElegido);
  }
  public getAllProducto = () => {
    this.dataService.get().subscribe(
      (data) => {
        // Check if this.productos is undefined and initialize it as an empty array if necessary
        if (data != null && data != null) {
          this.productosList = data;
          this.paginator._changePageSize(this.paginator.pageSize);
          //this.dataSource.data = data as Producto[];
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.productosList = [];
            }
          }
        }
      }
    );
  };
  public doFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    //this.productos.filter = filterValue;
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNew() {
    const dialogRef = this.dialog.open(AddComponent, {
      data: { producto: Producto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.getAllProducto();
      }
      this.getAllProducto();
    });
  }
  agregarFormularioProduct() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { producto: Producto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.getAllProducto();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
      this.getAllProducto();
      this.showNotification(
        'snackbar-success',
        'Add Record Successfully...!!!',
        'bottom',
        'center'
      );
    });
  }

  startEdit(
    i: number,
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    imagen: string
  ) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    //console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        imagen: imagen,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        //this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        //this.refreshTable();
        this.getAllProducto();
      }
    });
  }

  deleteItem(
    i: number,
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    imagen: string
  ) {
    this.index = i;
    this.id = id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        imagen: imagen,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        //const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        //this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        //this.refreshTable();
        this.getAllProducto();
      }
    });
  }

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    //const exportData: Partial<TableElement>[] =
      // this.dataSource.filteredData.map((x) => ({
      //   Nombre: x.nombre,
      //   Descripcion: x.descripcion,
      //   Precio: x.precio,
      //   Cantidad: x.cantidad,
      //   imagen: x.imagen,
      // }));

    //TableExportUtil.exportToExcel(exportData, 'excel');
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  consultar() {
    console.log("Este es el dato para la coulsta a la tabla : " + this.productoElegido?.id);
    this.productoSerivice.getID(this.productoElegido?.id).subscribe(
      (data) => {
        // Check if this.productos is undefined and initialize it as an empty array if necessary
        if (data != null && data != null) {
          this.product = data;
          this.dataSource = new MatTableDataSource(this.product);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.productosList = [];
            }
          }
        }
        console.error('Error fetching data:', error);
      }
    );
  }

}
