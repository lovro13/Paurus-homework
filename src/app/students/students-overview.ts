import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  email: string;
  courses: string[];
}

@Component({
  selector: 'app-students-overview',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    MultiSelectModule,
    FormsModule
  ],
  templateUrl: './students-overview.html',
  styleUrl: './students-overview.scss'
})

export class StudentsOverview {
  students: Student[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', courses: ['Math', 'Physics'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', courses: ['Biology', 'Chemistry'] },
    // ... more mock data ...
  ];
  coursesList: string[] = ['Math', 'Physics', 'Biology', 'Chemistry', 'History', 'Art'];
  // Pagination
  rows = 20;
  first = 0;

  // Dialog state
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  selectedStudent: Student | null = null;
  studentForm: Partial<Student> = {};

  get coursesOptions() {
    return this.coursesList.map(c => ({ label: c, value: c }));
  }

  onPage(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  showAddDialog() {
    this.dialogMode = 'add';
    this.studentForm = {};
    this.displayDialog = true;
  }

  showEditDialog(student: Student) {
    this.dialogMode = 'edit';
    this.selectedStudent = student;
    this.studentForm = { ...student };
    this.displayDialog = true;
  }

  saveStudent() {
    if (this.dialogMode === 'add') {
      const newStudent: Student = {
        id: Date.now(),
        name: this.studentForm.name!,
        email: this.studentForm.email!,
        courses: this.studentForm.courses || []
      };
      this.students = [...this.students, newStudent];
    } else if (this.dialogMode === 'edit' && this.selectedStudent) {
      this.students = this.students.map(s =>
        s.id === this.selectedStudent!.id ? { ...s, courses: this.studentForm.courses || [] } : s
      );
    }
    this.displayDialog = false;
    this.selectedStudent = null;
    this.studentForm = {};
  }

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s.id !== student.id);
  }

  cancelDialog() {
    this.displayDialog = false;
    this.selectedStudent = null;
    this.studentForm = {};
  }

  onCourseCheckboxChange(course: string, checked: boolean) {
    if (!this.studentForm.courses) {
      this.studentForm.courses = [];
    }
    if (checked) {
      if (!this.studentForm.courses.includes(course)) {
        this.studentForm.courses.push(course);
      }
    } else {
      this.studentForm.courses = this.studentForm.courses.filter(c => c !== course);
    }
  }
}
