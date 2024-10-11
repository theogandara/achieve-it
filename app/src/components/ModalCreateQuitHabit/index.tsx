import { FlatList, Modal, TextInput, View } from 'react-native';
import { Button } from '../Button/button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';
import { useRef, useState } from 'react';
import { Input } from '../Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../utils/api';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

type ModalCreateQuitHabitProps = {
  isVisible: boolean;
  onClose: () => void;
};

type Habit = {
  id: number;
  title: string;
  emoji: string;
};

export function ModalCreateQuitHabit({
  isVisible,
  onClose,
}: ModalCreateQuitHabitProps) {
  if (!isVisible) return null;

  function handleClose() {
    onClose();
  }

  const [isCustomHabit, setIsCustomHabit] = useState(false);
  const [customHabit, setCustomHabit] = useState('');
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  function handleSelect(habit: Habit) {
    setSelectedHabit(habit);
    if (habit.id === 0) {
      setIsCustomHabit(true);
    }
  }

  const defaultHabits = [
    {
      id: 0,
      title: 'Custom',
      emoji: '✨',
    },
    {
      id: 1,
      title: 'Instagram',
      emoji: '📱',
    },
    {
      id: 2,
      title: 'Drugs',
      emoji: '💊',
    },
    {
      id: 3,
      title: 'Alcohol',
      emoji: '🍺',
    },
    {
      id: 4,
      title: 'Cigarettes',
      emoji: '🚬',
    },
    {
      id: 5,
      title: 'Sweets',
      emoji: '🍭',
    },
    {
      id: 6,
      title: 'Fast food',
      emoji: '🍔',
    },
    {
      id: 8,
      title: 'Coffee',
      emoji: '☕️',
    },
  ];

  const [date, setDate] = useState(new Date(new Date().setSeconds(0, 0)));

  async function handleCreateHabit() {
    const habit = {
      name: isCustomHabit ? customHabit : selectedHabit?.title,
      icon: isCustomHabit ? emoji : selectedHabit?.emoji,
      lastTime: date.toISOString(),
    };

    try {
      await api.post('/quit-habits', habit);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const inputTextRef = useRef<TextInput>(null);
  const [emoji, setEmoji] = useState('💀');

  const [datePickerAndroidIsOpen, setDatePickerAndroidIsOpen] = useState(false);
  const [timePickerAndroidIsOpen, setTimePickerAndroidIsOpen] = useState(false);

  function handleClickAndroid() {
    if (!isAndroid) return;

    return setDatePickerAndroidIsOpen(true);
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.ModalBody>
        <S.CloseButton onPress={handleClose}>
          <Close color="#fff" />
        </S.CloseButton>

        <S.Header>
          <Text size={24} weight="600" color="#fff">
            Create quit habit
          </Text>
        </S.Header>

        {!selectedHabit ? (
          <>
            <Text color="#d5d5d5" style={{ marginTop: 12 }}>
              What habit do you want to quit?
            </Text>
            <FlatList
              style={{
                marginTop: 24,
              }}
              data={defaultHabits}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <S.HabitItem onPress={() => handleSelect(item)}>
                  <Text color="#fff">{item.emoji}</Text>
                  <Text
                    size={18}
                    color="#fff"
                    weight="600"
                    style={{ marginLeft: 12 }}
                  >
                    {item.title}
                  </Text>
                </S.HabitItem>
              )}
            />
          </>
        ) : (
          <View
            style={{
              marginTop: 24,
            }}
          >
            {isCustomHabit && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="Custom habit"
                    value={customHabit}
                    onChangeText={setCustomHabit}
                  />
                </View>

                <S.HabitItem
                  style={{ padding: 16, marginTop: 8 }}
                  onPress={() => {
                    inputTextRef.current?.focus();
                  }}
                >
                  <TextInput
                    ref={inputTextRef}
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      textAlign: 'center',
                      width: 24,
                    }}
                    value={emoji}
                    onKeyPress={(e) => {
                      if (e.nativeEvent.key === 'Backspace') {
                        setEmoji('');
                        return;
                      }
                      setEmoji(e.nativeEvent.key);
                    }}
                  />
                </S.HabitItem>
              </View>
            )}

            <Text size={20} weight="600" color="#fff">
              When was the last time you did it?
            </Text>

            <S.HabitItem style={{ marginTop: 12 }}>
              <Text
                size={22}
                color="#fff"
                weight="600"
                style={{ marginLeft: 12 }}
                onPress={handleClickAndroid}
              >
                {date.toLocaleString()}
              </Text>
            </S.HabitItem>

            {isAndroid ? (
              <>
                {datePickerAndroidIsOpen && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    textColor="#fff"
                    display="spinner"
                    style={{
                      height: 150,
                    }}
                    onTouchCancel={() => setDatePickerAndroidIsOpen(false)}
                    onChange={(_, selectedDate) => {
                      if (selectedDate) {
                        setDate(selectedDate);
                        setTimePickerAndroidIsOpen(true);
                      }
                      setDatePickerAndroidIsOpen(false);
                    }}
                  />
                )}

                {timePickerAndroidIsOpen && (
                  <DateTimePicker
                    value={date}
                    mode="time"
                    textColor="#fff"
                    display="spinner"
                    style={{
                      height: 150,
                    }}
                    onTouchCancel={() => setTimePickerAndroidIsOpen(false)}
                    onChange={(_, selectedDate) => {
                      if (selectedDate) {
                        setDate(selectedDate);
                      }
                      setTimePickerAndroidIsOpen(false);
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <DateTimePicker
                  value={date}
                  mode="date"
                  textColor="#fff"
                  display="spinner"
                  style={{
                    height: 150,
                  }}
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />

                <DateTimePicker
                  value={date}
                  mode="time"
                  textColor="#fff"
                  display="spinner"
                  style={{
                    height: 150,
                  }}
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              </>
            )}
          </View>
        )}
      </S.ModalBody>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleCreateHabit}>Create habit</Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
}
