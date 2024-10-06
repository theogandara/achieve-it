import { CheckboxEmpty } from '../Icons/CheckboxEmpty';
import { CheckboxFull } from '../Icons/CheckboxFull';

type CheckboxProps = {
  checked?: boolean;
};

export default function Checkbox({ checked }: CheckboxProps) {
  return checked ? <CheckboxFull /> : <CheckboxEmpty />;
}
