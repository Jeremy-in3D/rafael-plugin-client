// these functions check to see if the previous/next task you click was checked or not.
// While normally against comments, this is a brief explanation of the possible cases covered here:
// both functions follow this logic to cover all the options in that way: check chapter -> check tasks -> check questions
// for example: first category, if chapter is 0 or not ( if (selectedTask.chapterIdx == 0) ):
// second is if chapter is not 0, check last question of last task of the previous chapter.

export const checkPreviousTasks = (
  pluginData: any,
  selectedTask: any,
  maintenanceCompletedChapters: any,
  selectedChapters: any,
  isRelevantTask?: any,
  isOnClick?: any,
  copiedPluginData?: any
  // setCurrentQuestionHeaderText?: any
) => {
  let testVal = true;

  if (isRelevantTask) {
    // console.log({ selectedTask, selectedChapters });
  }

  // console.log({c})

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
                if (isOnClick)
                  console.log("first case where chapter = 0 and task = 0");
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
                if (isOnClick) {
                  // console.log({ pluginData });
                  console.log(" well this is getting weird");
                  // console.log({ selectedTask });
                  // console.log({ selectedChapters });
                  // console.log({ maintenanceCompletedChapters });
                  // console.log({ copiedPluginData });

                  if (
                    selectedChapters.length == 1 &&
                    selectedChapters[0] != 0
                  ) {
                    const lastQuestionInPreviousChapterData =
                      copiedPluginData[selectedChapters[0] - 1]?.chapter?.tasks[
                        copiedPluginData[selectedChapters[0] - 1]?.chapter
                          ?.tasks.length - 1
                      ].checkListData;

                    if (
                      lastQuestionInPreviousChapterData[
                        copiedPluginData[selectedChapters[0] - 1]?.chapter
                          ?.tasks[
                          copiedPluginData[selectedChapters[0] - 1]?.chapter
                            ?.tasks.length - 1
                        ].checkListData.length - 1
                      ].isChecked == false
                    ) {
                      testVal = false;
                      return;
                    }
                  } else if (selectedChapters.length > 1) {
                    if (selectedChapters.includes(0)) {
                      // console.log(
                      //   pluginData[0].chapter.tasks[0].checkListData[0]
                      //     .isChecked
                      // );
                      const firstChapterTaskIsChecked =
                        pluginData[0].chapter.tasks[0].checkListData[0]
                          .isChecked;
                      if (!firstChapterTaskIsChecked) {
                        testVal = true;
                        return;
                      }
                    }

                    const firtChapterInOpenedChapters = Math.min(
                      ...selectedChapters
                    );
                    const lastQuestionInPreviousChapterData =
                      copiedPluginData[firtChapterInOpenedChapters - 1]?.chapter
                        ?.tasks[
                        copiedPluginData[firtChapterInOpenedChapters - 1]
                          ?.chapter?.tasks.length - 1
                      ].checkListData[
                        copiedPluginData[firtChapterInOpenedChapters - 1]
                          ?.chapter?.tasks[
                          copiedPluginData[firtChapterInOpenedChapters - 1]
                            ?.chapter?.tasks.length - 1
                        ].checkListData.length - 1
                      ].isChecked;

                    // console.log("HOLOLO: ", lastQuestionInPreviousChapterData);

                    if (!lastQuestionInPreviousChapterData) {
                      testVal = false;
                      return;
                    }
                  }
                }

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
              // if (isOnClick) console.log("now this is getting super weird");
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
              // console.log("other case where chapter > 0 but task is === 0");
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
                // login for task == 0 and chapter > 0 (and only 1 question per task)

                // const testVal = '
                if (
                  !selectedChapters?.length &&
                  !maintenanceCompletedChapters?.length
                ) {
                  testVal = false;
                  return;
                }

                if (
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                    pluginData[selectedTask.chapterIdx - 1].chapter.tasks
                      .length - 1
                  ]?.checkListData[0]?.isChecked == false ||
                  // !isSequential(selectedChapters)
                  !selectedChapters.includes(
                    maintenanceCompletedChapters[
                      maintenanceCompletedChapters.length - 1
                    ] + 1
                  )
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
                // console.log("HOW DO I CHECK THIS?>?");
                pluginData[selectedTask.chapterIdx]?.chapter?.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.forEach((item: any, idx: number) => {
                  if (false) console.log(item);
                  if (idx != selectedTask.checklistIdx) {
                    // testVal = false;
                    return;
                  }
                  if (idx == 0) {
                    // console.log("ANNND THIS?????!!");
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

  console.log("in checkNextTask function in edit mode");

  pluginData.forEach((chapter: any, chapterIdx: number) => {
    if (!chapter) {
      return false;
    }

    for (const [key, value] of Object.entries(chapter)) {
      // if ((testVal = true)) {
      //   return;
      // }
      if (key === "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (
            chapterIdx !== selectedTask.chapterIdx ||
            taskIdx !== selectedTask.taskIdx
          ) {
            // If it's not the current selected task, continue
            console.log("in 1");
            return;
          }

          // Check if it's the last checklist item in task
          if (selectedTask.checklistIdx < task.checkListData.length - 1) {
            console.log("in 2");
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
              console.log("in 3");
              // If not the last task in the current chapter, check the first checklist item of the next task
              if (
                (value as any).tasks[taskIdx + 1].checkListData[0].isChecked ===
                true
              ) {
                console.log((value as any).tasks[taskIdx + 1].checkListData[0]);
                console.log("in 3.4");
                testVal = false;
                return;
              }
              console.log("in 3.8");
            } else {
              console.log("in 4");
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

// function isSequential(arr: any) {
//   // Sort the array and check each element is the previous one + 1
//   const sorted = [...arr].sort((a, b) => a - b);
//   for (let i = 1; i < sorted.length; i++) {
//     if (sorted[i] !== sorted[i - 1] + 1) {
//       return false;
//     }
//   }
//   return true;
// }
