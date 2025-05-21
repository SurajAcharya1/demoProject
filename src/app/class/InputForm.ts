export interface InputForm {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  control: string;
  type:
    'color' |
    'password' |
    'text' |
    'button' |
    'hidden' |
    'number' |
    'checkbox' |
    'date' |
    'datetime-local' |
    'email' |
    'file' |
    'image' |
    'month' |
    'radio' |
    'range' |
    'reset' |
    'search' |
    'submit' |
    'tel' |
    'time' |
    'week';
}
