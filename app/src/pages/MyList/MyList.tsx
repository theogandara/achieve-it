import { SafeArea } from '../../components/SafeArea';
import { Text } from '../../components/Text';
import Checkbox from '../../components/Checkbox';
import * as S from './styles';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Main';
import CloseButton from '../../components/CloseButton';
import { FlatList } from 'react-native';

export default function MyList() {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Example 1',
      checked: true,
    },
  ]);

  const [newItem, setNewItem] = useState('');

  function handleChange(value: string) {
    setNewItem(value);
  }

  function handleAddItem() {
    const newTask = {
      id: data.length + 1,
      title: newItem,
      checked: false,
    };

    setData([...data, newTask]);
    setNewItem('');
  }

  function handleCheck(id: number) {
    const newData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setData(newData);
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <>
      <SafeArea>
        <S.Body>
          <S.Header>
            <CloseButton onClose={handleGoBack} />
            <Text weight="700" size={28} color="#fff">
              Project 1
            </Text>
          </S.Header>

          <S.Container>
            <S.ButtonContainer>
              <S.Input
                value={newItem}
                onSubmitEditing={handleAddItem}
                onChangeText={handleChange}
                placeholder="Insert new..."
                keyboardType="default"
                placeholderTextColor="#ffffffcc"
              />
            </S.ButtonContainer>

            {data.length > 0 ? (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <S.ItemList
                    key={item.id}
                    onPress={() => handleCheck(item.id)}
                  >
                    <Checkbox checked={item.checked} />
                    <Text weight="700" size={22} color="#fff">
                      {item.title}
                    </Text>
                  </S.ItemList>
                )}
              />
            ) : (
              <Text weight="700" size={22} color="#fff">
                No items
              </Text>
            )}
          </S.Container>
        </S.Body>
      </SafeArea>

      <S.Footer>
        <S.FooterContainer>
          <S.Button onPress={handleGoBack}>
            <Text weight="600" color="#fff">
              Remove Project
            </Text>
          </S.Button>
        </S.FooterContainer>
      </S.Footer>
    </>
  );
}
