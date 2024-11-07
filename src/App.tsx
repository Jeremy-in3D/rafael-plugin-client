import { useState, useEffect } from "react";
import "./App.css";
import { Maintenance } from "./components/maintenance/Maintenance";
import { Operational } from "./components/operational/Operational";
import { ModalComponent } from "./common/Modal";
import { useAppContext } from "./context/appContext";
import { Error } from "./components/Error";
function App() {
  const [typeOfChecklist, setTypeOfChecklist] = useState("");
  const [pluginData, setPluginData] = useState<any>([]);
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  const isMaintenance = typeOfChecklist == "maintenance";

  const {
    modalIsOpen,
    setIsOpen,
    modalData,
    setFullPluginData,
    modalText,
    errorMsg,
    setErrorMsg,
  } = useAppContext();

  useEffect(() => {
    setTimeout(() => setErrorMsg(""), 2000);
  }, [errorMsg]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(
    //     "https://rafael-plugin-server.onrender.com/getData"
    //     // "http://localhost:3000/getData"
    //   ); // await fetch("http://localhost:3000/getData");
    //   // const res = await fetch("http://192.168.1.224:3000/getData");
    //   // const res = await fetch(
    //   //   "https://rafael-plugin-server.onrender.com/getData",
    //   //   {
    //   //     method: "GET",
    //   //     headers: { "Content-Type": "application/json" },
    //   //   }
    //   // );
    //   // console.log("yee idk");
    //   const data = await res.json();
    //   if (data && data.checklistData) {
    //     console.log("FETCHED DATA: ");

    //     // console.log(data.checklistData);
    //     setPluginData(data.checklistData);
    //     setFullPluginData(data.checklistData);
    //   } else {
    //     console.log("FAILED FETCHDATA");
    //     setPluginData(mockkDATA);
    //   }
    // };

    // try {
    //   fetchData();
    // } catch (e) {
    //   console.log("in the first catch", e);
    //   // setPluginData(mockkDATA);
    // }
    setPluginData(mockkDATA);
    // setFullPluginData(mockkDATA);
  }, []);

  return (
    <div className="app-wrapper">
      {!typeOfChecklist ? (
        <CheckListSelect setTypeOfChecklist={setTypeOfChecklist} />
      ) : isMaintenance ? (
        <Maintenance
          setTypeOfChecklist={setTypeOfChecklist}
          pluginData={pluginData}
          typeOfChecklist={typeOfChecklist}
        />
      ) : (
        <Operational
          setTypeOfChecklist={setTypeOfChecklist}
          pluginData={pluginData}
          typeOfChecklist={typeOfChecklist}
        />
      )}
      {modalIsOpen ? (
        <ModalComponent
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
          modalText={modalText}
        />
      ) : null}
      {errorMsg ? <Error errorMsg={errorMsg} /> : null}
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
      <img src="/images/rafael-logo-hebrew.png" />
    </div>
    <div>
      <h1>שלום ישראל ישראלי</h1>
    </div>
    <div>
      <p style={{ fontSize: "2em" }}>בחר קטגוריה</p>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2em",
        height: "10em",
      }}
    >
      <button
        style={{
          // marginLeft: "2em",
          // border: "1px solid rgb(0,0,0,0.2)",
          background: "none",
          height: "9em",
          width: "11em",
        }}
        onClick={() => setTypeOfChecklist("operational")}
      >
        <img src="/images/op-1.png" />
        <span style={{ fontSize: "1.6em" }}>תחזוקה</span>
      </button>

      <div style={{ borderLeft: "1px solid rgb(0,0,0,0.4)" }}></div>
      <button
        style={{
          // border: "1px solid rgb(0,0,0,0.2)",
          background: "none",
          height: "9em",
          width: "11em",
        }}
        onClick={() => setTypeOfChecklist("maintenance")}
      >
        <img src="/images/maint-icon.png" />
        <span style={{ fontSize: "1.6em" }}>מבצעי</span>
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
          imageData: null,
        },
        {
          name: "משימה 1.2",
          checkListData: [
            {
              name: "ודא שאתה לובש כפפות לפני בצוע",
              isChecked: false,
            },
          ],
          imageData: null,
        },
      ],
      platform: "סופה",
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
            },
          },
        },
      ],
      platform: "סופה",
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
          imageData:
            "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Introduction.png",
        },
        {
          name: "משימה 2.2",
          checkListData: [
            {
              name: "פתיחת 4 ברגים נגד כיוון השעון",
              isChecked: false,
            },
          ],
          imageData:
            "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
        },
        {
          name: "משימה 2.3",
          table: true,
          checkListData: [
            {
              name: 'ודא צבע חוטים לקונקטור לכרטיס עפ"י הטבלה:',
              isChecked: false,
            },
          ],
          imageData:
            "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
        },
      ],
      platform: "רעם",
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Red-Gloves.png",
            },
            "question-2": {
              text: "לבש כפפות לבנות לעבודה",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\White-Gloves.png",
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
            },
            "question-2": {
              text: "לך לדלת האחורית",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
            },
            "question-2": {
              text: "פתח דלת ימין",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
            },
          },
        },
      ],
      platform: "סופה",
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
          imageData:
            "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
        },
        {
          name: "משימה 3.2",
          checkListData: [
            {
              name: "מרח שמן על הקונקטור",
              isChecked: false,
            },
          ],
          imageData: null,
        },
        {
          name: "משימה 3.3.",
          checkListData: [
            {
              name: "מריחת שמן יש לבצע בתנועה סיבובים עם כיון השעון",
              isChecked: false,
            },
          ],
          imageData:
            "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\T-blue-square.png",
        },
      ],
      platform: "חד מושבי",
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Red-Gloves.png",
            },
            "question-2": {
              text: "הבא מטאטא",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\White-Gloves.png",
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
            },
            "question-2": {
              text: "נקה אבק וחול מפנים המשאית לכיוון דלתות ההעמסה",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
            },
          },
        },
        {
          task: "task-e",
          name: "משימה 3.5",
          questions: {
            "question-1": {
              text: "מלא מים בדלי",
              isChecked: false,
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
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
              image:
                "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
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
              image: null,
            },
            "question-2": {
              text: "",
              isChecked: false,
              image: null,
            },
          },
        },
      ],
      platform: "סופה",
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
          imageData: null,
        },
        {
          name: "משימה 4.2",
          checkListData: [
            {
              name: "העבר את הפין למצב בדיקה",
              isChecked: false,
            },
          ],
          imageData: null,
        },
        {
          name: "משימה 4.3",
          checkListData: [
            {
              name: 'חבר את התיבה לצב"ד',
              isChecked: false,
            },
          ],
          imageData: null,
        },
        {
          name: "משימה 4.4",
          checkListData: [
            {
              name: 'פרק צ"בד',
              isChecked: false,
            },
          ],
          imageData: null,
        },
      ],
      platform: "דו מושבי",
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
          imageData: null,
        },
        {
          name: "משימה 5.2",
          checkListData: [
            {
              name: "חבר כרטיס",
              isChecked: false,
            },
          ],
          imageData: null,
        },
        {
          name: "משימה 5.3",
          checkListData: [
            {
              name: "סגור ברגים של התיבה",
              isChecked: false,
            },
          ],
          imageData: null,
        },
      ],
      platform: "תלת מושבי",
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
          imageData: null,
        },
      ],
    },
  },
];
