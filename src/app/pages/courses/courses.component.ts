import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courselist: Course[] = [];

  constructor(private courseservice : CourseService,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      // Behåller bara unika ämnen till dropdown-menyn
      this.uniqueSubjects = [...new Set(data.map(course => course.subject))];
    });
  }
  // Variabler för filtrering
  searchText: string = '';            // Söktext för kurskod/namn
  selectedSubject: string = '';       // Valt ämne
  uniqueSubjects: string[] = [];      // Lista över unika ämnen (för dropdown)

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
// Filtrerad kurslista baserad på input i sökrutan
  get filteredCourses(): Course[] {
    return this.courselist.filter(course => {
      const text = this.searchText.toLowerCase();
      const matchesText =
        course.courseCode.toLowerCase().includes(text) ||
        course.courseName.toLowerCase().includes(text);

      const matchesSubject =
        this.selectedSubject === '' || course.subject === this.selectedSubject;

      return matchesText && matchesSubject;
    });
  }

  // Metod för att lägga till kurs i ramschema 
  addCourseToSchedule(course: Course): void {
    const success = this.schemaService.addToSchedule(course);
    if (success) {
      alert(`Kursen "${course.courseName}" har lagts till i ditt ramschema.`);
    } else {
      alert(`Kursen "${course.courseName}" finns redan i ditt ramschema.`);
    }
  }
}