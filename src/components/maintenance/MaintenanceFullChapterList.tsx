import { useState, useEffect } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import { CompareSharp } from "@mui/icons-material";
import {
  checkNextTasks,
  checkPreviousTasks,
} from "./logic/checkTasksForChecklist";

type MaintenanceFullChapterListProps = {
  pluginData: any;
  selectedChapters: any[];
  selectedTask: any;
  isEditMode: boolean;
};

export function MaintenanceFullChapterList({
  pluginData,
  selectedChapters,
  selectedTask,
  isEditMode,
}: MaintenanceFullChapterListProps) {
  const [openedChapterContent, setOpenedChatperContent] = useState([]);

  if (false) {
    console.log(pluginData, selectedTask, selectedChapters);
  }

  useEffect(() => {
    if (!selectedChapters.length) {
      return;
    }
    const chapterData: any = [];
    pluginData.forEach((chapter: any, idx: number) => {
      if (selectedChapters.includes(idx)) {
        chapterData.push(chapter);
      }
    });

    setOpenedChatperContent(chapterData);
  }, [selectedChapters]);

  if (selectedTask && (selectedTask?.taskIdx || selectedTask.taskIdx == 0)) {
    return null;
  }

  return (
    <div>
      <div>
        {openedChapterContent.length
          ? openedChapterContent.map((chapter: any, chapterIdx: number) => (
              <div
                style={{
                  color: "white",
                  borderBottom: "1px solid white",
                  padding: "3px",
                  marginTop: chapterIdx == 0 ? "2em" : "1.5em",
                }}
                key={`chapter${chapterIdx}`}
              >
                <div style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                  {chapter.chapter.name}
                </div>
                <div>
                  {chapter.chapter.tasks.length
                    ? chapter.chapter.tasks.map((task: any, taskIdx: any) => (
                        <span key={`task${taskIdx}`}>
                          <div
                            style={{
                              fontSize: "1.2em",
                              fontWeight: "bold",
                              marginTop: taskIdx == 0 ? "2em" : "0.5em",
                            }}
                          >
                            {task.name}
                          </div>
                          <div>
                            {task.checkListData.length
                              ? task.checkListData.map(
                                  (checkData: any, checklistIdx: any) => (
                                    <div
                                      key={`checkdata${checklistIdx}`}
                                      style={{
                                        // width: "80%",
                                        // marginTop: "0.5em",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        borderBottom:
                                          "1px solid rgb(255,255,255,0.4)",
                                        alignItems: "center",
                                        padding: "2px",
                                        marginTop:
                                          checklistIdx > 0 ? "1em" : "0.5em",
                                      }}
                                    >
                                      {checkData.isChecked ? (
                                        <CheckIcon
                                          sx={{
                                            color: isEditMode
                                              ? "red"
                                              : "#40e01f",
                                          }}
                                          style={{ marginLeft: "2em" }}
                                          onClick={() => {
                                            if (isEditMode) {
                                              const testThing = [
                                                ...openedChapterContent,
                                              ];
                                              if (
                                                !checkNextTasks(pluginData, {
                                                  chapterIdx,
                                                  taskIdx,
                                                  checklistIdx,
                                                })
                                              ) {
                                                (
                                                  testThing[chapterIdx] as any
                                                ).chapter.tasks[
                                                  taskIdx
                                                ].checkListData[
                                                  checklistIdx
                                                ].isChecked = false;
                                                //   );
                                                setOpenedChatperContent(
                                                  testThing
                                                );
                                              } else {
                                                console.log(". ");
                                              }
                                            }
                                          }}
                                        />
                                      ) : checkPreviousTasks(pluginData, {
                                          chapterIdx,
                                          taskIdx,
                                          checklistIdx,
                                        }) ? (
                                        <GpsFixedIcon
                                          style={{ marginLeft: "2em" }}
                                          onClick={() => {
                                            const testThing = [
                                              ...openedChapterContent,
                                            ];

                                            if (
                                              checkPreviousTasks(testThing, {
                                                chapterIdx,
                                                taskIdx,
                                                checklistIdx,
                                              })
                                            ) {
                                              (
                                                testThing[chapterIdx] as any
                                              ).chapter.tasks[
                                                taskIdx
                                              ].checkListData[
                                                checklistIdx
                                              ].isChecked = true;
                                              //   );
                                              setOpenedChatperContent(
                                                testThing
                                              );
                                            } else {
                                              console.log("out");
                                            }
                                          }}
                                        />
                                      ) : (
                                        <RadioButtonUncheckedIcon
                                          style={{ marginLeft: "2em" }}
                                          // onClick={() => {
                                          //   console.log(
                                          //     "THE FUNCTION: ",
                                          //     checkPreviousTasks(pluginData, {
                                          //       chapterIdx,
                                          //       taskIdx,
                                          //       checklistIdx,
                                          //     })
                                          //   );
                                          // }}
                                        />
                                      )}
                                      <div
                                        style={{
                                          marginRight: "3em",
                                          fontSize: "1.1em",
                                        }}
                                      >
                                        {checkData.name}
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </span>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
      </div>
      <div style={{ marginTop: "2em", opacity: 0 }}>hello world</div>
    </div>
  );
}
