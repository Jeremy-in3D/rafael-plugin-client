import { useState, useEffect } from "react";
import "./App.css";
import { Maintenance } from "./components/maintenance/Maintenance";
import { Operational } from "./components/operational/Operational";

function App() {
  const [typeOfChecklist, setTypeOfChecklist] = useState("");
  const [pluginData, setPluginData] = useState<any>([]);

  const isMaintenance = typeOfChecklist == "maintenance";

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch("http://192.168.1.224:3000");
    //   const data = await res.json();
    //   if (data && data.checklistData) {
    //     setPluginData(data.checklistData);
    //   } else {
    //     setPluginData([]);
    //   }
    // };

    try {
      // fetchData();
      setPluginData([
        {
          name: "maintenance",
          chapter: {
            name: "chapter pool",
            tasks: ["task1", "task2", "task3"],
          },
        },
        {
          name: "maintenance",
          chapter: {
            name: "Information",
            tasks: ["learn", "apply", "test", "cool"],
          },
        },
        {
          name: "maintenance",
          chapter: {
            name: "Applications",
            tasks: ["step 1", "step 2", "step 3"],
          },
        },
      ]);
    } catch {
      console.log("in the first catch");
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
