export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link';

export type Size = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ValueType = string | number | boolean | undefined;

export type InputSize = Extract<Size, 'default' | 'sm' | 'lg'>;

export type InputVariant = 'default' | 'outline';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'checkbox'
  | 'radio';
