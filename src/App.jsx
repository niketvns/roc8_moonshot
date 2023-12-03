import { useEffect, useState } from "react";
import "./App.css";
import { BarChart } from "./components/BarChart";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://data-visualization-api.ashug99578.repl.co/data",
        {
          method: "GET",
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTZjMWY2MjgzMjgzOTQwMWI0ZDcyNzEiLCJpYXQiOjE3MDE1ODUwMzYsImV4cCI6MTcwNDE3NzAzNn0.-jO0JbyOe1dIWYKZvb-aIBGsNC9AHJgYMo52g2n29wU",
            "Access-Control-Allow-Origin": "no-cors",
          },
        }
      );
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Moonshot - Interactive Data Visualization</h1>
      {error ? (
        <h3 className="error">{error}</h3>
      ) : loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <BarChart data={data} />
        </>
      )}
    </>
  );
}

export default App;
