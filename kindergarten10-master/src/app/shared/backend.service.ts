import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarten } from './interfaces/kindergarten';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarten[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getChildren(page: number) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
    });
  }

  public addChildData(child: Child, page: number) {
    this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
      this.getChildren(page);
    });
  }

  public deleteChildData(childId: string, page: number) {
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_ => {
      this.getChildren(page);
    });
  }
}
