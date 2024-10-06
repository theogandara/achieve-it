import { SafeArea } from '../../components/SafeArea';
import { Text } from '../../components/Text';
import * as S from './styles';
import { useState } from 'react';
import { Button } from '../../components/Button/button';
import CloseButton from '../../components/CloseButton';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { ModalCreateQuitHabit } from '../../components/ModalCreateQuitHabit';
import { ModalEditQuitHabit } from '../../components/ModalEditQuitHabit';
import { QuitHabitCard } from '../../components/QuitHabitCard';

export interface Habit {
  id: number;
  title: string;
  lastTime: string;
}

export default function QuitHabits() {
  const [data, setData] = useState<Habit[]>([
    {
      id: 1,
      title: 'Example 1',
      lastTime: '2024-09-16T14:30:00',
    },
    {
      id: 2,
      title: 'Example 1',
      lastTime: '2024-10-5T14:30:00',
    },
  ]);

  const navigation = useNavigation();

  const [modalCreateQuitHabitVisible, setModalCreateQuitHabitVisible] =
    useState(false);

  const [modalEditQuitHabitVisible, setModalEditQuitHabitVisible] =
    useState(false);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSubmit() {
    setModalCreateQuitHabitVisible(true);
  }

  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  function handleEdit(item: Habit) {
    if (!item) return;
    setSelectedHabit(item);
    setModalEditQuitHabitVisible(true);
  }

  return (
    <>
      <ModalEditQuitHabit
        isVisible={modalEditQuitHabitVisible}
        onClose={() => setModalEditQuitHabitVisible(false)}
        habit={selectedHabit}
      />

      <ModalCreateQuitHabit
        isVisible={modalCreateQuitHabitVisible}
        onClose={() => setModalCreateQuitHabitVisible(false)}
      />

      <SafeArea>
        <S.Body>
          <S.Header>
            <CloseButton onClose={handleGoBack} />
            <Text weight="700" size={28} color="#fff">
              Quit Habits
            </Text>
          </S.Header>

          <S.Container>
            {data.length > 0 ? (
              <FlatList
                data={data}
                style={{ width: '100%', maxHeight: '100%' }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <QuitHabitCard
                    habit={item}
                    onPress={() => handleEdit(item)}
                  />
                )}
              />
            ) : (
              <Text weight="700" size={22} color="#fff">
                No habits to show
              </Text>
            )}
          </S.Container>
        </S.Body>
      </SafeArea>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleSubmit}>Register new</Button>
        </S.FooterContainer>
      </S.Footer>
    </>
  );
}
