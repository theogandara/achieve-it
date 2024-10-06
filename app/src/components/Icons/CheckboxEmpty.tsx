import { Rect, Svg } from 'react-native-svg';

export function CheckboxEmpty() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect
        x={1.6}
        y={1.6}
        width={28.8}
        height={28.8}
        rx={1.6}
        stroke="#fff"
        strokeWidth={3.2}
      />
    </Svg>
  );
}
