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
  schedule: Course [] = [];

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.schedule = this.schemaService.getSchedule();
  }
  removeCourse(courseCode: string) {
    this.schemaService.removeFromSchedule(courseCode);
    this.schedule = this.schemaService.getSchedule(); // Uppdatera listan
  }
}
