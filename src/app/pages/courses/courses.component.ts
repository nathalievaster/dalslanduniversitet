import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchemaService } from '../../services/schema.service';
import { CourseFilterService } from '../../services/course-filter.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courselist: Course[] = [];
  addedCourses: string[] = [];
  uniqueSubjects: string[] = [];

  // Variabler för filtrering
  searchText: string = '';            // Söktext för kurskod/namn
  selectedSubject: string = '';       // Valt ämne

  // Sorteringsvariabler
  sortField: string = '';
  sortAsc: boolean = true;

  // Paginering
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private courseservice: CourseService,
    private schemaService: SchemaService,
    private filterService: CourseFilterService
  ) {}

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      // Behåller bara unika ämnen till dropdown-menyn
      this.uniqueSubjects = [...new Set(data.map(course => course.subject))];
    });

    // Lägg till kurser som redan finns i ramschemat
    const schedule = this.schemaService.getSchedule();
    this.addedCourses = schedule.map(course => course.courseCode);
  }

  // Filtrerad kurslista baserad på input i sökrutan
  get filteredCourses(): Course[] {
    const filtered = this.filterService.filterCourses(
      this.courselist,
      this.searchText,
      this.selectedSubject
    );
    return this.filterService.sortCourses(filtered, this.sortField, this.sortAsc);
  }

  get paginatedCourses(): Course[] {
    // -1 för att få rätt index på kurserna i arrayen
    return this.filterService.paginate(this.filteredCourses, this.currentPage, this.itemsPerPage);
  }

  get totalPages(): number {
    // Använder math.ceil för att runda upp (13 kurser blir inte 1,3 sidor, utan 2)
    return this.filterService.getTotalPages(this.filteredCourses.length, this.itemsPerPage);
  }

  sortCourses(field: string): void {
    // Om användaren klickar på samma kolumn igen, växlar den riktning
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc; // växla riktning
    } else {
      // Vid klick på ny kolumn, börjar den om och sorterar den efter stigande ordning
      this.sortField = field;
      this.sortAsc = true;
    }
  }

  // Metod för att lägga till kurs i ramschema 
  addToSchedule(course: Course): void {
    const added = this.schemaService.addToSchedule(course);
    if (added) {
      this.addedCourses.push(course.courseCode);
    }
  }

  // Återställ till första sidan vid filterändring
  onFilterChange(): void {
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Hjälpfunktioner för att visa sidnummer snyggt
  visiblePages(): number[] {
    const maxAround = 2;
    return this.filterService.getVisiblePages(this.currentPage, this.totalPages, maxAround);
  }

  // Visa alltid första sidan och sista sidan
  shouldShowPage(page: number): boolean {
    return page === 1 || page === this.totalPages;
  }
}