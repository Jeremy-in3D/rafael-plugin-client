import { useEffect, useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CheckIcon from "@mui/icons-material/Check";

type OperationalFullChapterListProps = {
  pluginData: any;
  selectedChapters: any[];
  selectedTask: any;
  isShowSoloChecklist: any;
  isEditMode: boolean;
};

export function OperationalFullChapterList({
  pluginData,
  selectedChapters,
  selectedTask,
  isShowSoloChecklist,
  isEditMode,
}: OperationalFullChapterListProps) {
  const [openedChapterContent, setOpenedChatperContent] = useState([]);

  const isShouldShowWorkerOne = isShowSoloChecklist == 1;
  const isShouldShowWorkerTwo = isShowSoloChecklist == 2;

  if (selectedTask && selectedTask.taskIdx) {
    return null;
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      {openedChapterContent.length
        ? openedChapterContent.map((chapter: any, idx: number) => (
            <div
              className="checklist-full-chapter-wrapper"
              style={{
                marginTop: idx > 0 ? "2em" : "",
              }}
              key={`full-chapter-${idx}`}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3em",
                }}
              >
                {chapter?.chapter.name}
              </div>
              <div
                style={{
                  color: "white",
                  // height: "5em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {chapter?.chapter?.tasks.length
                  ? chapter?.chapter?.tasks.map(
                      (task: any, taskIdx: number) => (
                        <div
                          className="checklist-full-chapter-wrapper"
                          style={{
                            borderBottom: "1px solid white",
                          }}
                          key={`chapter/${taskIdx}`}
                        >
                          <div
                            style={{ fontWeight: "bold", fontSize: "1.2em" }}
                          >
                            {task.name}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "0.5em",
                            }}
                          >
                            {isShouldShowWorkerOne ? null : (
                              <div
                                style={{
                                  display: "flex",
                                  borderRight: "1px solid white",
                                  flex: 1,
                                }}
                              >
                                <div style={{ marginLeft: "1em" }}>
                                  {task?.questions["question-2"]?.isChecked ? (
                                    <CheckIcon
                                      sx={{
                                        color: isEditMode ? "red" : "#40e01f",
                                      }}
                                      onClick={() => {
                                        const testThing = [
                                          ...openedChapterContent,
                                        ];
                                        if (isEditMode) {
                                          if (
                                            !checkNextTask(
                                              testThing,
                                              { chapterIdx: idx, taskIdx },
                                              true
                                            )
                                          ) {
                                            (
                                              testThing[idx] as any
                                            ).chapter.tasks[taskIdx].questions[
                                              "question-2"
                                            ].isChecked = false;
                                            setOpenedChatperContent(testThing);
                                          }
                                        }
                                        return;
                                      }}
                                    />
                                  ) : (
                                    <GpsFixedIcon
                                      onClick={() => {
                                        const testThing = [
                                          ...openedChapterContent,
                                        ];
                                        if (
                                          checkPreviousTasks(
                                            testThing,
                                            { chapterIdx: idx, taskIdx },
                                            false
                                          )
                                        ) {
                                          (testThing[idx] as any).chapter.tasks[
                                            taskIdx
                                          ].questions["question-2"].isChecked =
                                            true;
                                          setOpenedChatperContent(testThing);
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    fontSize: "1.2em",
                                  }}
                                >
                                  {task?.questions["question-2"]?.text}
                                </div>
                              </div>
                            )}

                            {isShouldShowWorkerTwo ? null : (
                              <div style={{ display: "flex", flex: 1 }}>
                                <div style={{ marginLeft: "1em" }}>
                                  {task?.questions["question-1"]?.isChecked ? (
                                    <CheckIcon
                                      sx={{
                                        color: isEditMode ? "red" : "#40e01f",
                                      }}
                                      onClick={() => {
                                        const testThing = [
                                          ...openedChapterContent,
                                        ];
                                        if (isEditMode) {
                                          if (
                                            !checkNextTask(
                                              testThing,
                                              { chapterIdx: idx, taskIdx },
                                              true
                                            )
                                          ) {
                                            (
                                              testThing[idx] as any
                                            ).chapter.tasks[taskIdx].questions[
                                              "question-1"
                                            ].isChecked = false;
                                            setOpenedChatperContent(testThing);
                                          }
                                        }
                                        return;
                                      }}
                                    />
                                  ) : (
                                    <GpsFixedIcon
                                      onClick={() => {
                                        const testThing = [
                                          ...openedChapterContent,
                                        ];

                                        // return;
                                        if (
                                          checkPreviousTasks(
                                            testThing,
                                            { chapterIdx: idx, taskIdx },
                                            true
                                          )
                                        ) {
                                          (testThing[idx] as any).chapter.tasks[
                                            taskIdx
                                          ].questions["question-1"].isChecked =
                                            true;
                                          setOpenedChatperContent(testThing);
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                                <div
                                  style={{
                                    width: "100%",
                                    fontSize: "1.2em",
                                  }}
                                >
                                  {task?.questions["question-1"]?.text}
                                </div>
                              </div>
                            )}
                          </div>
                          {/* {taskIdx == chapter?.chapter?.tasks.length - 1 ? (
                            <div style={{ marginTop: "2em", opacity: 0 }}>
                              hello world{" "}
                            </div>
                          ) : null} */}
                        </div>
                      )
                    )
                  : null}
                {/* {chapter?.chapter?.tasks[0].name} */}
              </div>
              {<div style={{ marginTop: "2em", opacity: 0 }}>hello world </div>}
            </div>
          ))
        : null}
    </div>
  );
}

const checkPreviousTasks = (
  pluginData: any,
  selectedTask: any,
  isWorkerOne: boolean
) => {
  const workerQuestion = isWorkerOne ? "question-1" : "question-2";
  let testVal = true;

  pluginData.forEach((chapter: any) => {
    if (!chapter) {
      return false;
    }
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
                ].questions[workerQuestion].isChecked === false
              ) {
                testVal = true;
                return;
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx - 1
                ].questions[workerQuestion].isChecked === false
              ) {
                testVal = false;
                return;
              }
            }
          } else {
            if (selectedTask.taskIdx == 0) {
              if (
                pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks.length -
                    1
                ].questions[workerQuestion].isChecked === false
              ) {
                testVal = false;
                return;
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx - 1
                ].questions[workerQuestion].isChecked === false
              ) {
                testVal = false;
                return;
              }
            }
          }
        });
      }
    }
  });
  return testVal;
};

const checkNextTask = (
  pluginData: any,
  selectedTask: any,
  isWorkerOne: boolean
): boolean => {
  const workerQuestion = isWorkerOne ? "question-1" : "question-2";

  // Get the current and next task information
  const currentChapterIdx = selectedTask.chapterIdx;
  const currentTaskIdx = selectedTask.taskIdx;

  // Check if it's the last task in the chapter
  if (
    currentTaskIdx ===
    pluginData[currentChapterIdx].chapter.tasks.length - 1
  ) {
    // Then check if it's the last chapter or not
    if (currentChapterIdx === pluginData.length - 1) {
      // If it is, there's no next task
      return false;
    } else {
      // If it's not the last chapter, get the first task of the next chapter
      return (
        pluginData[currentChapterIdx + 1].chapter.tasks[0].questions[
          workerQuestion
        ]?.isChecked === true
      );
    }
  } else {
    // If it's not the last task of the current chapter, get the next task in the same chapter
    return (
      pluginData[currentChapterIdx].chapter.tasks[currentTaskIdx + 1].questions[
        workerQuestion
      ]?.isChecked === true
    );
  }
};
