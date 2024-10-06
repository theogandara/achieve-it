import { useState } from 'react';
import { Habit } from '../../pages/QuitHabits/QuitHabits';
import { Text } from '../Text';
import * as S from './styles';

type QuitHabitCardProps = {
  habit: Habit;
  onPress: () => void;
};

export function QuitHabitCard({ habit, onPress }: QuitHabitCardProps) {
  function handleTimeUntilNow(date: string) {
    const now = new Date().getTime();
    const lastTime = new Date(date).getTime();
    const diff = now - lastTime;

    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    const diffDaysString = diffDays > 0 ? `${diffDays}d ` : '';
    const diffHoursString = diffHours > 0 ? `${diffHours}h ` : '';
    const diffMinutesString = diffMinutes > 0 ? `${diffMinutes}m ` : '';
    const diffSecondsString = diffSeconds > 0 ? `${diffSeconds}s ` : '';

    return `${diffDaysString}${diffHoursString}${diffMinutesString}${diffSecondsString}`;
  }

  const [timeUntilNow, setTimeUntilNow] = useState(
    handleTimeUntilNow(habit.lastTime)
  );

  setTimeout(() => {
    setTimeUntilNow(handleTimeUntilNow(habit.lastTime));
  }, 1000);

  return (
    <S.Item onPress={onPress}>
      <S.ItemList>
        <S.HeaderCard>
          <Text weight="700" size={22} color="#fff">
            💀
          </Text>
          <Text weight="700" size={22} color="#fff">
            {habit.title}
          </Text>
        </S.HeaderCard>

        <Text weight="600" size={16} color="#9A999E">
          Abstinence time
        </Text>

        <Text weight="700" size={22} color="#fff">
          {timeUntilNow}
        </Text>
      </S.ItemList>
    </S.Item>
  );
}
