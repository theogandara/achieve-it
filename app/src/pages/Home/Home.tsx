import { SafeArea } from '../../components/SafeArea';
import { Text } from '../../components/Text';
import Checkbox from '../../components/Checkbox';
import * as S from './styles';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ButtonSecondary } from '../../components/ButtonSecondary/buttonSecondary';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Main';
import ModalProfile from '../../components/ModalProfile';
import * as SecureStore from 'expo-secure-store';
import { api } from '../../utils/api';
import { jwtDecode } from 'jwt-decode';

type Item = {
  _id: string;
  name: string;
  done: boolean;
};

export default function Home() {
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
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

  const [data, setData] = useState<Item[]>([]);
  const [reportId, setReportId] = useState('');

  async function updateData(newData: Item[]) {
    if (!token) return;
    setData(newData);
    try {
      setLoading(true);
      await api.put(`/daily-reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        items: newData,
      });
    } catch (err) {
      console.error({ err });
    } finally {
      setLoading(false);
    }
  }

  async function loadData() {
    if (!token) return;
    try {
      setLoading(true);
      const res = await api.get('daily-reports/today', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.items);
      setReportId(res.data.id);
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [token, modalProfileVisible]);

  function handleCheck(id: string) {
    const newData = data.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });

    updateData(newData);
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handleRedirect(path: 'MyProjects' | 'QuitHabits') {
    navigation.navigate(path);
  }
  useEffect(() => {
    const verifyToken = jwtDecode(token);
    if (!verifyToken) {
      SecureStore.deleteItemAsync('token');
      navigation.navigate('Login');
    }
  }, [token]);

  return (
    <>
      <ModalProfile
        isVisible={modalProfileVisible}
        onClose={() => {
          setModalProfileVisible(false);
        }}
      />

      <SafeArea>
        <S.Profile onPress={() => setModalProfileVisible(true)}>
          <Text size={28} weight="600">
            TG
          </Text>
        </S.Profile>

        <S.Body>
          <S.Header>
            <Text size={28} weight="700" color="#fff">
              Today
            </Text>
          </S.Header>

          <S.Container>
            <Text weight="700" size={28} color="#fff">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item?.name?.toString()}
              renderItem={({ item }) => (
                <S.ItemList onPress={() => handleCheck(item._id)}>
                  <Checkbox checked={item.done} />

                  <Text weight="700" size={22} color="#fff">
                    {item.name}
                  </Text>
                </S.ItemList>
              )}
            />
          </S.Container>
        </S.Body>
      </SafeArea>

      <S.Footer>
        <S.FooterContainer>
          <View
            style={{
              flex: 1,
            }}
          >
            <ButtonSecondary onPress={() => handleRedirect('MyProjects')}>
              Lists
            </ButtonSecondary>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <ButtonSecondary onPress={() => handleRedirect('QuitHabits')}>
              Habits
            </ButtonSecondary>
          </View>
        </S.FooterContainer>
      </S.Footer>
    </>
  );
}
