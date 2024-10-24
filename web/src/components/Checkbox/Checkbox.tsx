import CheckboxEmpty from "../icons/checkbox/empty";
import CheckboxFull from "../icons/checkbox/full";
import * as S from "./checkbox.styles";

type CheckboxProps = {
  id: string;
  done: boolean;
  name: string;
  onChange: (id: string) => void;
};

export default function Checkbox({ id, done, onChange, name }: CheckboxProps) {
  return (
    <div>
      <S.CardReportItem key={id} onClick={() => onChange(id)}>
        {done ? <CheckboxFull /> : <CheckboxEmpty />}
        <p className="text-medium">{name}</p>
      </S.CardReportItem>
    </div>
  );
}
