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
import {
  InputSize,
  InputType,
  InputVariant,
  ValueType,
} from '../../interfaces/button.interface';

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
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() value: ValueType = '';
  @Input() ariaLabel?: string;
  @Input() inputClass = '';
  @Input() fieldId?: string;
  @Input() name = '';
  @Input() showError = false;

  @Output() inputChange = new EventEmitter<ValueType>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();

  private onChange: (value: string | number | boolean) => void = () => {};
  private onTouched: () => void = () => {};

  selectedValue: ValueType = undefined;

  @HostListener('keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
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

    const variantClasses: Record<InputVariant, string> = {
      default:
        isRadio || isCheckbox
          ? 'bg-white'
          : 'bg-white focus:ring-2 focus:ring-grey-400 focus:ring-offset-0',
      outline:
        isRadio || isCheckbox
          ? 'border-2 border-primary-500 bg-transparent'
          : 'border-primary-500 bg-transparent focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
    };

    const sizeClasses: Record<InputSize, string> = {
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
      this.showError
        ? 'border-2 border-red-500 focus:ring-red-500 focus:ring-1  focus:ring-offset-0'
        : null,
      this.inputClass
    );
  }

  writeValue(value: string | number | boolean): void {
    this.selectedValue = value;
    if (this.type !== 'radio' && this.type !== 'checkbox') {
      this.value = value;
    }
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

  isChecked(): boolean | null {
    switch (this.type) {
      case 'checkbox':
        return !!this.selectedValue;
      case 'radio':
        return this.selectedValue === this.value;
      default:
        return null;
    }
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    switch (this.type) {
      case 'checkbox':
        this.selectedValue = inputElement.checked;
        this.onChange(this.selectedValue);
        this.inputChange.emit(this.selectedValue);
        break;

      case 'radio':
        if (inputElement.checked) {
          this.selectedValue = this.value;
          this.onChange(this.value!);
          this.inputChange.emit(this.value);
        }
        break;

      default:
        this.selectedValue = inputElement.value;
        this.onChange(this.selectedValue);
        this.inputChange.emit(this.selectedValue);
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
