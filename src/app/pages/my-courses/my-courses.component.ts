import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  // Array som innehåller kurser i studentens schema
  schedule: Course[] = [];

  // Injicerar SchemaService för att kunna hämta och manipulera schemat
  constructor(private schemaService: SchemaService) {}

  // Körs när komponenten initialiseras – hämtar schemat
  ngOnInit() {
    this.schedule = this.schemaService.getSchedule();
  }

  // Tar bort en kurs från schemat baserat på kurskod
  removeCourse(courseCode: string) {
    this.schemaService.removeFromSchedule(courseCode);
    // Uppdaterar schemat efter att en kurs tagits bort
    this.schedule = this.schemaService.getSchedule();
  }

  // Räknar ut den totala poängsumman för valda kurser
  get totalPoints(): number {
    return this.schedule.reduce((sum, course) => sum + course.points, 0);
  }
}
