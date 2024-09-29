import { useState, useEffect } from "react";
import "./App.css";
import { Maintenance } from "./components/maintenance/Maintenance";
import { Operational } from "./components/operational/Operational";
import { ModalComponent } from "./common/Modal";
import { useAppContext } from "./context/appContext";
function App() {
  const [typeOfChecklist, setTypeOfChecklist] = useState("");
  const [pluginData, setPluginData] = useState<any>([]);
  // const [modalIsOpen, setIsOpen] = React.useState(false);
  const isMaintenance = typeOfChecklist == "maintenance";

  const { modalIsOpen, setIsOpen, modalData } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch("http://192.168.1.224:3000/getData");
      const res = await fetch(
        "https://rafael-plugin-server.onrender.com/getData",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("yee idk");
      const data = await res.json();
      if (data && data.checklistData) {
        // console.log(data.checklistData);
        console.log("pap");
        // setPluginData(data.checklistData);
      } else {
        console.log("jip");
        // setPluginData(mockkDATA);
      }
    };

    try {
      fetchData();
    } catch (e) {
      console.log("in the first catch", e);
      // setPluginData(mockkDATA);
    }
    setPluginData(mockkDATA);
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
      {modalIsOpen ? (
        <ModalComponent
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
        />
      ) : null}
    </div>
  );
}

export default App;

type CheckListSelectProps = {
  setTypeOfChecklist: React.Dispatch<React.SetStateAction<string>>;
};

const CheckListSelect = ({ setTypeOfChecklist }: CheckListSelectProps) => (
  <div style={{ height: "100%", width: "100%" }}>
    <div style={{ marginTop: "3em" }}>
      <img src="/images/Rafael-2.png" />
    </div>
    <div>
      <p>Please Select a category</p>
      <button
        style={{ border: "1px solid rgb(0,0,0,0.2)" }}
        onClick={() => setTypeOfChecklist("maintenance")}
      >
        Maintenance
      </button>
      <button
        style={{ marginLeft: "2em", border: "1px solid rgb(0,0,0,0.2)" }}
        onClick={() => setTypeOfChecklist("operational")}
      >
        Operational
      </button>
    </div>
  </div>
);

const mockkDATA = [
  {
    name: "maintenance",
    chapter: {
      name: "פרק 1 - הנחיות כלליות ",
      tasks: [
        {
          name: "משימה 1.1",
          checkListData: [
            {
              name: "ודא שהנך לבוש בבגדי עבודה",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 1.2",
          checkListData: [
            {
              name: "ודא שאתה לובש כפפות לפני בצוע",
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "maintenance",
    chapter: {
      name: "פרק 5 - בדיקת תיבה",
      tasks: [
        {
          name: "משימה 5.1",
          checkListData: [
            {
              name: "חבר קונקטור",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 5.2",
          checkListData: [
            {
              name: "חבר כרטיס",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 5.3",
          checkListData: [
            {
              name: "סגור ברגים של התיבה",
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "maintenance",
    chapter: {
      name: "פרק 6 - סיום",
      tasks: [
        {
          name: "משימה 6.1",
          checkListData: [
            {
              name: "לך הביתה",
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "maintenance",
    chapter: {
      name: "פרק 2 - פתיחת תיבה",
      tasks: [
        {
          name: "משימה 2.1",
          checkListData: [
            {
              name: "ודא תיבה מונחת על שולחן ללא שיפוע",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 2.2",
          checkListData: [
            {
              name: "פתיחת 4 ברגים נגד כיוון השעון",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 2.3",
          checkListData: [
            {
              name: "פרק כרטיס בקרה (ראה לינק )",
              isChecked: false,
            },
            {
              name: 'ודא צבע חוטים לקונקטור לכרטיס עפ"י הטבלה:',
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "maintenance",
    chapter: {
      name: "פרק 4 - בדיקת תיבה",
      tasks: [
        {
          name: "משימה 4.1",
          checkListData: [
            {
              name: 'הבא צב"ד לעמדת בדיקה',
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 4.2",
          checkListData: [
            {
              name: "העבר את הפין למצב בדיקה",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 4.3",
          checkListData: [
            {
              name: 'חבר את התיבה לצב"ד',
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 4.4",
          checkListData: [
            {
              name: 'פרק צ"בד',
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "maintenance",
    chapter: {
      name: "פרק 3 - ביצוע עבודת תחזוקה שנתית",
      tasks: [
        {
          name: "משימה 3.1",
          checkListData: [
            {
              name: "נקה קונקטור",
              isChecked: false,
            },
          ],
        },
        {
          name: "משימה 3.2",
          checkListData: [
            {
              name: "מרח שמן על הקונקטור",
              isChecked: false,
            },
          ],
        },
      ],
    },
  },
  {
    name: "operational",
    chapter: {
      name: "פרק 1 - הנחיות כלליות ",
      tasks: [
        {
          task: "task-a",
          name: "משימה 1.1",
          questions: {
            "question-1": {
              text: "ודא שהנך לבוש בבגדי עבודה",
              isChecked: false,
            },
            "question-2": {
              text: "ודא שהנך לבוש בבגדי עבודה",
              isChecked: false,
            },
          },
        },
      ],
    },
  },
  {
    name: "operational",
    chapter: {
      name: "פרק 3 - ניקיון משאית",
      tasks: [
        {
          task: "task-a",
          name: "משימה 3.1",
          questions: {
            "question-1": {
              text: "הבא מגב וסמרטוט",
              isChecked: false,
            },
            "question-2": {
              text: "הבא מטאטא",
              isChecked: false,
            },
          },
        },
        {
          task: "task-b",
          name: "משימה 3.2",
          questions: {
            "question-1": {
              text: "קרצף גלגלים קדמיים ואחוריים",
              isChecked: false,
            },
            "question-2": {
              text: "נקה אבק וחול מפנים המשאית לכיוון דלתות ההעמסה",
              isChecked: false,
            },
          },
        },
        {
          task: "task-c",
          name: "משימה 3.3",
          questions: {
            "question-1": {
              text: "פנה את הפסולת לפח הקרוב",
              isChecked: false,
            },
            "question-2": {
              text: "פנה את הפסולת לפח הקרוב",
              isChecked: false,
            },
          },
        },
        {
          task: "task-d",
          name: "משימה 3.4",
          questions: {
            "question-1": {
              text: "הבא מגב וסמרטוט ריצפה",
              isChecked: false,
            },
            "question-2": {
              text: "הבא מגב וסמרטוט ריצפה",
              isChecked: false,
            },
          },
        },
        {
          task: "task-e",
          name: "this is our example - 3.5",
          questions: {
            "question-1": {
              text: "מלא מים בדלי",
              isChecked: false,
            },
            "question-2": {
              text: "מלא מים בדלי",
              isChecked: false,
            },
          },
        },
        {
          task: "task-f",
          name: "משימה 3.6",
          questions: {
            "question-1": {
              text: "שפוך נוזל ניקוי ריצפה על ריצפת המשאית",
              isChecked: false,
            },
            "question-2": {
              text: "שפוך נוזל ניקוי ריצפה על ריצפת המשאית",
              isChecked: false,
            },
          },
        },
        {
          task: "task-g",
          name: "משימה 3.7",
          questions: {
            "question-1": {
              text: "השלם קירצוף בצורת שתי וערב",
              isChecked: false,
            },
            "question-2": {
              text: "השלם קירצוף בצורת שתי וערב",
              isChecked: false,
            },
          },
        },
        {
          task: "task-h",
          name: "משימה 3.8",
          questions: {
            "question-1": {
              text: "סחט את הסמרטוט",
              isChecked: false,
            },
            "question-2": {
              text: "סחט את הסמרטוט",
              isChecked: false,
            },
          },
        },
        {
          task: "task-i",
          name: "משימה 3.9",
          questions: {
            "question-1": {
              text: "עבור עם סמרטוט יבש בצורת שתי וערב",
              isChecked: false,
            },
            "question-2": {
              text: "עבור עם סמרטוט יבש בצורת שתי וערב",
              isChecked: false,
            },
          },
        },
      ],
    },
  },
  {
    name: "operational",
    chapter: {
      name: "פרק 2 - פתיחת דלתות משאית",
      tasks: [
        {
          task: "task-a",
          name: "משימה 2.1",
          questions: {
            "question-1": {
              text: "לבש כפפות אדומות לעבודה",
              isChecked: false,
            },
            "question-2": {
              text: "לבש כפפות לבנות לעבודה",
              isChecked: false,
            },
          },
        },
        {
          task: "task-b",
          name: "משימה 2.2",
          questions: {
            "question-1": {
              text: "לך לדלת האחורית",
              isChecked: false,
            },
            "question-2": {
              text: "לך לדלת האחורית",
              isChecked: false,
            },
          },
        },
        {
          task: "task-c",
          name: "משימה 2.3",
          questions: {
            "question-1": {
              text: "פתח דלת שמאל",
              isChecked: false,
            },
            "question-2": {
              text: "פתח דלת ימין",
              isChecked: false,
            },
          },
        },
      ],
    },
  },
];
