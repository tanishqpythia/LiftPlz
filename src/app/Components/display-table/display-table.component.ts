import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService } from '../../services/api/api.service';
import { NotificationTriggerService } from '../../services/notificationTrigger/notification-trigger.service';

@Component({
  selector: 'app-display-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './display-table.component.html',
  styleUrl: './display-table.component.css'
})
export class DisplayTableComponent implements AfterViewInit {


  private ngxLoader = inject(NgxUiLoaderService);

  private notification = inject(NotificationTriggerService)

  private apiservice = inject(ApiService)

  @Input() idKey = 'id';
  @Input() summaryData: any[] = [];
  @Input() tablecaption: string = '';
  // @Input() isAdmin: boolean = false;

  private _displayedColumns: string[] = [];
  @Input()
  set displayedColumns(cols: string[]) {
    this._displayedColumns = cols || [];
    this.updateColumnsToDisplay();
  }
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  columnsToDisplay: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  hasRecordStatus = false;
  tableReady: boolean = false;

  columnKeyMap: Record<string, string> = {};

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  private dialog = inject(MatDialog);

  @Input()
set tableData(data: any[]) {
  this.ngxLoader.start('tableLoader'); // 🔄 start named loader

  try {
    this.dataSource.data = data || [];

    if (data?.length) {
      const first = data[0];
      this.columnKeyMap = Object.keys(first).reduce((map, key) => {
        map[key.toLowerCase()] = key;
        return map;
      }, {} as Record<string, string>);
    }

    this.hasRecordStatus = this.dataSource.data.some(r => r.stopSelling !== undefined);
    this.updateColumnsToDisplay();

    if (!this.tableReady) {
      this.setupTableBindings();
    }
  } finally {
    this.ngxLoader.stop('tableLoader'); // ✅ always stop loader
  }
}


  get columnKeys(): string[] {
    return this._displayedColumns;
  }

  get allColumns(): string[] {
    return this.columnsToDisplay;
  }

  ngAfterViewInit() {
    // If tableData was set before view init, bind sort/paginator now
    if (this.dataSource.data.length && !this.tableReady) {
      this.setupTableBindings();
    }
  }

  private setupTableBindings() {
    this.tableReady = true;

    setTimeout(() => {
      console.log("Binding paginator and sort");
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (row, columnName) => {
        const key = this.columnKeyMap[columnName.toLowerCase()] || columnName;
        const value = row[key];
        return typeof value === 'string' ? value.toLowerCase() : value ?? '';
      };
    });
  }

  private updateColumnsToDisplay() {
    this.columnsToDisplay = [...this._displayedColumns];
    // if (this.hasRecordStatus || this.isAdmin) {
    if (this.hasRecordStatus) {
      if (!this.columnsToDisplay.includes('action')) {
        this.columnsToDisplay.push('action');
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.ngxLoader.start('filter');
  
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  
    this.ngxLoader.stop('filter');
  }
  

  toggleRecordStatus(row: any) {

    // if (!this.is_admin()) return;
  
    const newStatus = !row.stopSelling;

    console.log("table row status changed")

    const ref = this.dialog.open(DialogboxComponent, {
      data: {
        title: 'Confirm Status Change',
        message: `Set stopSelling to ${newStatus}?`,
        action: `Yes, ${newStatus ? 'Enable' : 'Disable'}`,
        cancelaction: 'Cancel',
        data: JSON.stringify(row, null, 2)
      }
    });
  
    ref.afterClosed().subscribe(ok => {
      if (ok) {

        let data = {
          "sr": row["sr"],
          "userID": 5,
          "shid": row["shid"],
          "symbol": row["symbol"],
          "exchange": row["exchange"],
          "quantity": 0,
          "cost": 0,
          "ltp": 0,
          "outcome": 0,
          "performance": 0,
          "broker": row["broker"],
          "stopselling": !row["stopSelling"]
        }


        console.log("got response as ok",data)

        this.ngxLoader.start('updateRow');

        this.apiservice.postSync({endpoint:'Updateholding/stopselling', body:data, isAuthRequired:true, isUserIdRequired:true}).subscribe(
          (response: any) => {
            console.log(response)
            if (response && response.status === 200) {
              this.ngxLoader.stop()
              console.log(response)
              this.notification.showNotification({
                notificationType: 'success',
                Message: "Holding Data Updated Sucesfully ",
                verticalPosition: 'top',
              });
              
            }
          },
          (error: any) => {
            this.ngxLoader.stop()
            console.error('Error during updating status:', error.error);
            this.notification.showNotification({
              notificationType: 'error',
              Message: "Holding Data Update Failed, Please ensure to use valid data and try again",
              verticalPosition: 'top',
            });
          }
        );

  
        row.stopSelling = newStatus;
        this.dataSource.data = [...this.dataSource.data]; 
  
        setTimeout(() => this.ngxLoader.stop('updateRow'), 300); // simulate small delay
      }
    });
  }
  
  deleteRow(row: any) {
    // if (!this.is_admin()) return;

    const ref = this.dialog.open(DialogboxComponent, {
      data: { message: `Delete item with ID ${row[this.idKey]}?` }
    });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        console.log("got response as okay")
        this.dataSource.data = this.dataSource.data.filter(
          r => r[this.idKey] !== row[this.idKey]
        );
      }
    });
  }

  // is_admin(): boolean {
  //   // console.log("isAdmin log",this.isAdmin)
  //   return this.isAdmin === true;
  // }

  onSort(event: Sort) {
    console.log('🔃 Sort clicked');
    console.log('📊 Column:', event.active);
  
    this.ngxLoader.start('sort');
    
    this.dataSource.data = [...this.dataSource.data]; // reassign to trigger change detection
  
    this.ngxLoader.stop('sort');
  }
  
}
