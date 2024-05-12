import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeServiceService } from 'src/app/service/employee-service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id?: number;
  employee: Employee = new Employee(); // Initialize with an empty Employee
  errorMessage: string = ''; // To hold error messages

  constructor(private employeeService: EmployeeServiceService, 
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    this.id = idParam ? +idParam : undefined; // Convert id to number or keep it undefined
    if (this.id !== undefined) {
      this.employeeService.getEmployeeById(this.id).subscribe(
        data => {
          this.employee = data;
        },
        error => {
          console.log(error);
          this.errorMessage = 'Error fetching employee details.';
        }
      );
    } else {
      console.error('Invalid ID parameter.');
      this.errorMessage = 'Invalid ID parameter.';
    }
  }

  goToList() {
    this.router.navigate(['/employees']);
  }

  updateEmployee() {
    if (this.id !== undefined) {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(
        data => {
          console.log('Employee updated successfully:', data);
          this.goToList();
        },
        error => {
          console.error('Error updating employee:', error);
          if (error.status === 404) {
            this.errorMessage = 'Employee not found. Please refresh the page.';
          } else {
            this.errorMessage = 'An error occurred while updating employee.';
          }
        }
      );
    } else {
      console.error('Invalid ID parameter.');
      this.errorMessage = 'Invalid ID parameter.';
    }
  }

  onSubmit() {
    this.updateEmployee();
  }
}
