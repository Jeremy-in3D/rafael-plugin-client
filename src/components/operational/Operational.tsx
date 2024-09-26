import { useState, useEffect } from "react";
import { Chapters } from "../maintenance/Chapters";

export function Operational({ setTypeOfChecklist, pluginData }: any) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  // const [tasksPerChapter, setQuestionsPerChapter] = useState<any>(null);
  // const [questionsPerTask, setQuestionsPerTask] = useState<any>(null);
  const [sortedData, setSortedData] = useState<any[]>([]);

  // const operationalPluginData = [...pluginData].filter(
  //   (item) => item.name === "operational"
  // );

  useEffect(() => {
    const operationalPluginData = [...pluginData].filter(
      (item) => item.name === "operational"
    );

    function extractChapterNumber(chapterName: any) {
      const match = chapterName.match(/פרק\s(\d+)/);
      return match ? parseInt(match[1], 10) : Infinity;
    }

    const sortedData = operationalPluginData.sort((a: any, b: any) => {
      const numA = extractChapterNumber(a.chapter.name);
      const numB = extractChapterNumber(b.chapter.name);
      return numA - numB;
    });

    setSortedData(sortedData);
  }, [pluginData]);

  return (
    <div style={{ height: "100%" }}>
      {/* <h2>Operational Lists</h2> */}
      <Chapters
        setTypeOfChecklist={setTypeOfChecklist}
        title={"Operational"}
        pluginData={sortedData}
        setCurrentQuestion={setCurrentQuestion}
      />
    </div>
  );
}
