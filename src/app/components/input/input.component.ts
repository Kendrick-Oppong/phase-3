import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { cn } from '../../lib/classnames';

type Variant = 'default' | 'outline';
type Size = 'default' | 'sm' | 'lg';
type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'checkbox'
  | 'radio';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() variant: Variant = 'default';
  @Input() size: Size = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() type: InputType = 'text';
  @Input() placeholder? = '';
  @Input() value?: string | number | boolean = '';
  @Input() ariaLabel?: string;
  @Input() inputClass? = '';
  @Input() fieldId?: string;
  @Input() name? = '';

  @Output() inputChange = new EventEmitter<string | number | boolean>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();

  private onChange: (value: string | number | boolean) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    console.log('Enter key pressed, emitting inputChange event', this.value);
    this.inputChange.emit(this.value);
  }

  get computedClasses(): string {
    let baseClasses = '';
    const isRadio = this.type === 'radio';
    const isCheckbox = this.type === 'checkbox';

    switch (this.type) {
      case 'radio':
        baseClasses =
          'h-[18px] w-[18px] rounded-full border border-grey-400 text-primary-500 accent-primary-500 focus:outline-none transition-colors';
        break;
      case 'checkbox':
        baseClasses =
          'h-6 w-6 rounded border border-grey-400 text-primary-500 accent-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none focus:ring-offset-1 transition-colors';
        break;
      default:
        baseClasses =
          'w-full rounded-md text-base border border-grey-400 px-2.5 py-3 text-grey-500 text-base focus:outline-none transition-colors';
        break;
    }

    const variantClasses: Record<Variant, string> = {
      default:
        isRadio || isCheckbox
          ? 'bg-white'
          : 'bg-white focus:ring-2 focus:ring-grey-400 focus:ring-offset-0',
      outline:
        isRadio || isCheckbox
          ? 'border-2 border-primary-500 bg-transparent'
          : 'border-primary-500 bg-transparent focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
    };

    const sizeClasses: Record<Size, string> = {
      default: isRadio || isCheckbox ? 'h-6 w-6' : 'h-14',
      sm: isRadio || isCheckbox ? 'h-3 w-3' : 'h-8',
      lg: isRadio || isCheckbox ? 'h-5 w-5' : 'h-14',
    };

    return cn(
      baseClasses,
      variantClasses[this.variant],
      sizeClasses[this.size],
      this.disabled
        ? 'cursor-not-allowed bg-primary-50 text-primary-100'
        : null,
      this.inputClass
    );
  }

  // Implement ControlValueAccessor interface
  writeValue(value: string | number | boolean): void {
    this.value = value;
    console.log('writeValue called with:', value); // Add debugging
  }

  registerOnChange(fn: (value: string | number | boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    switch (this.type) {
      case 'checkbox':
        this.value = inputElement.checked;
        break;
      case 'radio':
        if (inputElement.checked) {
          this.value = inputElement.value;
        }
        break;
      case 'number':
        this.value = inputElement.valueAsNumber;
        break;
      default:
        this.value = inputElement.value;
    }

    if (this.type !== 'radio' || inputElement.checked) {
      this.onChange(this.value!);
      this.inputChange.emit(this.value);
    }
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onBlur(event: Event) {
    this.onTouched();
    this.blur.emit(event);
  }
}
