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
  students: Student[] = [];
  
  coursesList: string[] = ['Math', 'Physics', 'Biology', 'Chemistry', 'History', 'Art'];
  // Pagination
  rows = 20;
  first = 0;

  // Dialog state
  displayDialog = false;
  dialogMode: 'add' | 'edit' = 'add';
  selectedStudent: Student | null = null;
  studentForm: Partial<Student> = {};

  constructor() {
    const saved = localStorage.getItem('students');
    if (saved) {
      this.students = JSON.parse(saved);
    } else {
      this.students = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', courses: ['Math', 'Physics'] },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', courses: ['Biology', 'Chemistry'] },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', courses: ['History', 'Art'] },
        { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', courses: ['Math', 'Biology'] },
        { id: 5, name: 'Carol White', email: 'carol.white@example.com', courses: ['Physics', 'Chemistry'] },
        { id: 6, name: 'David Green', email: 'david.green@example.com', courses: ['Art', 'Math'] },
        { id: 7, name: 'Eva Black', email: 'eva.black@example.com', courses: ['History', 'Physics'] },
        { id: 8, name: 'Frank Blue', email: 'frank.blue@example.com', courses: ['Biology', 'Art'] },
        { id: 9, name: 'Grace Red', email: 'grace.red@example.com', courses: ['Math', 'Chemistry'] },
        { id: 10, name: 'Henry Gold', email: 'henry.gold@example.com', courses: ['Physics', 'History'] },
        { id: 11, name: 'Ivy Silver', email: 'ivy.silver@example.com', courses: ['Art', 'Biology'] },
        { id: 12, name: 'Jack Gray', email: 'jack.gray@example.com', courses: ['Math', 'History'] },
        { id: 13, name: 'Kathy Violet', email: 'kathy.violet@example.com', courses: ['Chemistry', 'Art'] },
        { id: 14, name: 'Leo Orange', email: 'leo.orange@example.com', courses: ['Physics', 'Biology'] },
        { id: 15, name: 'Mona Pink', email: 'mona.pink@example.com', courses: ['Math', 'Chemistry'] },
        { id: 16, name: 'Nina Cyan', email: 'nina.cyan@example.com', courses: ['History', 'Art'] },
        { id: 17, name: 'Oscar Lime', email: 'oscar.lime@example.com', courses: ['Biology', 'Math'] },
        { id: 18, name: 'Paula Teal', email: 'paula.teal@example.com', courses: ['Physics', 'Chemistry'] },
        { id: 19, name: 'Quinn Indigo', email: 'quinn.indigo@example.com', courses: ['Art', 'History'] },
        { id: 20, name: 'Rita Brown', email: 'rita.brown@example.com', courses: ['Math', 'Biology'] },
        { id: 21, name: 'Sam Green', email: 'sam.green@example.com', courses: ['Chemistry', 'Physics'] },
        { id: 22, name: 'Tina Blue', email: 'tina.blue@example.com', courses: ['History', 'Art'] },
        { id: 23, name: 'Uma Red', email: 'uma.red@example.com', courses: ['Math', 'Physics'] },
        { id: 24, name: 'Victor Gold', email: 'victor.gold@example.com', courses: ['Biology', 'Chemistry'] },
        { id: 25, name: 'Wendy Silver', email: 'wendy.silver@example.com', courses: ['Art', 'Math'] },
      ];
    }
  }

  private saveStudentsToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

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
    this.saveStudentsToLocalStorage();
    this.displayDialog = false;
    this.selectedStudent = null;
    this.studentForm = {};
  }

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s.id !== student.id);
    this.saveStudentsToLocalStorage();
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
