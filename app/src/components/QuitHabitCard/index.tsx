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
    const now = new Date();
    const lastTime = new Date(date);

    let diffYears = now.getFullYear() - lastTime.getFullYear();
    let diffMonths = now.getMonth() - lastTime.getMonth();
    let diffDays = now.getDate() - lastTime.getDate();
    let diffHours = now.getHours() - lastTime.getHours();
    let diffMinutes = now.getMinutes() - lastTime.getMinutes();
    let diffSeconds = now.getSeconds() - lastTime.getSeconds();

    if (diffSeconds < 0) {
      diffSeconds += 60;
      diffMinutes--;
    }

    if (diffMinutes < 0) {
      diffMinutes += 60;
      diffHours--;
    }

    if (diffHours < 0) {
      diffHours += 24;
      diffDays--;
    }

    if (diffDays < 0) {
      const daysInLastMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      ).getDate();
      diffDays += daysInLastMonth;
      diffMonths--;
    }

    if (diffMonths < 0) {
      diffMonths += 12;
      diffYears--;
    }

    const diffYearsString = diffYears > 0 ? `${diffYears}y ` : '';
    const diffMonthsString = diffMonths > 0 ? `${diffMonths}m ` : '';
    const diffDaysString = diffDays > 0 ? `${diffDays}d ` : '';
    const diffHoursString = diffHours > 0 ? `${diffHours}h ` : '';
    const diffMinutesString = diffMinutes > 0 ? `${diffMinutes}m ` : '';
    const diffSecondsString = diffSeconds > 0 ? `${diffSeconds}s ` : '';

    return `${diffYearsString}${diffMonthsString}${diffDaysString}${diffHoursString}${diffMinutesString}${diffSecondsString}`.trim();
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
            {habit.icon}
          </Text>
          <Text weight="700" size={22} color="#fff">
            {habit.name}
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
