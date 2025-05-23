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
    });
  }
  // Sorteringsvariabler
sortField: string = '';
sortAsc: boolean = true;

sortCourses(field: string): void {
  // Om användaren klickar på samma kolumn igen, växlar den riktning
  if (this.sortField === field) {
    this.sortAsc = !this.sortAsc; // växla riktning
  } else {
    // Vid klick på ny kolumn, börjar den om och sorterar den efter stigande ordning
    this.sortField = field;
    this.sortAsc = true;
  }
  // Sorteringen av listan
  this.courselist.sort((a: any, b: any) => {
    let valueA = a[field];
    let valueB = b[field];

    if (typeof valueA === 'string') {
      // Ej skiftlägeskänsligt
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return this.sortAsc ? -1 : 1;
    if (valueA > valueB) return this.sortAsc ? 1 : -1;
    return 0;
  });
}

}