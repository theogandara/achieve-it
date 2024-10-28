import { useEffect, useState } from "react";
import * as S from "./style";
import { api } from "../../../utils/api";
import Checkbox from "../../../components/Checkbox/Checkbox";

type Item = {
  _id: string;
  name: string;
  done: boolean;
};

export default function MobileContent() {
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
      {/* <S.Profile>
        <button>
          <h2>AI</h2>
        </button>
      </S.Profile> */}

      <S.Title>Today</S.Title>

      <S.CardReport>
        <S.CardReportHeader>
          <h2>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h2>
        </S.CardReportHeader>

        {data.map((item: Item) => (
          <Checkbox
            key={item._id}
            id={item._id}
            done={item.done}
            name={item.name}
            onChange={handleCheck}
          />
        ))}
      </S.CardReport>

      {/* <S.Footer>
        <button className="btn-tertiary">Lists</button>
        <button className="btn-tertiary">Habits</button>
      </S.Footer> */}
    </S.Screen>
  );
}
