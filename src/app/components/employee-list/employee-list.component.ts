import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];

  constructor(private employeeService: EmployeeServiceService, private router:Router) {}

  ngOnInit(): void {
   
    this.getEmployees();

}

private getEmployees() {

  this.employeeService.getEmployeesList().subscribe(data => {
    this.employees = data;
    console.log(data);
  })
}

updateEmployee(id: number | undefined) {
  if (id !== undefined) {
    this.router.navigate(['updateEmployee', id]);
  } else {
    // Handle the case where id is undefined, such as showing an error message
    console.error('Employee ID is undefined.');
  }
}

}
