import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courselist: Course[] = [];

  constructor(private courseservice : CourseService) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
    })
  }
}
