import { Injectable } from '@angular/core';
import { Kindergarten } from './interfaces/kindergarten';
import { Child, ChildResponse } from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public kindergardens: Kindergarten[] = [];
  public children: ChildResponse[] = []
  public childrenTotalCount: number = 0;
}
