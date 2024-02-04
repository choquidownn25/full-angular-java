import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdvanceTable } from './advance-table.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root',
})

export class AdvanceTableService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/advanceTable.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<AdvanceTable[]> = new BehaviorSubject<
    AdvanceTable[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: AdvanceTable;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): AdvanceTable[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<AdvanceTable[]>(this.API_URL)
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        }
      );
  }
  addAdvanceTable(advanceTable: AdvanceTable): void {
    this.dialogData = advanceTable;

    /*  this.httpClient.post(this.API_URL, advanceTable).subscribe(data => {
      this.dialogData = advanceTable;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateAdvanceTable(advanceTable: AdvanceTable): void {
    this.dialogData = advanceTable;

    /* this.httpClient.put(this.API_URL + advanceTable.id, advanceTable).subscribe(data => {
      this.dialogData = advanceTable;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteAdvanceTable(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
