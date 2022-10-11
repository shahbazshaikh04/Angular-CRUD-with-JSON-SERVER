import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  private baseUrl : string;
  constructor(private http : HttpClient) { 
    this.baseUrl = "http://localhost:3000/"
  }

  getEmployee() : Observable <Employee[]> {
    const url : string = this.baseUrl + 'employee';
    return this.http.get<Employee[]>(url);
  }

  addEmployee(employee:Employee):Observable<Employee>{
    const url : string =this.baseUrl + 'employee';
    return this.http.post<Employee>(url,employee)
  }

  editEmployee(data : Employee,id : number):Observable<Employee> {
    const url : string =this.baseUrl + 'employee/' + id;
    return this.http.put<Employee>(url,data);
  }


}
