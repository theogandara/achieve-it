import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import "./home.css";

type Item = {
  _id: string;
  name: string;
  done: boolean;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
      setLoading(false);
    }
  }

  async function loadData() {
    if (!token) return;
    try {
      setLoading(true);
      const res = await api.get("daily-reports/today", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.items);
      setReportId(res.data.id);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
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
    <div className="screen">
      {loading && <div className="loading">Loading...</div>}
      <div className="profile">
        <button>
          <h2>AI</h2>
        </button>
      </div>

      <h2 className="title">Today</h2>

      <div className="card-report">
        <header className="card-report-header">
          <h2>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </header>

        {data.map((item: Item) => (
          <button
            key={item._id}
            className="card-report-item"
            onClick={() => handleCheck(item._id)}
          >
            <input
              type="checkbox"
              defaultChecked={item.done}
              checked={item.done}
            />
            <p>{item.name}</p>
          </button>
        ))}
      </div>

      <div className="footer">
        <button className="btn-tertiary">Lists</button>
        <button className="btn-tertiary">Habits</button>
      </div>
    </div>
  );
}
