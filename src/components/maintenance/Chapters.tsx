import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Checklist } from "./Checklist";
import AssignmentIcon from "@mui/icons-material/Assignment";

export function Chapters({ setTypeOfChecklist, title, pluginData }: any) {
  const [selectedTask, setSelectedTask] = useState<any>(null);

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
          <Checklist pluginData={pluginData} selectedTask={selectedTask} />
        </div>
        <ChapterList
          pluginData={pluginData}
          title={title}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      </div>
    </div>
  );
}

export const ChapterList = ({
  pluginData,
  title,

  selectedTask,
  setSelectedTask,
}: any) => {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

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
        {/* <div className="content-navbar-holder">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </div> */}
        <div className="content-navbar-holder">
          <AssignmentIcon fontSize="large" sx={{ color: "black" }} />
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
                    selectedChapters={selectedChapters}
                    setSelectedChapters={setSelectedChapters}
                    element={element}
                  />
                </div>
                <div className="tasks-container">
                  {selectedChapters.includes(idx)
                    ? element?.chapter?.tasks?.map(
                        (item: any, taskIdx: number) => (
                          <TaskList
                            chapterIdx={idx}
                            taskIdx={taskIdx}
                            key={taskIdx}
                            selectedChapters={selectedChapters}
                            item={item}
                            setSelectedTask={setSelectedTask}
                            selectedTask={selectedTask}
                          />
                        )
                      )
                    : null}
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
  selectedChapters: number[];
  setSelectedChapters: React.Dispatch<React.SetStateAction<number[]>>;
  element: any;
};

const ChapterListItem = ({
  chapter,
  selectedChapters,
  setSelectedChapters,
  element,
}: ChapterListItemProps) => {
  // const adjustedChapter = chapter + 1;
  return (
    <div>
      <>
        <div
          className="chapter-item-closed"
          onClick={() => {
            if (selectedChapters.includes(chapter)) {
              const newArr = selectedChapters.filter((item) => item != chapter);
              setSelectedChapters(newArr);
            } else {
              const newArr = [...selectedChapters, chapter];
              setSelectedChapters(newArr);
            }
          }}
        >
          {`${element?.chapter?.name} .${chapter + 1}`}
        </div>
      </>
    </div>
  );
};

const tasksPerElement = ["task1", "task2", "task3"];

type TaskListProps = {
  selectedChapters: number[];
  taskIdx: number;
  item: any;
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>;
  chapterIdx: number;
  selectedTask: any;
};

const TaskList = ({
  taskIdx,
  selectedChapters,
  item,
  setSelectedTask,
  selectedTask,

  chapterIdx,
}: TaskListProps) => {
  // console.log({ selectedChapters, item });
  // if (selectedChapter == idx) {
  //   return null;
  // }

  const isSeletedTask =
    taskIdx == selectedTask?.taskIdx && chapterIdx == selectedTask.chapterIdx;
  return (
    <div
      className="chapter-item-closed task-item"
      // key={idx}
      style={{ marginTop: "0.5em" }}
      onClick={() => {
        setSelectedTask({ chapterIdx, taskIdx });
      }}
    >
      <span
        style={{
          marginRight: "1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          color: isSeletedTask ? "blue" : "",
        }}
      >
        {`${item}: ${taskIdx + 1}`} <AssignmentIcon fontSize="small" />
      </span>
    </div>
  );
};
