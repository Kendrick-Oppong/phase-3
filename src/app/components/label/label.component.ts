import {
  Component,
  Input,
  booleanAttribute,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/classnames';

type Size = 'default' | 'sm' | 'lg';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [attr.for]="fieldId"
      [for]="fieldId"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [class]="computedClasses"
    >
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  @Input() size: Size = 'default';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({required:true}) fieldId?: string;
  @Input() labelClass? = '';

  get computedClasses(): string {
    const baseClasses =
      'inline-block text-grey-700 text-base font-normal leading-5 mb-1';
    const sizeClasses: Record<Size, string> = {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    };

    return cn(
      baseClasses,
      sizeClasses[this.size],
      this.disabled ? 'cursor-not-allowed opacity-50' : null,
      this.labelClass
    );
  }
}
