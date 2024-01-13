// kindergarden.component.ts
import { Component, OnInit } from '@angular/core';
import { Kindergarten, Typ } from '../shared/interfaces/kindergarten';
import { KindergartenService } from '../shared/kindergarten.service';
@Component({
  selector: 'app-kindergarten',
  templateUrl: './kindergarten.component.html',
  styleUrls: ['./kindergarten.component.scss'],
})
export class KindergartenComponent implements OnInit {
  kindergardens: Kindergarten[] = [];
  Typ = Typ;

  constructor(private KindergardenService: KindergartenService) {}

  ngOnInit(): void {
    this.KindergardenService.getKindergardens().subscribe((data) => {
      this.kindergardens = data;
    });
  }
}
