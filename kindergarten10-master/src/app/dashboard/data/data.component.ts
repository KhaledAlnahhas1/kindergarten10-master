// data.component.ts
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Typ } from 'src/app/shared/interfaces/kindergarten';
import { StoreService } from 'src/app/shared/store.service';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<StoreService>;
  constructor(public storeService: StoreService, private backendService: BackendService,private _liveAnnouncer: LiveAnnouncer ) {}

@Input() currentPage!: number;
@Output() selectPageEvent = new EventEmitter<number>();
public pageSizeOptions = [10, 25, 100];
 public pageSize = 10; 



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   this.backendService.getChildren(this.currentPage);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  getAge(birthDate: string): number | null {
    const currentDate = new Date();
    const birthDateObj = new Date(birthDate);

    if (isNaN(birthDateObj.getTime())) {
      // Invalid date format
      return null;
    }

    const age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday is this year
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() && currentDate.getDate() < birthDateObj.getDate())
    ) {
      return age - 1;
    }

    return age;
  }

  onPaginatorChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize; // Update the pageSize based on the paginator event
    this.selectPageEvent.emit(this.currentPage);
    this.backendService.getChildren(this.currentPage);
  }

  // public returnAllPages(): number[] {
  //   return Array.from({ length: Math.ceil(this.storeService.childrenTotalCount) }, (_, i) => i + 1);
  // }

  public returnAllPages(): number[] {
    return Array.from({ length: Math.ceil(this.storeService.childrenTotalCount / this.pageSize) }, (_, i) => i + 1);
  }

  public cancelRegistration(childId: string): void {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

//   announceSortChange(sortState: Sort) {
//   if (sortState.direction) {
//     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//   } else {
//     this._liveAnnouncer.announce('Sorting cleared');
//   }
// }
}