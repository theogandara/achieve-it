import { Modal, TextInput, View } from 'react-native';
import { Button } from '../Button/button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';
import { useRef, useState } from 'react';
import { Input } from '../Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Habit } from '../../pages/QuitHabits/QuitHabits';
import { api } from '../../utils/api';
import { Platform } from 'react-native';
import { Trash } from '../Icons/Trash';

const isAndroid = Platform.OS === 'android';

type ModalEditQuitHabitProps = {
  isVisible: boolean;
  onClose: () => void;
  habit: Habit | null;
};

export function ModalEditQuitHabit({
  isVisible,
  onClose,
  habit,
}: ModalEditQuitHabitProps) {
  if (!isVisible) return null;

  function handleClose() {
    onClose();
  }

  const [customHabit, setCustomHabit] = useState(habit?.name || '');
  const [date, setDate] = useState(new Date(habit?.lastTime || Date.now()));
  const [emoji, setEmoji] = useState(habit?.icon || '💀');

  function handleReset() {
    const newDate = new Date();
    setDate(newDate);
  }

  async function handleCreateHabit() {
    const newHabit = {
      _id: habit?._id,
      name: customHabit,
      lastTime: date.toISOString(),
      icon: emoji,
    };

    try {
      await api.put(`/quit-habits/${newHabit._id}`, newHabit);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/quit-habits/${habit?._id}`);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  }

  const inputTextRef = useRef<TextInput>(null);

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
            Edit
          </Text>
        </S.Header>

        <View
          style={{
            marginTop: 24,
          }}
        >
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

          <S.HabitItem onPress={handleClickAndroid} style={{ marginTop: 12 }}>
            <Text
              size={22}
              color="#fff"
              weight="600"
              style={{ marginLeft: 12 }}
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
                    setDatePickerAndroidIsOpen(false);
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
      </S.ModalBody>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleCreateHabit}>Update habit</Button>

          <S.ButtonsContainer>
            <S.Button onPress={handleReset}>
              <Text weight="600" color="#fff">
                Reset
              </Text>
            </S.Button>

            <S.Button onPress={handleDelete}>
              <Text weight="600" color="#fff">
                <Trash />
              </Text>
            </S.Button>
          </S.ButtonsContainer>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
}
