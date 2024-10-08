import { useState, useEffect } from "react";
import { Chapters } from "../maintenance/Chapters";

export function Operational({
  setTypeOfChecklist,
  pluginData,
  typeOfChecklist,
}: any) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [sortedData, setSortedData] = useState<any[]>([]);

  useEffect(() => {
    const operationalPluginData = [...pluginData].filter(
      (item) => item.name === "operational"
    );
    // this is to ensure the chapters are shown in
    // function extractChapterNumber(chapterName: any) {
    //   const match = chapterName.match(/פרק\s(\d+)/);
    //   return match ? parseInt(match[1], 10) : Infinity;
    // }

    // const sortedData = operationalPluginData.sort((a: any, b: any) => {
    //   const numA = extractChapterNumber(a.chapter.name);
    //   const numB = extractChapterNumber(b.chapter.name);
    //   return numA - numB;
    // });

    setSortedData(operationalPluginData);
  }, [pluginData]);

  if (false) {
    console.log(currentQuestion);
  }

  return (
    <div style={{ height: "100%" }}>
      {/* <h2>Operational Lists</h2> */}
      <Chapters
        setTypeOfChecklist={setTypeOfChecklist}
        title={"Operational"}
        pluginData={sortedData}
        setCurrentQuestion={setCurrentQuestion}
        typeOfChecklist={typeOfChecklist}
      />
    </div>
  );
}
