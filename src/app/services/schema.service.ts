import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private schemaKey = 'mySchedule';

  constructor() {}

  getSchedule(): Course[] {
    const data = localStorage.getItem(this.schemaKey);
    return data ? JSON.parse(data) : [];
  }

  addToSchedule(course: Course): boolean {
    let schedule = this.getSchedule();

    if (schedule.find(c => c.courseCode === course.courseCode)) {
      return false; // Redan tillagd
    }

    schedule.push(course);
    localStorage.setItem(this.schemaKey, JSON.stringify(schedule));
    return true;
  }
}