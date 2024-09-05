import { useState, useEffect } from "react";
import "./App.css";
import { Maintenance } from "./components/maintenance/Maintenance";
import { Operational } from "./components/operational/Operational";

function App() {
  const [typeOfChecklist, setTypeOfChecklist] = useState("");
  const [pluginData, setPluginData] = useState<any>(null);

  const isMaintenance = typeOfChecklist == "maintenance";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.224:3000");
      const data = await res.json();
      if (data && data.checklistData) {
        setPluginData(data.checklistData);
      }
    };

    try {
      fetchData();
    } catch {
      console.log("in the first catch");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.224:3000/sendData", {
        method: "POST",
        body: "hello world",
      });
      const blab = await res.text();
      console.log({ blab });
    };

    try {
      fetchData().catch((e) => console.log("some error ye: ", e));
    } catch {
      console.log("sup");
    }
  }, []);

  return (
    <div className="app-wrapper">
      {!typeOfChecklist ? (
        <CheckListSelect setTypeOfChecklist={setTypeOfChecklist} />
      ) : isMaintenance ? (
        <Maintenance
          setTypeOfChecklist={setTypeOfChecklist}
          pluginData={pluginData}
        />
      ) : (
        <Operational
          setTypeOfChecklist={setTypeOfChecklist}
          pluginData={pluginData}
        />
      )}
    </div>
  );
}

export default App;

type CheckListSelectProps = {
  setTypeOfChecklist: React.Dispatch<React.SetStateAction<string>>;
};

const CheckListSelect = ({ setTypeOfChecklist }: CheckListSelectProps) => (
  <div style={{ height: "100%", width: "100%" }}>
    <h1>Checklist</h1>
    <div>
      <p>Please Select a category</p>
      <button onClick={() => setTypeOfChecklist("maintenance")}>
        Maintenance
      </button>
      <button onClick={() => setTypeOfChecklist("operational")}>
        Operational
      </button>
    </div>
  </div>
);
