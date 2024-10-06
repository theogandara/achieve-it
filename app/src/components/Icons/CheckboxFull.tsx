import { Path, Rect, Svg } from 'react-native-svg';

export function CheckboxFull() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Rect
        x={1.6}
        y={1.6}
        width={28.8}
        height={28.8}
        rx={1.6}
        fill="#fff"
        stroke="#fff"
        strokeWidth={3.2}
      />
      <Path
        d="M28.565 9.563l-16 16a1.5 1.5 0 01-2.125 0l-7-7a1.502 1.502 0 112.125-2.125l5.939 5.938L26.443 7.44a1.503 1.503 0 012.125 2.125l-.003-.002z"
        fill="#000"
      />
    </Svg>
  );
}
