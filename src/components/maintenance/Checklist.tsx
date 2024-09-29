import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { OperationalChecklist } from "../operational/OperationalChecklist";
import { OperationalFullChapterList } from "../operational/OperationalFullChapterList";
import { MaintenanceFullChapterList } from "./MaintenanceFullChapterList";

export function Checklist({
  pluginData,
  selectedTask,
  isMaintenance,
  // setCurrentQuestion,
  // currentQuestion,
  selectedChapters,
}: any) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isShowSoloChecklist, setIsShowSoloChecklist] = useState<number | null>(
    null
  );
  // const [totalItemsInChecklist, setTotalItemsInChecklist] = useState<number>(0);
  const relevantTasks =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask.taskIdx]
      .checkListData;

  const handleCheckBox = (idx: number) => {
    // const isUserRecheckingPreviouslyEditedChecks = idx !== currentItem;

    if (isEditMode) {
      if (checkedItems.includes(idx)) {
        const updatedArray = [...checkedItems].filter((item) => item != idx);
        setCheckedItems(updatedArray);
      }
      // if (checkNextTasks(pluginData,)) {
      //   console.log("GO HOME");
      // } else {
      //   console.log("STAY");
      // }
      console.log("should be for maintenance and specific items list");
    } else {
      if (checkPreviousTasks(pluginData, selectedTask)) {
        relevantTasks[idx].isChecked = true;
        if (!checkedItems.includes(idx)) {
          setCheckedItems([...checkedItems, idx]);
          if (idx === currentItem) {
            setCurrentItem(currentItem + 1);
          }
        } else {
          setCheckedItems(checkedItems.filter((item) => item !== idx));
        }
      } else {
        console.log(" ");
      }
      // relevantTasks[idx].isChecked = true;
      // if (!checkedItems.includes(idx)) {
      //   setCheckedItems([...checkedItems, idx]);
      //   if (idx === currentItem) {
      //     setCurrentItem(currentItem + 1);
      //   }
      // } else {
      //   setCheckedItems(checkedItems.filter((item) => item !== idx));
      // }
    }
    // setCurrentQuestion(currentQuestion + 1);
  };

  const chapterName = pluginData[selectedTask?.chapterIdx]?.chapter?.name;
  const taskName =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask?.taskIdx];

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
            <span style={isEditMode ? { color: "red" } : {}}>Edit</span>
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
            height: "100%",
          }}
        >
          <div className="checklist-content">
            {selectedChapters?.length &&
            !selectedTask?.taskIdx &&
            !isMaintenance ? (
              <OperationalFullChapterList
                pluginData={pluginData}
                selectedChapters={selectedChapters}
                selectedTask={selectedTask}
                isShowSoloChecklist={isShowSoloChecklist}
                isEditMode={isEditMode}
              />
            ) : null}
            {selectedChapters?.length &&
            isMaintenance &&
            !selectedTask?.taskIdx ? (
              <MaintenanceFullChapterList
                pluginData={pluginData}
                selectedChapters={selectedChapters}
                selectedTask={selectedTask}
                isEditMode={isEditMode}
              />
            ) : null}
            {!isMaintenance ? (
              <OperationalChecklist
                pluginData={pluginData}
                selectedTask={selectedTask}
                isShowSoloChecklist={isShowSoloChecklist}
                setIsShowSoloChecklist={setIsShowSoloChecklist}
                isEditMode={isEditMode}
              />
            ) : relevantTasks ? (
              relevantTasks.map((item: any, idx: number) => (
                <div
                  className="checklist-list-items"
                  key={idx}
                  // onClick={() => console.log(checkedItems)}
                >
                  <div
                    style={{
                      color: "white",
                      marginLeft: "1em",
                    }}
                  >
                    {relevantTasks[idx].isChecked == false ? (
                      idx > 0 ? (
                        relevantTasks[idx - 1].isChecked == false ? (
                          <RadioButtonUncheckedIcon
                            sx={isEditMode ? { color: "red" } : {}}
                            // onClick={() => handleCheckBox(idx)}
                          />
                        ) : relevantTasks[idx > 0 ? idx - 1 : 0].isChecked ==
                          false ? (
                          <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                        ) : (
                          <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                          // <RadioButtonUncheckedIcon
                          //   sx={isEditMode ? { color: "red" } : {}}
                          //   // onClick={() => handleCheckBox(idx)}
                          // />
                        )
                      ) : checkPreviousTasks(pluginData, selectedTask) ? (
                        <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )
                    ) : (
                      <CheckIcon
                        sx={
                          isEditMode ? { color: "red" } : { color: "#40e01f" }
                        }
                        onClick={() => handleCheckBox(idx)}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      color: "white",
                      marginRight: "1em",
                      fontSize: "1.2em",
                      fontWeight: "bold",
                    }}
                  >
                    {item?.name}
                  </div>
                </div>
              ))
            ) : null}
          </div>
          {isMaintenance ? null : selectedTask ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  selectedTask?.chapterIdx == 0
                    ? "/images/test.png"
                    : "/images/camera.png"
                }
                style={{
                  position: "absolute",
                  bottom: "10em",
                  // left: selectedTask?.chapterIdx != 0 ? "31em" : "30em",
                  width: selectedTask?.chapterIdx != 0 ? "17em" : "",
                }}
              />
            </div>
          ) : null}
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
        // justifyContent: "space-evenly",
        justifyContent: "center",
        // marginRight: "5em",
        alignItems: "flex-end",
        borderBottomLeftRadius: "12px",
      }}
    >
      {!isMaintenance ? (
        <div>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 1 ? null : 1);
            }}
            style={{ background: isShowSoloChecklist == 1 ? "grey" : "" }}
          >
            Worker 2
          </button>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 2 ? null : 2);
            }}
            style={{
              marginLeft: "2em",
              background: isShowSoloChecklist == 2 ? "grey" : "",
            }}
          >
            Worker 1
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

const checkPreviousTasks = (pluginData: any, selectedTask: any) => {
  let testVal = true;

  pluginData.forEach((chapter: any) => {
    if (!chapter) {
      return false;
    }
    // console.log({ chapter });
    for (const [key, value] of Object.entries(chapter)) {
      if (key == "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (taskIdx != selectedTask.taskIdx) {
            console.log(task);
            return;
          }
          if (selectedTask.chapterIdx == 0) {
            if (selectedTask.taskIdx == 0) {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                // console.log("WELL HOW BOUT THADY");
                // logic here for chapter == 0 and task == 0 and multiple questions in task
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.map((question: any, questionIdx: number) => {
                  if (false) {
                    console.log(question);
                  }
                  if (selectedTask.checklistIdx == 0) {
                    testVal = true;
                    return;
                  } else {
                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask.taskIdx
                      ].checkListData[questionIdx - 1] == false
                    ) {
                      testVal = false;
                      return;
                    }
                  }
                });
              } else {
                if (
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx
                  ].checkListData[0].isChecked == false
                ) {
                  testVal = true;
                  return;
                }
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                // logic for chapter = 0, but task > 0 and multiple questions in task

                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.map((question: any, questionIdx: number) => {
                  if (false) {
                    console.log(question);
                  }
                  if (selectedTask.checklistIdx == 0) {
                    // new logic here

                    // if (
                    //   pluginData[selectedTask.chapterIdx].chapter.tasks[
                    //     pluginData[selectedTask.chapterIdx].chapter.tasks
                    //       .length - 1
                    //   ].checkListData[
                    //     pluginData[selectedTask.chapterIdx].chapter.tasks[
                    //       pluginData[selectedTask.chapterIdx].chapter.tasks
                    //         .length - 1
                    //     ].checkListData.length - 1
                    //   ].isChecked == false
                    // ) {
                    //   testVal = false;
                    //   return;
                    // }

                    testVal = true;

                    return;
                  } else {
                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask.taskIdx
                      ].checkListData[questionIdx - 1] == false
                    ) {
                      testVal = false;
                      return;
                    }
                  }
                });
              } else {
                if (
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx - 1
                  ].checkListData[0].isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              }
            }
          } else {
            if (selectedTask.taskIdx == 0) {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                // insert logic here for first task in chapter > 0 where multiple questions per task
              } else {
                if (
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                    pluginData[selectedTask.chapterIdx - 1].chapter.tasks
                      .length - 1
                  ].checkListData[0].isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                // logic here where chapter > 0 and task > 0 and multipl questions per task
              } else {
                if (
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx - 1
                  ].checkListData[0].isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              }
            }
          }
        });
      }
    }
  });
  return testVal;
};

// const checkNextTasks = (pluginData: any, selectedTask: any) => {
//   let testVal = false;

//   pluginData.forEach((chapter: any, chapterIdx: number) => {
//     if (!chapter) {
//       return false;
//     }

//     for (const [key, value] of Object.entries(chapter)) {
//       if (key === "chapter") {
//         (value as any).tasks.forEach((task: any, taskIdx: number) => {
//           if (
//             chapterIdx !== selectedTask.chapterIdx ||
//             taskIdx !== selectedTask.taskIdx
//           ) {
//             // If it's not the current selected task, continue
//             return;
//           }

//           // Check if it's the last checklist item in task
//           if (selectedTask.checklistIdx < task.checkListData.length - 1) {
//             // If not, check the next checklist item within the same task
//             if (
//               task.checkListData[selectedTask.checklistIdx + 1].isChecked ===
//               true
//             ) {
//               testVal = true;
//             }
//             return;
//           } else {
//             // If it's the last checklist item in task, check the next task or the first task of the next chapter
//             if (taskIdx < (value as any).tasks.length - 1) {
//               // If not the last task in the current chapter, check the first checklist item of the next task
//               if (
//                 (value as any).tasks[taskIdx + 1].checkListData[0].isChecked ===
//                 true
//               ) {
//                 testVal = true;
//               }
//               return;
//             } else {
//               // If it's the last task in the current chapter, check the first task in the next chapter
//               if (chapterIdx < pluginData.length - 1) {
//                 if (
//                   pluginData[chapterIdx + 1].chapter.tasks[0].checkListData[0]
//                     .isChecked === true
//                 ) {
//                   testVal = true;
//                 }
//                 return;
//               }
//             }
//           }
//         });
//       }
//     }
//   });

//   return testVal;
// };
