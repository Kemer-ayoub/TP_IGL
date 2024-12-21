import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MockInfirmierService { // this class is for mocking data

  constructor() { }
  getInfirmierData(): Observable<any> {
    const mockData = {
      ssn: '11111',
      firstName: 'Oussama',
      lastName: 'Benhebbadj',
      address: 'Algiers',
      phoneNumber: '0796201008',
      dob: '23/07/2003',
      emergencyContact: '0662890634',
      carePhysician: 'doctorX',
      previousCares: [
        {name:'Care 1',
           date: '22/10/2024',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 2',
           date: '22/10/2023',
          type:'bandage',
          description:'..........',
          observations:'xxxxxxxx',
        },
        {name:'Care 3',
           date: '22/10/2024',
          type:'bage',
          description:'..........',
          observations:'xxxx654xxxx',
        }
      ],
    };
    return of(mockData); // Simulates an HTTP response with the mock data
  }
}
