import { booleanAttribute, Component, inject, OnInit, signal } from '@angular/core';
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
import { DialogComponent } from "./components/dialog/dialog.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    LabelComponent,
    CommonModule,
    DialogComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'phase-3';
  private readonly fb = inject(FormBuilder);
  userForm: FormGroup;
  submitted = false;

  handleClick(event: Event) {
    console.log('Button clicked', event);
    alert('Button clicked!');
  }

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      terms_condition: [''],
    });
  }

  isError(name: string): boolean {
    const nameControl = this.userForm.get(name);
    return !!(nameControl?.invalid && nameControl?.touched);
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      console.log('Form is valid', this.userForm.value);
    } else {
      console.log('Form is invalid', this.userForm.value);
    }
  }

  public isDialogOpen = signal(false);

  public openDialog(): void {
    this.isDialogOpen.set(true);
  }

  public onConfirm(): void {
    this.isDialogOpen.set(false);
  }

  public onClose(): void {
    this.isDialogOpen.set(false);
  }
}
