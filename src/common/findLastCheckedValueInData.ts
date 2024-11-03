export function findFirstUncheckedTask(chapters: any) {
  let foundLastChecked = false;
  let firstUnchecked = null;
  let lastChecked = null;

  for (let chapterObj of chapters) {
    const chapterName = chapterObj.chapter.name;

    for (let task of chapterObj.chapter.tasks) {
      for (let checklist of task.checkListData) {
        if (!checklist.isChecked && !foundLastChecked) {
          // Capture first unchecked task
          if (!firstUnchecked) {
            firstUnchecked = { chapterName, task };
          }
        }

        if (checklist.isChecked) {
          foundLastChecked = true;
          lastChecked = { chapterName, task };
        }

        if (foundLastChecked && !checklist.isChecked) {
          return { chapterName, task };
        }
      }
    }
  }

  // If the first task is unchecked, return it
  if (firstUnchecked) {
    return firstUnchecked;
  }

  // If the last task is checked, return it
  return lastChecked;
}

export function isReadyToStartNewChapter(chapters: any) {
  let lastCheckedChapter = null;
  let lastCheckedTask = null;
  let lastCheckedChecklist = null;

  for (let chapterObj of chapters) {
    const chapterName = chapterObj.chapter.name;
    const tasks = chapterObj.chapter.tasks;

    for (let task of tasks) {
      for (let checklist of task.checkListData) {
        if (checklist.isChecked) {
          lastCheckedChapter = chapterName;
          lastCheckedTask = task;
          lastCheckedChecklist = checklist;
        }
      }
    }
  }

  // If we found a checked task, see if it's the last task of the chapter
  if (lastCheckedTask && lastCheckedChecklist) {
    const chapterTasks = chapters.find(
      (chapter: any) => chapter.chapter.name === lastCheckedChapter
    ).chapter.tasks;
    const isLastTaskInChapter =
      chapterTasks[chapterTasks.length - 1] === lastCheckedTask;
    const lastChecklistData =
      lastCheckedTask.checkListData[lastCheckedTask.checkListData.length - 1];

    // Check if the last checklist item in the task is true
    if (isLastTaskInChapter && lastChecklistData.isChecked) {
      return true;
    }
  }

  return false;
}
