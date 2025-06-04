import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  // Nyckeln som används för att spara/hämta schema i localStorage
  private schemaKey = 'mySchedule';

  constructor() {}

  // Hämtar det sparade schemat från localStorage
  getSchedule(): Course[] {
    const data = localStorage.getItem(this.schemaKey);
    // Om det finns data, parsa till array av Course, annars returnera tom array
    return data ? JSON.parse(data) : [];
  }

  // Lägger till en kurs i schemat om den inte redan finns
  addToSchedule(course: Course): boolean {
    let schedule = this.getSchedule();

    // Kontrollera om kursen redan är tillagd (baserat på kurskod)
    if (schedule.find(c => c.courseCode === course.courseCode)) {
      return false; // Redan tillagd
    }

    // Lägg till kursen och spara schemat igen
    schedule.push(course);
    localStorage.setItem(this.schemaKey, JSON.stringify(schedule));
    return true;
  }

  // Tar bort en kurs från schemat baserat på kurskod
  removeFromSchedule(courseCode: string): void {
    let schedule = this.getSchedule();

    // Ta bort kurs med samma kurskod som den som skickades in
    schedule = schedule.filter(c => c.courseCode !== courseCode);

    // Uppdatera schemat i localStorage
    localStorage.setItem(this.schemaKey, JSON.stringify(schedule));
  }
}
