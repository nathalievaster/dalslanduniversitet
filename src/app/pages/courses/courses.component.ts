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

  constructor(private courseservice: CourseService,
    private schemaService: SchemaService
  ) { }

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
  addedCourses: string[] = [];

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

  // Paginering
  currentPage: number = 1;
  itemsPerPage: number = 10;

  get totalPages(): number {
    // Använder math.ceil för att runda upp (13 kurser blir inte 1,3 sidor, utan 2)
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  get paginatedCourses(): Course[] {
    // -1 för att få rätt index på kurserna i arrayen
    const start = (this.currentPage - 1) * this.itemsPerPage;
    // Använder slice för att plocka ut den delen av arrayen
    return this.filteredCourses.slice(start, start + this.itemsPerPage);
  }


  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Hjälpfunktioner för att visa sidnummer snyggt
  visiblePages(): number[] {
    const pages: number[] = [];
    // Anger hur många sidor vi vill visa på varje sida av den aktuella sidan
    const maxAround = 2;

    // Använder math.max(2, något) för att se till att det aldrig börjar tidigare än sida 2 pga att sida 1 alltid ska visas separat
    const start = Math.max(2, this.currentPage - maxAround);
    // Samma men tvärtom, så sista sidan alltid visas separat
    const end = Math.min(this.totalPages - 1, this.currentPage + maxAround);

    // Loopar igenom alla sidorna mellan start och end, och pushar till arrayen
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  // Visa alltid första sidan och sista sidan
  shouldShowPage(page: number): boolean {
    return page === 1 || page === this.totalPages;
  }

}