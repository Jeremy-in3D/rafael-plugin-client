import { useState, useEffect } from "react";
import "./App.css";
import { Maintenance } from "./components/maintenance/Maintenance";
import { Operational } from "./components/operational/Operational";

const mockData = [
  {
    name: "maintenance",
    chapter: {
      name: "Information",
      tasks: [
        {
          name: "learn",
          checkListData: ["task 1", "task 2", "task 3", "task 4"],
        },
        {
          name: "apply",
          checkListData: [
            "question 1",
            "question 2",
            "question 3",
            "question 4",
          ],
        },
        {
          name: "test",
          checkListData: ["attempt 1", "attempt 2", "attempt 3", "attempt 4"],
        },
        {
          name: "cool",
          checkListData: ["step 1", "step 2", "step 3", "step 4"],
        },
      ],
    },
  },

  {
    name: "maintenance",
    chapter: {
      name: "Application",
      tasks: [
        {
          name: "Watch",
          checkListData: ["task 1", "task 2", "task 3", "task 4"],
        },
        {
          name: "Listen",
          checkListData: [
            "question 1",
            "question 2",
            "question 3",
            "question 4",
          ],
        },
        {
          name: "React",
          checkListData: ["attempt 1", "attempt 2", "attempt 3", "attempt 4"],
        },
        {
          name: "Meditate",
          checkListData: ["step 1", "step 2", "step 3", "step 4"],
        },
      ],
    },
  },

  {
    name: "operational",
    chapter: {
      name: "Shut Down",
      tasks: [
        {
          name: "Do One",
          checkListData: ["task 1", "task 2", "task 3", "task 4"],
        },
        {
          name: "step 2",
          checkListData: ["step 1", "step 2", "step 3", "step 4"],
        },
        {
          name: "Then three",
          checkListData: [
            "question 1",
            "question 2",
            "question 3",
            "question 4",
          ],
        },
      ],
    },
  },
];

function App() {
  const [typeOfChecklist, setTypeOfChecklist] = useState("");
  const [pluginData, setPluginData] = useState<any>([]);

  const isMaintenance = typeOfChecklist == "maintenance";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://192.168.1.224:3000");
      const data = await res.json();
      if (data && data.checklistData) {
        console.log(data.checklistData);
        setPluginData(data.checklistData);
      } else {
        setPluginData([]);
      }
    };

    try {
      fetchData();
    } catch {
      console.log("in the first catch");
      setPluginData(mockData);
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
