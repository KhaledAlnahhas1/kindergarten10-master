// kindergarden.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Kindergarten } from './interfaces/kindergarten';
@Injectable({
  providedIn: 'root',
})
export class KindergartenService {
  getKindergardens(): Observable<Kindergarten[]> {
    const kindergardens: Kindergarten[] = [
        {
            "id": 1,
            "name": "Waldorfkindergarden im Zentrum Wiens",
            "address": "Oleandergasse 21, 1220 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": 1,
            "photoFilePath": 'assets/images/kindergartenfoto1.jpg',
          },
          {
            "id": 2,
            "name": "Kindergarden der Karl Schubert Schule für seelenpflegebedürftige Kinder und Jugendliche in Wien",
            "address": "Kanitzgasse 1-3, 1230 Wien",
            "betreiber": "Verein Karl Schubertschule für Seelenpflege- bedürftige Kinder und Jugendliche in Wien",
            "typ": 1,
            "photoFilePath": 'assets/images/kindergartenfoto2.jpg',

          },
          {
            "id": 3,
            "name": "Kindergarden der Stadt Wien",
            "address": "Audorfgasse 20, 1210 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": 2,
            "photoFilePath": 'assets/images/kindergartenfoto3.jpg',

          },
          {
            "id": 4,
            "name": "Kindergarden der Stadt Wien",
            "address": "Moßbachergasse 20-24, 1140 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": 2,
            "photoFilePath": 'assets/images/kindergartenfoto4.jpg',

          },
          {
            "id": 5,
            "name": "Montessori Kinderhaus Wien 1",
            "address": "Nußdorferstraße 6, 1090 Wien",
            "betreiber": "Montessori Kinderhaus Wien",
            "typ": 1,
            "photoFilePath": 'assets/images/kindergartenfoto5.jpg',

          }
    ];

    return of(kindergardens);
  }
}
