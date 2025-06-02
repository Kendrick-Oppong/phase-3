import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit btnClick when button is clicked and not disabled/loading', () => {
    jest.spyOn(component.btnClick, 'emit');
    component.disabled = false;
    component.isLoading = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});
    expect(component.btnClick.emit).toHaveBeenCalled();
  });

  it('should not emit btnClick when disabled', () => {
    jest.spyOn(component.btnClick, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});
    expect(component.btnClick.emit).not.toHaveBeenCalled();
  });

  it('should not emit btnClick when loading', () => {
    jest.spyOn(component.btnClick, 'emit');
    component.isLoading = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', {});
    expect(component.btnClick.emit).not.toHaveBeenCalled();
  });

  it('should apply computedClasses to button', () => {
    component.variant = 'primary';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.className).toContain('bg-primary-500');
  });

  it('should emit focus and blur events', () => {
    jest.spyOn(component.focus, 'emit');
    jest.spyOn(component.blur, 'emit');
    component.disabled = false;
    component.isLoading = false;
    fixture.detectChanges();

    component.onFocus();
    expect(component.focus.emit).toHaveBeenCalled();

    component.onBlur();
    expect(component.blur.emit).toHaveBeenCalled();
  });

  it('should not emit focus or blur when disabled or loading', () => {
    jest.spyOn(component.focus, 'emit');
    jest.spyOn(component.blur, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    component.onFocus();
    component.onBlur();
    expect(component.focus.emit).not.toHaveBeenCalled();
    expect(component.blur.emit).not.toHaveBeenCalled();
  });

  it('should warn if both href and routerLink are set', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    component.href = 'http://example.com';
    component.routerLink = '/home';
    component.ngOnChanges();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Both `href` and `routerLink` are provided')
    );
  });
});
