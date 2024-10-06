import { SafeArea } from '../../components/SafeArea';
import { Text } from '../../components/Text';
import * as S from './styles';
import { useState } from 'react';
import { Button } from '../../components/Button/button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import CloseButton from '../../components/CloseButton';
import { RootStackParamList } from '../../Main';
import { FlatList, View } from 'react-native';

type Project = {
  id: number;
  title: string;
};

export default function MyProjects() {
  const [data, setData] = useState<Project[]>([
    {
      id: 1,
      title: 'Example 1',
    },
  ]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleClick() {
    navigation.navigate('MyList');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  const [newItem, setNewItem] = useState('');

  function handleAddItem() {
    if (!newItem) return;
    const newProject = {
      id: data.length + 1,
      title: newItem,
    };

    setData([...data, newProject]);
    setNewItem('');
  }

  function handleChange(value: string) {
    setNewItem(value);
  }

  return (
    <>
      <SafeArea>
        <S.Body>
          <S.Header>
            <CloseButton onClose={handleGoBack} />
            <Text weight="700" size={28} color="#fff">
              Projects
            </Text>
          </S.Header>

          <S.Container>
            <S.AddProject>
              <View
                style={{
                  flex: 1,
                }}
              >
                <S.Input
                  value={newItem}
                  onSubmitEditing={handleAddItem}
                  onChangeText={handleChange}
                  placeholder="Insert new..."
                  keyboardType="default"
                  placeholderTextColor="#ffffffcc"
                />
              </View>
              <Button onPress={handleAddItem}>New</Button>
            </S.AddProject>

            {data.length > 0 ? (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <S.Item key={item.id} onPress={() => handleClick()}>
                    <S.ItemList>
                      <Text weight="700" size={22} color="#fff">
                        {item.title}
                      </Text>
                    </S.ItemList>
                  </S.Item>
                )}
              />
            ) : (
              <Text weight="700" size={22} color="#fff">
                No projects
              </Text>
            )}
          </S.Container>
        </S.Body>
      </SafeArea>
    </>
  );
}
