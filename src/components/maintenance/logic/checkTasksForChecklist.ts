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
  copiedPluginData?: any,
  currentTaskText?: any
  // setCurrentQuestionHeaderText?: any
  // setCurrentQuestionHeaderText?: any
) => {
  let testVal = true;

  if (isRelevantTask) {
    // console.log({ selectedTask, selectedChapters });
  }

  if (!copiedPluginData) {
    return;
  }

  if (!findPreviousItemStatus(copiedPluginData, currentTaskText)) {
    return false;
  } else {
    return true;
  }

  pluginData.forEach((chapter: any, overChapterIdx: number) => {
    if (!chapter) {
      return false;
    }
    for (const [key, value] of Object.entries(chapter)) {
      if (key == "chapter") {
        // if (testVal == true && isOnClick) {
        //   console.log("JABUYA");
        //   return;
        // }
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (false) console.log(task);

          if (
            taskIdx != selectedTask.taskIdx &&
            overChapterIdx != selectedTask.chapterIdx
          ) {
            return;
          }

          if (selectedTask.chapterIdx == 0) {
            if (selectedTask.taskIdx == 0) {
              console.log("in 1 baby");
              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].checkListData.length > 1
              ) {
                // logic here for chapter == 0 and task == 0 and multiple questions in task
                if (isOnClick)
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx
                  ]?.checkListData?.map(
                    (question: any, questionIdx: number) => {
                      if (false) {
                        console.log(question);
                      }
                      if (selectedTask.checklistIdx == 0) {
                        testVal = true;
                        return testVal;
                      } else {
                        if (
                          pluginData[selectedTask.chapterIdx].chapter?.tasks[
                            selectedTask.taskIdx
                          ]?.checkListData[questionIdx - 1] == false
                        ) {
                          testVal = false;
                          return testVal;
                        }
                      }
                    }
                  );
              } else {
                console.log("in 2 baby");

                if (isOnClick) {
                  if (
                    selectedChapters.length == 1 &&
                    selectedChapters[0] != 0
                  ) {
                    if (
                      !copiedPluginData &&
                      !copiedPluginData[selectedChapters[0]]
                    ) {
                      return;
                    }
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
                      return testVal;
                    }
                  } else if (selectedChapters.length > 1) {
                    console.log("in 3 baby");

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
                        return testVal;
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

                    console.log("HOLOLO: ", lastQuestionInPreviousChapterData);

                    if (!lastQuestionInPreviousChapterData) {
                      testVal = false;
                      return testVal;
                    }
                  }
                }

                if (
                  pluginData[selectedTask.chapterIdx]?.chapter.tasks[
                    selectedTask.taskIdx
                  ]?.checkListData[0]?.isChecked == false
                ) {
                  testVal = true;
                  return testVal;
                }
              }
            } else {
              console.log("in 4 baby");

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

                    return testVal;
                  } else {
                    console.log("in 5 baby");

                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask.taskIdx
                      ]?.checkListData[questionIdx - 1] == false
                    ) {
                      testVal = false;
                      return testVal;
                    }
                  }
                });
              } else {
                console.log("in 6 baby");

                if (
                  pluginData[selectedTask.chapterIdx].chapter.tasks[
                    selectedTask.taskIdx - 1
                  ]?.checkListData[0]?.isChecked == false
                ) {
                  testVal = false;
                  return testVal;
                }
              }
            }
          } else {
            if (selectedTask.taskIdx == 0) {
              console.log("in 7 baby");

              const chapterNotZeroTaskIsZeroAndMultipleQuestionsTask =
                pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks.length -
                    1
                ]?.checkListData.length > 1;
              //  logic here for first task in chapter > 0, task == 0 and where multiple questions per task
              // console.log("other case where chapter > 0 but task is === 0");
              if (chapterNotZeroTaskIsZeroAndMultipleQuestionsTask) {
                console.log("in 7.5");
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
                  console.log("in 7.8");
                  testVal = false;
                  return testVal;
                }
              } else {
                // login for task == 0 and chapter > 0 (and only 1 question per task)
                console.log("in 8 baby");

                // const testVal = '
                if (
                  !selectedChapters?.length &&
                  !maintenanceCompletedChapters?.length
                ) {
                  console.log("in 8.2");
                  testVal = false;
                  return testVal;
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
                  console.log("in 8.7");

                  console.log({ currentTaskText });

                  const isNextItemCheckedTest = findNextIsCheckedValue(
                    copiedPluginData,
                    currentTaskText
                  );

                  console.log("THIS IS TEST FUNCTION 5 ", {
                    isNextItemCheckedTest,
                  });

                  if (isNextItemCheckedTest) {
                    testVal = false;
                    console.log("JAJAJA YES");
                    return testVal;
                  } else {
                    console.log("JAJAJA no!");
                    testVal = true;
                    return testVal;
                  }

                  // testVal = false;
                  // return testVal;
                }
                // testVal = false;
                // return testVal;
              }
            } else {
              console.log("in 9 baby");

              if (
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ]?.checkListData.length > 1
              ) {
                // console.log("in 9.2");
                // console.log("HOW DO I CHECK THIS?>?");
                pluginData[selectedTask.chapterIdx]?.chapter?.tasks[
                  selectedTask.taskIdx
                ]?.checkListData?.forEach((item: any, idx: number) => {
                  if (false) console.log(item);
                  if (idx != selectedTask.checklistIdx) {
                    // testVal = false;
                    // console.log("in 9.4");
                    return;
                  }
                  if (idx == 0) {
                    // console.log("in 9.6");
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
                      // console.log("in 9.9");
                      testVal = false;
                      return;
                    }
                  } else if (idx > 0) {
                    // console.log("in 9.9");
                    if (
                      pluginData[selectedTask.chapterIdx].chapter.tasks[
                        selectedTask.taskIdx
                      ]?.checkListData[
                        pluginData[selectedTask.chapterIdx].chapter.tasks[
                          selectedTask.taskIdx - 1
                        ]?.checkListData.length - 1
                      ].isChecked == false
                    ) {
                      // console.log("in 10");
                      testVal = false;
                      return;
                    }
                  }
                });

                // logic here where chapter > 0 and task > 0 and multipl questions per task
              } else {
                // console.log("in 11");
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

  if (
    selectedChapters.length == 2 &&
    selectedChapters.includes(0) &&
    selectedChapters.includes(1) &&
    selectedTask.taskIdx == 0 &&
    selectedTask.checklistIdx == 0
  ) {
    console.log("would rather not be going in here");
    if (
      copiedPluginData[0].chapter.tasks[
        copiedPluginData[0].chapter.tasks.length - 1
      ].checkListData[
        copiedPluginData[0].chapter.tasks[
          copiedPluginData[0].chapter.tasks.length - 1
        ].checkListData.length - 1
      ].isChecked
    ) {
      console.log("this would make no sense");
      testVal = true;
      return testVal;
    }
  }
  console.log("make it to the ending here: ", testVal);
  return testVal;
};

export const checkNextTasks = (
  pluginData: any,
  selectedTask: any,
  selectedChapters: any,
  copiedPluginData: any,
  // tasksArr: any,
  // currentTaskData: any,
  currentTaskText: any,
  isOnClick?: boolean,
  isLastItemInTaskArray?: any
) => {
  let testVal = false;

  // if (isOnClick) console.log("in checkNextTask function in edit mode");

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
            // console.log("in 1");
            // console.log({ selectedTask, chapterIdx, taskIdx });
            // console.log(tasksArr);
            // console.log(tasksArr[tasksArr.length - 1]);
            // console.log(currentTaskText);
            if (selectedChapters.length >= 1) {
            }
            // console.log("why am I in this first condition");
            return;
          }

          // Check if it's the last checklist item in task
          if (selectedTask.checklistIdx < task.checkListData.length - 1) {
            // console.log("in 2");
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
                // console.log((value as any).tasks[taskIdx + 1].checkListData[0]);
                if (isOnClick) {
                  const isNextItemCheckedTest = findNextIsCheckedValue(
                    copiedPluginData,
                    currentTaskText
                  );
                  // console.log("first function", { isNextItemCheckedTest });

                  if (isNextItemCheckedTest) {
                    testVal = true;
                    return testVal;
                  } else {
                    testVal = false;
                    return testVal;
                  }
                }

                testVal = true;
                return testVal;
              }
            } else {
              // If it's the last task in the current chapter, check the first task in the next chapter
              if (chapterIdx < pluginData.length - 1) {
                if (
                  copiedPluginData[chapterIdx + 1].chapter.tasks[0]
                    .checkListData[0].isChecked === true
                ) {
                  if (isOnClick) {
                    const isNextItemCheckedTest = findNextIsCheckedValue(
                      copiedPluginData,
                      currentTaskText
                    );
                    // console.log("second function: ", { isNextItemCheckedTest });
                    if (isNextItemCheckedTest) {
                      testVal = true;
                      return testVal;
                    } else {
                      testVal = false;
                      return testVal;
                    }
                  }
                  testVal = true;
                  return testVal;
                }
                return;
              }
            }
          }
        });
      }
    }
  });

  if (isLastItemInTaskArray?.isLastTaskInChapter) {
    const extraCheckForIfIsNextItemCheckedIfItsLastItem =
      findFirstTaskAfterText(copiedPluginData, currentTaskText);
    // console.log("third function", {
    //   extraCheckForIfIsNextItemCheckedIfItsLastItem,
    // });

    if (extraCheckForIfIsNextItemCheckedIfItsLastItem) {
      testVal = true;
      return testVal;
    } else {
      testVal = false;
      return testVal;
    }
  }
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
function findFirstTaskAfterText(chapters: any, searchText: any) {
  for (let i = 0; i < chapters.length - 1; i++) {
    // Get the last task and its last checkListData element
    if (chapters[i].chapter.tasks.length > 0) {
      const lastTask =
        chapters[i].chapter.tasks[chapters[i].chapter.tasks.length - 1];

      if (lastTask.checkListData.length > 0) {
        const lastCheckListItem =
          lastTask.checkListData[lastTask.checkListData.length - 1];

        // Compare checkList item's name to the search text
        if (lastCheckListItem.name === searchText) {
          // Return the first task of the next chapter
          return chapters[i + 1].chapter.tasks[0].checkListData[
            chapters[i + 1].chapter.tasks[0].checkListData.length - 1
          ].isChecked;
        }
      }
    }
  }

  // If no match is found, return null or an appropriate value
  return null;
}

function findNextIsCheckedValue(array: any, searchText: any) {
  // console.log("its a start: ", searchText);
  // console.log("nother start: ", array);
  for (let i = 0; i < array.length; i++) {
    const chapter = array[i].chapter;
    for (let j = 0; j < chapter.tasks.length; j++) {
      const task = chapter.tasks[j];
      for (let k = 0; k < task.checkListData.length; k++) {
        const checkListItem = task.checkListData[k];

        if (checkListItem.name === searchText) {
          // Check if it's not the last item in the current task's checklist
          if (k < task.checkListData.length - 1) {
            // console.log("find: 1: ", task.checkListData[k + 1]);
            return task.checkListData[k + 1].isChecked;
          } else {
            // It's the last item in the checklist, look for the next task
            if (j < chapter.tasks.length - 1) {
              // console.log(chapter.tasks);
              // console.log("find: 2: ", task.checkListData[j + 1]);

              return chapter.tasks[j + 1].checkListData[0].isChecked;
            } else if (i < array.length - 1) {
              // Check the first task of the next chapter
              // console.log("find: 3: ", task.checkListData[i + 1]);

              return array[i + 1].chapter.tasks[0].checkListData[0].isChecked;
            } else {
              // console.log("lsat poissible option");
              // It's the last task of the last chapter, no more tasks or checklists
              return null;
            }
          }
        }
      }
    }
  }

  // If no match is found, return null or an appropriate value
  return null;
}

function findPreviousItemStatus(data: any, textToFind: any) {
  // console.log(data[0].chapter.tasks[0].checkListData[0].name == textToFind);

  if (data[0].chapter.tasks[0].checkListData[0].name == textToFind) {
    if ((data[0].chapter.tasks[0].checkListData[0].isChecked = false)) {
      return false;
    } else {
      return true;
    }
  }

  for (let chapterIndex = 0; chapterIndex < data.length; chapterIndex++) {
    const chapter = data[chapterIndex];
    for (
      let taskIndex = 0;
      taskIndex < chapter.chapter.tasks.length;
      taskIndex++
    ) {
      const task = chapter.chapter.tasks[taskIndex];
      for (
        let checkIndex = 0;
        checkIndex < task.checkListData.length;
        checkIndex++
      ) {
        const checkItem = task.checkListData[checkIndex];

        if (checkItem.name === textToFind) {
          // Found the item to find, now determine the previous checkListData's isChecked value
          if (checkIndex > 0) {
            // There's a previous item in the current task's checkListData
            return task.checkListData[checkIndex - 1].isChecked;
          } else if (taskIndex > 0) {
            // Current checklist item is the first in the task, look at the previous task
            const previousTask = chapter.chapter.tasks[taskIndex - 1];
            return previousTask.checkListData[
              previousTask.checkListData.length - 1
            ].isChecked;
          } else if (chapterIndex > 0) {
            // Current checklist item is the first in chapter, look at the previous chapter's last task
            const previousChapter = data[chapterIndex - 1];
            const lastTask =
              previousChapter.chapter.tasks[
                previousChapter.chapter.tasks.length - 1
              ];
            return lastTask.checkListData[lastTask.checkListData.length - 1]
              .isChecked;
          } else {
            // This is the very first checkListData item in the array
            return checkItem.isChecked;
          }
        }
      }
    }
  }
  return null; // If the textToFind wasn't found
}
