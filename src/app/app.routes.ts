import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'courses', component: CoursesComponent},
    { path: 'myCourses', component: MyCoursesComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];
