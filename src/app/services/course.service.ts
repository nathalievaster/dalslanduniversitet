import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Sökvägen till kursdatabasen
  private url: string = "miun_courses.json";

  // HttpClient används för att hämta data via HTTP
  constructor(private http: HttpClient) { }

  // Hämtar kurser som en Observable (asynkront)
  getCourses(): Observable<Course[]> {
    // Gör ett HTTP GET-anrop och returnerar en Observable med en array av Course-objekt
    return this.http.get<Course[]>(this.url);
  }
}