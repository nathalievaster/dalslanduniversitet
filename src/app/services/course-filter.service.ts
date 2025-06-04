import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseFilterService {

  // Filtrerar kurser baserat på söktext (kurskod/namn) och valt ämne
  filterCourses(courses: Course[], searchText: string, selectedSubject: string): Course[] {
    const text = searchText.toLowerCase(); // Gör sökningen skiftlägesokänslig
    return courses.filter(course => {
      const matchesText =
        course.courseCode.toLowerCase().includes(text) ||
        course.courseName.toLowerCase().includes(text); // Matchar kurskod eller namn

      const matchesSubject =
        selectedSubject === '' || course.subject === selectedSubject; // Matchar valt ämne

      return matchesText && matchesSubject; // Returnerar kurs om båda villkoren är uppfyllda
    });
  }

  // Sorterar kurser baserat på valt fält och sorteringsriktning
  sortCourses(courses: Course[], field: string, asc: boolean): Course[] {
    return [...courses].sort((a: any, b: any) => {
      let valueA = a[field];
      let valueB = b[field];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase(); // Skiftlägesokänslig jämförelse för strängar
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return asc ? -1 : 1;
      if (valueA > valueB) return asc ? 1 : -1;
      return 0; // Lika värden
    });
  }

  // Paginering: delar upp en array i sidor
  paginate<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    const start = (currentPage - 1) * itemsPerPage; // Räkna ut startindex
    return items.slice(start, start + itemsPerPage); // Returnerar rätt "sida" med objekt
  }

  // Beräknar totala antalet sidor
  getTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage); // Runda upp så att alla objekt får plats
  }

  // Returnerar sidnummer som ska visas bredvid den aktuella sidan (för sidnavigering)
  getVisiblePages(currentPage: number, totalPages: number, maxAround = 2): number[] {
    const start = Math.max(2, currentPage - maxAround); // Börja inte tidigare än sida 2
    const end = Math.min(totalPages - 1, currentPage + maxAround); // Sluta före sista sidan
    const pages: number[] = [];

    for (let i = start; i <= end; i++) {
      pages.push(i); // Lägg till sidnummer inom spannet
    }

    return pages;
  }
}