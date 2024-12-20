// import { useAppContext } from "../../context/appContext";
import { Chapters } from "./Chapters";
import { useState, useEffect } from "react";

export function Maintenance({
  setTypeOfChecklist,
  pluginData,
  typeOfChecklist,
}: any) {
  const [tasksPerChapter, setTasksPerChapter] = useState<any>({});
  const [sortedData, setSortedData] = useState<any[]>([]);

  // const { firstChecklistItemText, setFirstChecklistItemText }: any =
  //   useAppContext();

  // Extract and sort the data only on the first render or when pluginData changes
  useEffect(() => {
    const maintenancePluginData = pluginData.filter(
      (item: any) => item.name === "maintenance"
    );

    // function extractChapterNumber(chapterName: any) {
    //   const match = chapterName.match(/פרק\s(\d+)/);
    //   return match ? parseInt(match[1], 10) : Infinity;
    // }

    // const sortedData = maintenancePluginData.sort((a: any, b: any) => {
    //   const numA = extractChapterNumber(a.chapter.name);
    //   const numB = extractChapterNumber(b.chapter.name);
    //   return numA - numB;
    // });

    setSortedData(maintenancePluginData);
  }, [pluginData]);

  useEffect(() => {
    const newTasksPerChapter: any = {};

    sortedData.forEach((chapter, idx) => {
      const chapterElement = {
        name: `chapter-${idx + 1}`,
        tasks: chapter?.tasks?.length,
      };
      newTasksPerChapter[`chapter-${idx + 1}`] = chapterElement;
    });

    setTasksPerChapter(newTasksPerChapter);

    // if(!firstChecklistItemText.maintenance)
    // if (firstChecklistItemText && !firstChecklistItemText.maintenance) {
    //   // setFirstChecklistItemText.maintenance
    //   console.log(pluginData[0].chapter.tasks[0]);
    // }
  }, [sortedData, pluginData]);

  if (false) {
    console.log(tasksPerChapter);
  }

  return (
    <Chapters
      setTypeOfChecklist={setTypeOfChecklist}
      title={"Maintenance"}
      pluginData={sortedData}
      typeOfChecklist={typeOfChecklist}
    />
  );
}
