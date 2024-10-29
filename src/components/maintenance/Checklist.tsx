// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import CheckIcon from "@mui/icons-material/Check";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
// import { OperationalChecklistByTask } from "../operational/OperationalChecklist";
import { OperationalFullChapterList } from "../operational/OperationalFullChapterList";
import { MaintenanceFullChapterList } from "./MaintenanceFullChapterList";
import { useAppContext } from "../../context/appContext";
// import TableComponent from "./Table";
// import { MaintenanceChecklistByItem } from "./MaintenanceChecklistByItem";

export function Checklist({
  pluginData,
  selectedTask,
  isMaintenance,
  selectedChapters,
  setSelectedChapters,
}: any) {
  // const [checkedItems, setCheckedItems] = useState<number[]>([]);
  // const [currentItem, setCurrentItem] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isShowSoloChecklist, setIsShowSoloChecklist] = useState<number | null>(
    null
  );

  const { searchOption, maintenanceCompletedChapters } = useAppContext();

  // console.log({ selectedChapters });

  // const relevantTasks =
  //   pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask.taskIdx]
  //     .checkListData;
  // const isTable =
  //   pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask?.taskIdx]
  //     ?.table;
  // const checkImage =
  //   pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask?.taskIdx]
  //     ?.imageData;

  // const handleCheckBox = (idx: number) => {
  //   console.log({ relevantTasks });
  //   if (isEditMode) {
  //     if (checkedItems.includes(idx)) {
  //       const updatedArray = [...checkedItems].filter((item) => item != idx);
  //       setCheckedItems(updatedArray);
  //     }
  //   } else {
  //     console.log("supppy");
  //     if (checkPreviousTasks(pluginData, selectedTask)) {
  //       relevantTasks[idx].isChecked = true;
  //       if (!checkedItems.includes(idx)) {
  //         setCheckedItems([...checkedItems, idx]);
  //         if (idx === currentItem) {
  //           setCurrentItem(currentItem + 1);
  //         }
  //       } else {
  //         setCheckedItems(checkedItems.filter((item) => item !== idx));
  //       }
  //     } else {
  //       console.log(" ");
  //     }
  //   }
  // };

  const chapterName = pluginData[selectedTask?.chapterIdx]?.chapter?.name;
  const taskName =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask?.taskIdx];

  const isOperationalFullChapterList =
    selectedChapters?.length && !selectedTask?.taskIdx && !isMaintenance;
  const isMaintenanceFullChapterList =
    (selectedChapters?.length && isMaintenance && !selectedTask?.taskIdx) ||
    (isMaintenance && searchOption);

  const nextChapterBtnText =
    maintenanceCompletedChapters.length == 6
      ? "סיום"
      : `${maintenanceCompletedChapters.length + 1} מעבר לפרק`;

  return (
    <>
      <div className="checklist-container">
        <div
          style={{
            fontSize: "1.2em",
            fontWeight: "bold",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: "4em",
            width: "90%",
          }}
        >
          <div
            className="vertical-align"
            style={{ marginLeft: "0.5em" }}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <EditNoteIcon
              sx={isEditMode ? { color: "red" } : {}}
              fontSize="large"
            />
            <span style={isEditMode ? { color: "red" } : {}}>Undo</span>
          </div>

          <div className="bottom-actions-bar-container">
            <BottomBar
              setIsShowSoloChecklist={setIsShowSoloChecklist}
              isMaintenance={isMaintenance}
              isShowSoloChecklist={isShowSoloChecklist}
            />
          </div>
          {selectedTask ? (
            <span>{`${chapterName} -> ${taskName?.name} `}</span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80%",
          }}
        >
          <div className="checklist-content">
            {isOperationalFullChapterList ? (
              <OperationalFullChapterList
                pluginData={pluginData}
                selectedChapters={selectedChapters}
                selectedTask={selectedTask}
                isShowSoloChecklist={isShowSoloChecklist}
                isEditMode={isEditMode}
              />
            ) : null}
            {isMaintenanceFullChapterList || (isMaintenance && searchOption) ? (
              <MaintenanceFullChapterList
                pluginData={pluginData}
                selectedChapters={selectedChapters}
                selectedTask={selectedTask}
                isEditMode={isEditMode}
              />
            ) : null}
            {/* {!isMaintenance ? (
              <OperationalChecklistByTask
                pluginData={pluginData}
                selectedTask={selectedTask}
                isShowSoloChecklist={isShowSoloChecklist}
                setIsShowSoloChecklist={setIsShowSoloChecklist}
                isEditMode={isEditMode}
              />
            ) : relevantTasks ? (
              <MaintenanceChecklistByItem
                setIsOpen={setIsOpen}
                setModalData={setModalData}
                selectedTask={selectedTask}
                pluginData={pluginData}
                checkPreviousTasks={checkPreviousTasks}
                handleCheckBox={handleCheckBox}
                isEditMode={isEditMode}
                checkImage={checkImage}
                relevantTasks={relevantTasks}
                isTable={isTable}
              />
            ) : null} */}
          </div>
        </div>
        <div
          style={{
            height: "4em",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <button
            style={{ marginLeft: "3em", border: "1px solid rgb(0,0,0,0.6)" }}
            onClick={() => {
              // const checkTasksThing = () => {
              //   let val = true;
              //   const test = pluginData[
              //     maintenanceCompletedChapters[
              //       maintenanceCompletedChapters.length - 1
              //     ] + 1
              //   ]?.chapter?.tasks.map((task: any) => {
              //     console.log({ task });
              //     if (task.checkListData[0].isChecked == false) {
              //       val = false;
              //     }
              //   });

              //   return val;
              // };
              // console.log(checkTasksThing());
              // if (!checkTasksThing() && maintenanceCompletedChapters.length) {
              //   return;
              // }

              // console.log("yep");
              const completedChaptersArr = [...maintenanceCompletedChapters];
              const openedChaptersArr = [...selectedChapters];
              completedChaptersArr.forEach((chapter: number) => {
                if (!openedChaptersArr.includes(chapter + 1)) {
                  setSelectedChapters([...openedChaptersArr, chapter + 1]);
                }
              });
            }}
          >
            {nextChapterBtnText}
          </button>
        </div>
      </div>
    </>
  );
}

type BottomBarProps = {
  setIsShowSoloChecklist: React.Dispatch<React.SetStateAction<number | null>>;
  isMaintenance: boolean;
  isShowSoloChecklist: number | null;
};

const BottomBar = ({
  setIsShowSoloChecklist,
  isMaintenance,
  isShowSoloChecklist,
}: BottomBarProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        borderBottomLeftRadius: "12px",
      }}
    >
      {!isMaintenance ? (
        <div>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 2 ? null : 2);
            }}
            style={{ background: isShowSoloChecklist == 1 ? "grey" : "" }}
          >
            {/* Worker 2 */}
            מערכת ב
          </button>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 1 ? null : 1);
            }}
            style={{
              marginLeft: "2em",
              background: isShowSoloChecklist == 2 ? "grey" : "",
            }}
          >
            מערכת א{/* Worker 1 */}
          </button>
        </div>
      ) : null}
      {/* <div>
        <CloudDownloadIcon fontSize="large" sx={{ opacity: 0.6 }} />
      </div>
      <div>
        <GpsFixedIcon fontSize="large" sx={{ opacity: 0.6 }} />
        <FormatListNumberedRtlIcon
          fontSize="large"
          style={{ marginLeft: "2em" }}
          sx={{ opacity: 0.6 }}
        />
      </div> */}
    </div>
  );
};

// const checkPreviousTasks = (pluginData: any, selectedTask: any) => {
//   let testVal = true;

//   pluginData.forEach((chapter: any) => {
//     if (!chapter) {
//       return false;
//     }

//     for (const [key, value] of Object.entries(chapter)) {
//       if (key == "chapter") {
//         (value as any).tasks.forEach((task: any, taskIdx: number) => {
//           if (taskIdx != selectedTask.taskIdx) {
//             // console.log("dont wabt tio kig gere/: ", task);
//             return;
//           }
//           if (selectedTask.chapterIdx == 0) {
//             if (selectedTask.taskIdx == 0) {
//               if (
//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.length > 1
//               ) {
//                 // logic here for chapter == 0 and task == 0 and multiple questions in task
//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.map((question: any, questionIdx: number) => {
//                   if (false) {
//                     console.log(question);
//                   }
//                   if (selectedTask.checklistIdx == 0) {
//                     testVal = true;
//                     return;
//                   } else {
//                     if (
//                       pluginData[selectedTask.chapterIdx].chapter.tasks[
//                         selectedTask.taskIdx
//                       ].checkListData[questionIdx - 1] == false
//                     ) {
//                       testVal = false;
//                       return;
//                     }
//                   }
//                 });
//               } else {
//                 if (
//                   pluginData[selectedTask.chapterIdx].chapter.tasks[
//                     selectedTask.taskIdx
//                   ].checkListData[0].isChecked == false
//                 ) {
//                   testVal = true;
//                   return;
//                 }
//               }
//             } else {
//               if (
//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.length > 1
//               ) {
//                 // logic for chapter = 0, but task > 0 and multiple questions in task

//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.map((question: any, questionIdx: number) => {
//                   if (false) {
//                     console.log(question);
//                   }
//                   if (selectedTask.checklistIdx == 0) {
//                     // new logic here

//                     // if (
//                     //   pluginData[selectedTask.chapterIdx].chapter.tasks[
//                     //     pluginData[selectedTask.chapterIdx].chapter.tasks
//                     //       .length - 1
//                     //   ].checkListData[
//                     //     pluginData[selectedTask.chapterIdx].chapter.tasks[
//                     //       pluginData[selectedTask.chapterIdx].chapter.tasks
//                     //         .length - 1
//                     //     ].checkListData.length - 1
//                     //   ].isChecked == false
//                     // ) {
//                     //   testVal = false;
//                     //   return;
//                     // }

//                     testVal = true;

//                     return;
//                   } else {
//                     if (
//                       pluginData[selectedTask.chapterIdx].chapter.tasks[
//                         selectedTask.taskIdx
//                       ].checkListData[questionIdx - 1] == false
//                     ) {
//                       testVal = false;
//                       return;
//                     }
//                   }
//                 });
//               } else {
//                 if (
//                   pluginData[selectedTask.chapterIdx].chapter.tasks[
//                     selectedTask.taskIdx - 1
//                   ].checkListData[0].isChecked == false
//                 ) {
//                   testVal = false;
//                   return;
//                 }
//               }
//             }
//           } else {
//             if (selectedTask.taskIdx == 0) {
//               if (
//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.length > 1
//               ) {
//                 // insert logic here for first task in chapter > 0 where multiple questions per task
//               } else {
//                 if (
//                   pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
//                     pluginData[selectedTask.chapterIdx - 1].chapter.tasks
//                       .length - 1
//                   ].checkListData[0].isChecked == false
//                 ) {
//                   testVal = false;
//                   return;
//                 }
//               }
//             } else {
//               if (
//                 pluginData[selectedTask.chapterIdx].chapter.tasks[
//                   selectedTask.taskIdx
//                 ].checkListData.length > 1
//               ) {
//                 // logic here where chapter > 0 and task > 0 and multipl questions per task
//               } else {
//                 if (
//                   pluginData[selectedTask.chapterIdx].chapter.tasks[
//                     selectedTask.taskIdx - 1
//                   ].checkListData[0].isChecked == false
//                 ) {
//                   testVal = false;
//                   return;
//                 }
//               }
//             }
//           }
//         });
//       }
//     }
//   });
//   return testVal;
// };
