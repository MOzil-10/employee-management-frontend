import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];

  constructor(private employeeService: EmployeeServiceService) {}

  ngOnInit(): void {
   
    this.getEmployees();

}

private getEmployees() {

  this.employeeService.getEmployeesList().subscribe(data => {
    this.employees = data;
    console.log(data);
  })
}
}
