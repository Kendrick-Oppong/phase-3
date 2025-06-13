import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  booleanAttribute,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';
import { cn } from '../../lib/classnames';
import {
  ButtonType,
  LinkTarget,
  Size,
  ButtonVariant,
} from '../../interfaces/button.interface';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnChanges {
  @Input() variant!: ButtonVariant;
  @Input() size: Size = 'default';
  @Input() routerLink?: string | string[] | UrlTree | null;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute, alias: 'loading' }) isLoading = false;
  @Input() type: ButtonType = 'button';
  @Input() href?: string;
  @Input() target: LinkTarget = '_blank';
  @Input() ariaLabel?: string;
  @Input() label?: string;
  @Input() btnClass? = '';

  @Output() btnClick = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();

  ngOnChanges() {
    if (this.href && this.routerLink) {
      console.warn(
        'Both `href` and `routerLink` are provided. `routerLink` will take precedence for internal navigation.'
      );
    }
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isDisabledOrLoading && !(this.href || this.routerLink)) {
      event.preventDefault();
      return;
    }
    this.btnClick.emit();
  }

  get isDisabledOrLoading(): boolean {
    return this.disabled || this.isLoading;
  }

  get computedClasses(): string {
    const baseClasses =
      'inline-flex px-2.5 gap-3 py-3 items-center justify-center rounded-lg text-base font-normal transition-colors focus:outline-none';
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-primary-500 text-base-white-50 hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
      secondary:
        'border-2 border-grey-400 text-grey-400 focus:ring-0 focus:ring-grey-400 focus:ring-offset-0',
      destructive:
        'bg-red-600 text-grey-50 hover:bg-red-500 focus:ring-2 focus:ring-red-600 focus:ring-offset-1',
      outline:
        'border-2 border-primary-500 text-primary-500 focus:ring-0 focus:ring-offset-0 bg-white',
      ghost: 'hover:bg-grey-50 hover:text-grey-900',
      link: 'text-primary-500 underline-offset-4 hover:underline !p-0',
    };
    const sizeClasses: Record<Size, string> = {
      default: 'h-10 px-2.5 py-3',
      sm: 'h-9 px-3',
      lg: 'h-12',
      xl: 'h-[55px]',
      icon: 'h-10 w-10 focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
    };

    return cn(
      baseClasses,
      variantClasses[this.variant],
      this.variant !== 'link' ? sizeClasses[this.size] : sizeClasses.default,
      this.disabled || (this.isLoading && !(this.href || this.routerLink))
        ? 'cursor-not-allowed bg-primary-50 text-primary-100'
        : null,
      this.btnClass
    );
  }

  onClick() {
    if (this.isDisabledOrLoading) {
      return;
    }
    this.btnClick.emit();
  }

  onFocus() {
    if (this.isDisabledOrLoading) {
      return;
    }
    this.focus.emit();
  }

  onBlur() {
    if (this.isDisabledOrLoading) {
      return;
    }
    this.blur.emit();
  }
}
