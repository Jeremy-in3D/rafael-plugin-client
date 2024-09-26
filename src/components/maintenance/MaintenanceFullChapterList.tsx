import { useState, useEffect } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CheckIcon from "@mui/icons-material/Check";

type MaintenanceFullChapterListProps = {
  pluginData: any;
  selectedChapters: any[];
  selectedTask: any;
};

export function MaintenanceFullChapterList({
  pluginData,
  selectedChapters,
  selectedTask,
}: MaintenanceFullChapterListProps) {
  const [openedChapterContent, setOpenedChatperContent] = useState([]);

  if (false) {
    console.log(pluginData, selectedTask, selectedChapters);
  }

  useEffect(() => {
    if (!selectedChapters.length) {
      return;
    }
    // console.log(selectedChapters);
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

  //   console.log({ openedChapterContent });
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
                                          sx={{ color: "#40e01f" }}
                                          style={{ marginLeft: "2em" }}
                                        />
                                      ) : (
                                        <GpsFixedIcon
                                          style={{ marginLeft: "2em" }}
                                          onClick={() => {
                                            const testThing = [
                                              ...openedChapterContent,
                                            ];
                                            // console.log({ testThing });
                                            // console.log({ checkData });
                                            // console.log({
                                            //   checkData,
                                            //   checklistIdx,
                                            // });
                                            if (
                                              checkPreviousTasks(testThing, {
                                                chapterIdx,
                                                taskIdx,
                                                checklistIdx,
                                              })
                                            ) {
                                              // testThing[chapterIdx].chapter.tasks[taskIdx]
                                              //   console.log(
                                              //     "WE IN!",
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
                                              console.log("OUT WE ARE!");
                                            }
                                          }}
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

const checkPreviousTasks = (pluginData: any, selectedTask: any) => {
  let testVal = true;

  pluginData.forEach((chapter: any, chapterIdx: number) => {
    if (!chapter) {
      return false;
    }
    // console.log({ chapter });
    for (const [key, value] of Object.entries(chapter)) {
      if (key == "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (taskIdx != selectedTask.taskIdx) {
            return;
          }
          if (selectedTask.chapterIdx == 0) {
            if (selectedTask.taskIdx == 0) {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                console.log("WELL HOW BOUT THADY");
                // logic here for chapter == 0 and task == 0 and multiple questions in task
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.map((question: any, questionIdx: number) => {
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
                console.log("WELL HOW BOUT THADY num 44");
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
