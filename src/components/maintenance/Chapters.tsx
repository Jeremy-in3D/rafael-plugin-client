import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Checklist } from "./Checklist";

export function Chapters({ setTypeOfChecklist, title, pluginData }: any) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>{title}</h1>
        <button onClick={() => setTypeOfChecklist("")}>back to home</button>
      </div>

      <div style={{ height: "100%", display: "flex" }}>
        <div style={{ flex: 3 }}>
          <Checklist pluginData={pluginData} />
        </div>
        <ChapterList pluginData={pluginData} title={title} />
      </div>
    </div>
  );
}

export const ChapterList = ({ pluginData, title }: any) => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const chaptersArr = pluginData; // new Array(5).fill(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div className="content-navbar">
        <div className="content-navbar-holder">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </div>
        <div className="content-navbar-holder">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </div>
        <div className="content-navbar-holder">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </div>
      </div>
      <div className="content-list">
        <div className="chapter-title">{title}</div>
        {chaptersArr && chaptersArr.length
          ? chaptersArr.map((element: any, idx: number) => (
              <>
                <div
                  key={idx}
                  className="chapters-item"
                  style={{ border: "1px solid black", color: "white" }}
                >
                  <ChapterListItem
                    chapter={idx}
                    selectedChapter={selectedChapter}
                    setSelectedChapter={setSelectedChapter}
                    element={element}
                  />
                </div>
                <div className="tasks-container">
                  {tasksPerElement.map((item, idx) => (
                    <TaskList idx={item} />
                  ))}
                </div>
              </>
            ))
          : null}
      </div>
    </div>
  );
};

type ChapterListItemProps = {
  chapter: number;
  selectedChapter: number | null;
  setSelectedChapter: React.Dispatch<React.SetStateAction<number | null>>;
  element: any;
};

const ChapterListItem = ({
  chapter,
  selectedChapter,
  setSelectedChapter,
  element,
}: ChapterListItemProps) => {
  // const adjustedChapter = chapter + 1;
  return (
    <div>
      {selectedChapter == chapter ? (
        <div
          className="chapter-item-open"
          onClick={() => setSelectedChapter(null)}
        >
          {element.chapter}
        </div>
      ) : (
        <>
          <div
            className="chapter-item-closed"
            onClick={() => setSelectedChapter(chapter)}
          >
            {`${element.chapter} .${chapter + 1}`}
          </div>
        </>
      )}
    </div>
  );
};

const tasksPerElement = [1, 2, 3];

type TaskListProps = {
  idx: number;
};

const TaskList = ({ idx }: TaskListProps) => {
  return (
    <div
      className="chapter-item-closed task-item"
      key={idx}
      style={{ marginTop: "0.5em" }}
    >
      <span style={{ marginRight: "1em" }}>{`task: ${idx}`}</span>
    </div>
  );
};
