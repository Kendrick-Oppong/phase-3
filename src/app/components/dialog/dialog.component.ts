import { Component, HostListener, input, model } from '@angular/core'

import { trigger, state, style, transition, animate } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { cn } from '../../lib/classnames'

@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  imports: [CommonModule],
  animations: [
    trigger('dialogAnimation', [
      state('open', style({ opacity: 1, transform: 'scale(1)' })),
      state('closed', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('closed => open', [animate('150ms ease-out')]),
      transition('open => closed', [animate('150ms ease-in')]),
    ]),
  ],
})
export class DialogComponent {
  public isOpen = model(false)
  public className = input('')

  @HostListener('document:keydown.escape', ['$event'])
  public onEscape(): void {
    this.isOpen.update((prevState) => !prevState)
  }

  public get computedClasses(): string {
    const baseClasses =
      'fixed inset-0 z-[100] bg-black/60  p-4'
    return cn(baseClasses, this.className())
  }
}
