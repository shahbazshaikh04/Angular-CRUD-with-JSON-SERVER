import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from '../employee-detail.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  public details!: Employee;

  constructor(private employeeDetailService: EmployeeDetailService) { }

  ngOnInit(): void {
    this.employeeDetailService.employeeDetail$.subscribe((res: Employee) => {
      console.log(res);
      this.details = res;
    });
  }

}
