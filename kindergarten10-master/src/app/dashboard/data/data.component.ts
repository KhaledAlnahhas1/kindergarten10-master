import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { Typ } from 'src/app/shared/interfaces/Kindergarden';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  constructor(public storeService: StoreService, private backendService: BackendService) {}

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public pageSizeOptions = [5, 10, 25, 100];
  public pageSize = 10; // Set your default page size here

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage);
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
    this.selectPageEvent.emit(this.currentPage);
    this.backendService.getChildren(this.currentPage);
  }

  public returnAllPages(): number[] {
    return Array.from({ length: Math.ceil(this.storeService.childrenTotalCount / this.pageSize) }, (_, i) => i + 1);
  }

  public cancelRegistration(childId: string): void {
    this.backendService.deleteChildData(childId, this.currentPage);
  }
}
