import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseUrl = "http://localhost:8080/api/v1";
  
  constructor(private httpClient: HttpClient) { }

  public getEmployeesList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseUrl}/employees`);
  }

  public createEmployee(employee: Employee): Observable<Object> {
    const url = `${this.baseUrl}/addEmployee`; // Include the ID in the URL if needed
    return this.httpClient.post<Object>(url, employee); // Include the employee data in the POST request
  }
}
