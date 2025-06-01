import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LabelComponent } from './components/label/label.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    LabelComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'phase-3';
  private readonly fb = inject(FormBuilder);
  userForm: FormGroup;

  handleClick(event: Event) {
    console.log('Button clicked', event);
    alert('Button clicked!');
  }

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      terms_condition: [],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form is valid', this.userForm.value);
    } else {
      console.log('Form is invalid', this.userForm.value);
    }
  }
}
