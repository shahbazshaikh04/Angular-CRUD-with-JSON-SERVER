import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  public empForm: FormGroup;
  public updatedEmployee!: Employee;


  constructor(private fb: FormBuilder,
    private employeeservices: EmployeeService

  ) {
    this.empForm = this.fb.group({
      id :[''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3)]],
      gender: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dob: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
  }

  // saveEmployee() {
  //   console.log(this.empForm);
  // }

  get FormControlName(): { [key: string]: AbstractControl } {
    return this.empForm.controls
  }
  public saveEmployee() {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      if(this.empForm.value.id){
        this.employeeservices.editEmployee(this.empForm.value, this.empForm.value.id).subscribe(res=>{
          console.log(res);
          this.updatedEmployee = res;
        })
      }else{
        this.employeeservices.addEmployee(this.empForm.value).subscribe((res) => {
          // console.log(res);
          
          this.reset();
        })
      }
    }
  }

  public editEmployee(employee: Employee) {
    this.empForm.patchValue(employee);

  }
  public reset() {
    this.empForm.reset()
  }


}
