import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type Context = {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: string;
  setModalData: React.Dispatch<React.SetStateAction<string>>;
  searchOption: string;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  fullPluginData: any;
  setFullPluginData: React.Dispatch<any>;
  operationType: string;
  setOperationType: React.Dispatch<React.SetStateAction<string>>;
  triggerRerender: boolean;
  setTriggerRerender: React.Dispatch<React.SetStateAction<boolean>>;
  maintenanceCompletedChapters: any[];
  setMaintenanceCompletedChapters: React.Dispatch<React.SetStateAction<any[]>>;
  modalText: string;
  setModalText: React.Dispatch<React.SetStateAction<string>>;
  currentQuestionHeaderText: string;
  setCurrentQuestionHeaderText: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  firstChecklistItemText: {
    maintenance: string;
    operational: string;
  };
  setFirstChecklistItemText: React.Dispatch<
    React.SetStateAction<{
      maintenance: string;
      operational: string;
    }>
  >;
};

export const AppContext = createContext<Context | null>(null);

type FirstCheckItem = {
  maintenance: string;
  operational: string;
};

export default function AppContextProvider({
  children,
}: AppContextProviderProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const [searchOption, setSearchOption] = useState<string>("");
  const [fullPluginData, setFullPluginData] = useState<any>(null);
  const [operationType, setOperationType] = useState<string>("Maintenance");
  const [triggerRerender, setTriggerRerender] = useState<boolean>(false);
  const [maintenanceCompletedChapters, setMaintenanceCompletedChapters] =
    useState<any[]>([]);
  const [modalText, setModalText] = useState<string>("");
  const [currentQuestionHeaderText, setCurrentQuestionHeaderText] =
    useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [firstChecklistItemText, setFirstChecklistItemText] =
    useState<FirstCheckItem>({ maintenance: "", operational: "" });

  return (
    <AppContext.Provider
      value={{
        modalIsOpen,
        setIsOpen,
        modalData,
        setModalData,
        searchOption,
        setSearchOption,
        fullPluginData,
        setFullPluginData,
        operationType,
        setOperationType,
        triggerRerender,
        setTriggerRerender,
        maintenanceCompletedChapters,
        setMaintenanceCompletedChapters,
        modalText,
        setModalText,
        currentQuestionHeaderText,
        setCurrentQuestionHeaderText,
        errorMsg,
        setErrorMsg,
        firstChecklistItemText,
        setFirstChecklistItemText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.log("Error with a Context");
    return {
      modalIsOpen: false,
      setIsOpen: () => {},
      modalData: "",
      setModalData: () => {},
      searchOption: "",
      setSearchOption: () => {},
      fullPluginData: "",
      setFullPluginData: () => {},
      operationType: "",
      setOperationType: () => {},
      triggerRerender: false,
      setTriggerRerender: () => {},
      maintenanceCompletedChapters: [],
      setMaintenanceCompletedChapters: () => {},
      modalText: "",
      setModalText: () => {},
      currentQuestionHeaderText: "",
      setCurrentQuestionHeaderText: () => {},
      errorMsg: "",
      setErrorMsg: () => {},
      firstChecklistItemText: { maintenance: "", operational: "" },
      setFirstChecklistItemText: () => {},
    };
  }

  return context;
}

// [
//   {
//     name: "operational",
//     chapter: {
//       name: "פרק 1 - הנחיות כלליות ",
//       tasks: [
//         {
//           task: "task-a",
//           name: "משימה 1.1",
//           questions: {
//             "question-1": {
//               text: "ודא שהנך לבוש בבגדי עבודה",
//               isChecked: false,
//               image: null,
//             },
//             "question-2": {
//               text: "",
//               isChecked: false,
//               image: null,
//             },
//           },
//         },
//       ],
//       platform: "סופה",
//     },
//   },
// {
//   name: "operational",
//   chapter: {
//     name: "פרק 2 - פתיחת דלתות משאית",
//     tasks: [
//       {
//         task: "task-a",
//         name: "משימה 2.1",
//         questions: {
//           "question-1": {
//             text: "לבש כפפות אדומות לעבודה",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Red-Gloves.png",
//           },
//           "question-2": {
//             text: "לבש כפפות לבנות לעבודה",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\White-Gloves.png",
//           },
//         },
//       },
//       {
//         task: "task-b",
//         name: "משימה 2.2",
//         questions: {
//           "question-1": {
//             text: "לך לדלת האחורית",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
//           },
//           "question-2": {
//             text: "לך לדלת האחורית",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
//           },
//         },
//       },
//       {
//         task: "task-c",
//         name: "משימה 2.3",
//         questions: {
//           "question-1": {
//             text: "פתח דלת שמאל",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
//           },
//           "question-2": {
//             text: "פתח דלת ימין",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
//           },
//         },
//       },
//     ],
//     platform: "סופה",
//   },
// },

// {
//   name: "operational",
//   chapter: {
//     name: "פרק 3 - ניקיון משאית",
//     tasks: [
//       {
//         task: "task-a",
//         name: "משימה 3.1",
//         questions: {
//           "question-1": {
//             text: "הבא מגב וסמרטוט",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Red-Gloves.png",
//           },
//           "question-2": {
//             text: "הבא מטאטא",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\White-Gloves.png",
//           },
//         },
//       },
//       {
//         task: "task-b",
//         name: "משימה 3.2",
//         questions: {
//           "question-1": {
//             text: "קרצף גלגלים קדמיים ואחוריים",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
//           },
//           "question-2": {
//             text: "נקה אבק וחול מפנים המשאית לכיוון דלתות ההעמסה",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
//           },
//         },
//       },
//       {
//         task: "task-c",
//         name: "משימה 3.3",
//         questions: {
//           "question-1": {
//             text: "פנה את הפסולת לפח הקרוב",
//             isChecked: false,
//             image: null,
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-d",
//         name: "משימה 3.4",
//         questions: {
//           "question-1": {
//             text: "הבא מגב וסמרטוט ריצפה",
//             isChecked: false,
//             image: null,
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-e",
//         name: "משימה 3.5",
//         questions: {
//           "question-1": {
//             text: "מלא מים בדלי",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Warning-Sign.png",
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-f",
//         name: "משימה 3.6",
//         questions: {
//           "question-1": {
//             text: "שפוך נוזל ניקוי ריצפה על ריצפת המשאית",
//             isChecked: false,
//             image:
//               "C:\\Users\\Eliya\\Desktop\\ReTeM\\Content\\Resources\\Images\\Camera-Image.png",
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-g",
//         name: "משימה 3.7",
//         questions: {
//           "question-1": {
//             text: "השלם קירצוף בצורת שתי וערב",
//             isChecked: false,
//             image: null,
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-h",
//         name: "משימה 3.8",
//         questions: {
//           "question-1": {
//             text: "סחט את הסמרטוט",
//             isChecked: false,
//             image: null,
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//       {
//         task: "task-i",
//         name: "משימה 3.9",
//         questions: {
//           "question-1": {
//             text: "עבור עם סמרטוט יבש בצורת שתי וערב",
//             isChecked: false,
//             image: null,
//           },
//           "question-2": {
//             text: "",
//             isChecked: false,
//             image: null,
//           },
//         },
//       },
//     ],
//     platform: "סופה",
//   },
// },
// ];
