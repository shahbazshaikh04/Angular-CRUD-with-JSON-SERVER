import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeDetailService {

  public employeeDetail$: Observable<Employee>;
  private employeeDetail: Subject<Employee>;

  constructor() {
    this.employeeDetail = new Subject();
    this.employeeDetail$ = this.employeeDetail.asObservable();
  }

  public setEmployee(employee: Employee) {
    this.employeeDetail.next(employee);
  }
}
