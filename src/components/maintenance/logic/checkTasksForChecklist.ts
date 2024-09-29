// these functions check to see if the previous/next task you click was checked or not.
// While normally against comments, this is a brief explanation of the possible cases covered here:
// both functions follow this logic to cover all the options in that way: check chapter -> check tasks -> check questions
// for example: first category, if chapter is 0 or not ( if (selectedTask.chapterIdx == 0) ):
// second is if chapter is not 0, check last question of last task of the previous chapter.

export const checkPreviousTasks = (pluginData: any, selectedTask: any) => {
  let testVal = true;

  pluginData.forEach((chapter: any) => {
    if (!chapter) {
      return false;
    }
    for (const [key, value] of Object.entries(chapter)) {
      if (key == "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (false) console.log(task);
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
                // logic here for chapter == 0 and task == 0 and multiple questions in task
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.map((question: any, questionIdx: number) => {
                  if (false) {
                    console.log(question);
                  }
                  if (selectedTask.checklistIdx == 0) {
                    testVal = true;
                    return;
                  } else {
                    if (
                      pluginData[selectedTask.chapterIdx].chapter?.tasks[
                        selectedTask.taskIdx
                      ]?.checkListData[questionIdx - 1] == false
                    ) {
                      testVal = false;
                      return;
                    }
                  }
                });
              } else {
                if (
                  pluginData[selectedTask.chapterIdx]?.chapter.tasks[
                    selectedTask.taskIdx
                  ]?.checkListData[0]?.isChecked == false
                ) {
                  testVal = true;
                  return;
                }
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter?.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.length > 1
              ) {
                // logic for chapter = 0, but task > 0 and multiple questions in task

                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.map((question: any, questionIdx: number) => {
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
                      ]?.checkListData[questionIdx - 1] == false
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
                  ]?.checkListData[0]?.isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              }
            }
          } else {
            if (selectedTask.taskIdx == 0) {
              const chapterNotZeroTaskIsZeroAndMultipleQuestionsTask =
                pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks.length -
                    1
                ]?.checkListData.length > 1;
              //  logic here for first task in chapter > 0, task == 0 and where multiple questions per task
              if (chapterNotZeroTaskIsZeroAndMultipleQuestionsTask) {
                if (
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                    pluginData[selectedTask.chapterIdx - 1].chapter.tasks
                      .length - 1
                  ]?.checkListData[
                    pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                      pluginData[selectedTask.chapterIdx - 1].chapter.tasks
                        .length - 1
                    ]?.checkListData.length - 1
                  ].isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              } else {
                if (
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                    pluginData[selectedTask.chapterIdx - 1].chapter.tasks
                      .length - 1
                  ]?.checkListData[0]?.isChecked == false
                ) {
                  testVal = false;
                  return;
                }
              }
            } else {
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ]?.checkListData.length > 1
              ) {
                pluginData[selectedTask.chapterIdx]?.chapter?.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.forEach((item: any, idx: number) => {
                  if (false) console.log(item);
                  if (idx != selectedTask.checklistIdx) {
                    // testVal = false;
                    return;
                  }
                  if (idx == 0) {
                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask?.taskIdx - 1
                      ]?.checkListData[
                        pluginData[selectedTask.chapterIdx].chapter?.tasks[
                          selectedTask?.taskIdx - 1
                        ]?.checkListData.length - 1
                      ].isChecked == false
                    ) {
                      testVal = false;
                      return;
                    }
                  } else if (idx > 0) {
                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask.taskIdx
                      ]?.checkListData[
                        pluginData[selectedTask.chapterIdx].chapter.tasks[
                          selectedTask.taskIdx - 1
                        ]?.checkListData.length - 1
                      ].isChecked == false
                    ) {
                      testVal = false;
                      return;
                    }
                  }
                });

                // logic here where chapter > 0 and task > 0 and multipl questions per task
              } else {
                if (
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx - 1
                  ]?.checkListData[0]?.isChecked == false
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

export const checkNextTasks = (pluginData: any, selectedTask: any) => {
  let testVal = false;

  pluginData.forEach((chapter: any, chapterIdx: number) => {
    if (!chapter) {
      return false;
    }

    for (const [key, value] of Object.entries(chapter)) {
      if (key === "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (
            chapterIdx !== selectedTask.chapterIdx ||
            taskIdx !== selectedTask.taskIdx
          ) {
            // If it's not the current selected task, continue
            return;
          }

          // Check if it's the last checklist item in task
          if (selectedTask.checklistIdx < task.checkListData.length - 1) {
            // If not, check the next checklist item within the same task
            if (
              task.checkListData[selectedTask.checklistIdx + 1].isChecked ===
              true
            ) {
              testVal = true;
            }
            return;
          } else {
            // If it's the last checklist item in task, check the next task or the first task of the next chapter
            if (taskIdx < (value as any).tasks.length - 1) {
              // If not the last task in the current chapter, check the first checklist item of the next task
              if (
                (value as any).tasks[taskIdx + 1].checkListData[0].isChecked ===
                true
              ) {
                testVal = true;
              }
              return;
            } else {
              // If it's the last task in the current chapter, check the first task in the next chapter
              if (chapterIdx < pluginData.length - 1) {
                if (
                  pluginData[chapterIdx + 1].chapter.tasks[0].checkListData[0]
                    .isChecked === true
                ) {
                  testVal = true;
                }
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
