import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee(0, '', '', ''); // Provide default values or adjust as needed
  submitted = false;

  constructor(private employeeService: EmployeeServiceService, private router: Router) {}

  ngOnInit(): void {}

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      data => {
        this.submitted = true;
        console.log(data);
        this.goToEmployeeList();
      },
      error => {
        console.log(error);
        // Handle error cases, such as displaying an error message to the user
      }
    );
  }

  onSubmit() {
    console.log('Submitted Employee:', this.employee);
    this.saveEmployee();
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

}
