import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Checklist } from "./Checklist";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";

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

      <div
        style={{
          display: "flex",
          flexGrow: 1,
          // height: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: "0 0 76%", height: "100%" }}>
          <Checklist pluginData={pluginData} selectedTask={selectedTask} />
        </div>
        <div style={{ flex: 1 }}>
          <ChapterList
            pluginData={pluginData}
            title={title}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        </div>
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
        overflowY: "auto",
        height: "100%",
        border: "1px solid black",
        // overflow: "auto",
        overflowX: "hidden",

        // flex: 1,
      }}
    >
      <div className="content-navbar">
        <div className="content-navbar-holder">
          <SearchIcon fontSize="large" sx={{ color: "black" }} />
        </div>
        <div className="content-navbar-holder">
          <AssignmentIcon fontSize="large" sx={{ color: "black" }} />
        </div>
        <div className="content-navbar-holder">
          <HomeIcon fontSize="large" sx={{ color: "black" }} />
        </div>
      </div>

      <div className="content-list">
        <div className="chapter-title">{title}</div>
        <div
          style={{
            height: "90%",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {chaptersArr && chaptersArr.length
            ? chaptersArr.map((element: any, idx: number) => (
                <>
                  <div
                    key={idx}
                    className="chapters-item"
                    style={{ color: "white" }}
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
          <div style={{ opacity: 0 }}>hello world</div>
        </div>
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
    <div
      className="chapter-item-closed"
      style={{
        fontWeight: selectedChapters.includes(chapter) ? "bold" : "",
      }}
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
      {`${element?.chapter?.name}`}
    </div>
  );
};

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
  item,
  setSelectedTask,
  selectedTask,

  chapterIdx,
}: TaskListProps) => {
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
          // color: isSeletedTask ? "red" : "",
          fontWeight: isSeletedTask ? "bold" : "",
        }}
      >
        {`${item.name}`} <AssignmentIcon fontSize="small" />
      </span>
    </div>
  );
};
