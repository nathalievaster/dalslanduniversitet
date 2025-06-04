import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseFilterService {

  filterCourses(courses: Course[], searchText: string, selectedSubject: string): Course[] {
    const text = searchText.toLowerCase();
    return courses.filter(course => {
      const matchesText =
        course.courseCode.toLowerCase().includes(text) ||
        course.courseName.toLowerCase().includes(text);
      const matchesSubject =
        selectedSubject === '' || course.subject === selectedSubject;
      return matchesText && matchesSubject;
    });
  }

  sortCourses(courses: Course[], field: string, asc: boolean): Course[] {
    return [...courses].sort((a: any, b: any) => {
      let valueA = a[field];
      let valueB = b[field];
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      if (valueA < valueB) return asc ? -1 : 1;
      if (valueA > valueB) return asc ? 1 : -1;
      return 0;
    });
  }

  paginate<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }

  getTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  getVisiblePages(currentPage: number, totalPages: number, maxAround = 2): number[] {
    const start = Math.max(2, currentPage - maxAround);
    const end = Math.min(totalPages - 1, currentPage + maxAround);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}