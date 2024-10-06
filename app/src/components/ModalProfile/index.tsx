import { FlatList, Modal, TouchableOpacity } from 'react-native';
import { Button } from '../Button/button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { Trash } from '../Icons/Trash';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Main';
import { api } from '../../utils/api';

type ModalProfileProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function ModalProfile({
  isVisible,
  onClose,
}: ModalProfileProps) {
  if (!isVisible) return null;

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    return SecureStore.getItemAsync('token');
  };

  useEffect(() => {
    getToken().then((token) => {
      return setToken(token || '');
    });
  }, []);

  const [data, setData] = useState<string[]>([]);
  const [templateId, setTemplateId] = useState('');

  async function loadData() {
    if (!token) return;
    try {
      setLoading(true);
      const res = await api.get('/daily-templates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newData = res.data[0].items.map(
        (item: { name: string }) => item.name
      );
      setTemplateId(res.data[0]._id);
      setData(newData);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [token]);

  async function updateData(newData: string[]) {
    if (!token) return;
    setNewItem('');
    setData(newData);
    try {
      setLoading(true);
      await api.put(`/daily-templates/${templateId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        items: newData.map((name) => ({ name })),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  async function handleSubmit() {
    updateData(data);
  }

  const [newItem, setNewItem] = useState('');
  function handleChange(value: string) {
    setNewItem(value);
  }

  function handleAddItem() {
    if (newItem.trim().length === 0) return;
    const newData = [...data, newItem];
    setData(newData);
    setNewItem('');
  }

  function handleDeleteItem(vl: string) {
    const newData = data.filter((item) => item !== vl);
    setData(newData);
  }

  const navitation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handleLogout() {
    SecureStore.deleteItemAsync('token');
    return navitation.navigate('Login');
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.ModalBody>
        <S.CloseButton onPress={onClose}>
          <Close color="#fff" />
        </S.CloseButton>

        <S.Header style={{ maxWidth: '80%' }}>
          <Text size={24} weight="600" color="#fff">
            Profile
          </Text>
        </S.Header>

        <S.Container>
          <Text weight="600" color="#cbcbcb">
            habits to keep up every day
          </Text>

          <S.Input
            value={newItem}
            onSubmitEditing={handleAddItem}
            onChangeText={handleChange}
            placeholder="Insert new..."
            keyboardType="default"
            placeholderTextColor="#ffffffcc"
          />

          {data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <S.ItemList key={item}>
                  <Text weight="700" size={22} color="#fff">
                    {item}
                  </Text>

                  <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                    <Trash />
                  </TouchableOpacity>
                </S.ItemList>
              )}
            />
          ) : (
            <Text weight="700" size={16} color="#fff" style={{ marginTop: 24 }}>
              Insert a new habit
            </Text>
          )}
        </S.Container>
      </S.ModalBody>

      <S.Footer>
        <S.FooterContainer>
          <Button onPress={handleSubmit}>Update</Button>
          <S.Button onPress={handleLogout}>
            <Text weight="600" color="#fff">
              Logout
            </Text>
          </S.Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
}
