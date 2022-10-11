import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { EmployeeDetailService } from '../employee-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() public set updatedRecord(value: Employee) {
    if (value) {
      const index = this.employeeData.findIndex((emp: Employee) => emp.id === value.id);
      this.employeeData.splice(index, 1, value);
    }
  };
  public get updatedRecord(): Employee {
    return this._updatedRecord;
  }

  @Output() edit: EventEmitter<Employee>
  public employeeData: Employee[];
  private _updatedRecord!: Employee;
  constructor(
    private employeeService: EmployeeService,
    private employeeDetailService: EmployeeDetailService,
    private router: Router
  ) {
    this.edit = new EventEmitter();
    this.employeeData = [];
    // this.updatedRecord 
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.employeeService.getEmployee().subscribe((employee: Employee[]) => {
      this.employeeData = employee;
    })
  }

  editEmployee(employee: Employee) {
    this.edit.emit(employee);
  }

  viewEmployee(employee: Employee) {
    this.employeeDetailService.setEmployee(employee);
    this.router.navigate(['employee', 'details']);
  }

}
