import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import * as S from "./home.style";

type Item = {
  _id: string;
  name: string;
  done: boolean;
};

export default function Home() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<Item[]>([]);
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  async function updateData(newData: Item[]) {
    if (!token) return;
    setData(newData);
    try {
      await api.put(
        `/daily-reports/${reportId}`,
        {
          items: newData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error({ err });
    } finally {
    }
  }

  async function loadData() {
    if (!token) return;
    try {
      const res = await api.get("daily-reports/today", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.items);
      setReportId(res.data.id);
    } catch {
      setData([]);
    }
  }

  useEffect(() => {
    loadData();
  }, [token]);

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

  return (
    <S.Screen>
      <S.Profile>
        <button>
          <h2>AI</h2>
        </button>
      </S.Profile>

      <S.Title>Today</S.Title>

      <S.CardReport>
        <S.CardReportHeader>
          <h2>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </S.CardReportHeader>

        {data.map((item: Item) => (
          <S.CardReportItem
            key={item._id}
            onClick={() => handleCheck(item._id)}
          >
            <input
              type="checkbox"
              defaultChecked={item.done}
              checked={item.done}
            />
            <p>{item.name}</p>
          </S.CardReportItem>
        ))}
      </S.CardReport>

      <S.Footer>
        <button className="btn-tertiary">Lists</button>
        <button className="btn-tertiary">Habits</button>
      </S.Footer>
    </S.Screen>
  );
}
