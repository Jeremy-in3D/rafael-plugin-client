import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Checklist } from "./Checklist";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import { SearchChecklist } from "../search/SearchChecklist";
import { useAppContext } from "../../context/appContext";
// import { AppContext, useAppContext } from "../../context/appContext";
// import { countCheckedItems } from "../../common/getNumberOfCheckableItems";

export function Chapters({ setTypeOfChecklist, title, pluginData }: any) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <div style={{ width: "50%" }}>
            <img
              style={{ width: "100%", marginTop: "0.5em" }}
              src="/images/Rafael-2.png"
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1>{title}</h1>
        </div>

        <div style={{ flex: 1 }}></div>
      </div>

      <div
        style={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <div style={{ flex: "0 0 76%", height: "100%" }}>
          <Checklist
            isMaintenance={title == "Maintenance"}
            pluginData={pluginData}
            selectedTask={selectedTask}
            searchData={searchData}
            setSearchData={setSearchData}
            selectedChapters={selectedChapters}
          />
        </div>
        <div style={{ flex: 1 }}>
          <ChapterList
            pluginData={pluginData}
            title={title}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            isSearchSelected={isSearchSelected}
            setIsSearchSelected={setIsSearchSelected}
            setTypeOfChecklist={setTypeOfChecklist}
            selectedChapters={selectedChapters}
            setSelectedChapters={setSelectedChapters}
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
  isSearchSelected,
  setIsSearchSelected,
  setTypeOfChecklist,
  selectedChapters,
  setSelectedChapters,
}: any) => {
  const chaptersArr = pluginData; // new Array(5).fill(null);
  const { setSearchOption } = useAppContext();
  return (
    <div className="chapter-content-container">
      <div className="content-navbar">
        <div className="content-navbar-holder">
          <SearchIcon
            fontSize="large"
            // sx={{ color: "#2b4cd8" }}
            sx={{ color: "black" }}
            onClick={() => {
              setIsSearchSelected(!isSearchSelected);
              setSearchOption("");
            }}
          />
        </div>
        <div className="content-navbar-holder">
          <AssignmentIcon
            fontSize="large"
            // sx={{ color: "#2b4cd8" }}
            sx={{ color: "black" }}
            onClick={() => {
              setIsSearchSelected(false);
              setSearchOption("");
            }}
          />
        </div>
        <div className="content-navbar-holder">
          <HomeIcon
            fontSize="large"
            // sx={{ color: "#2b4cd8" }}
            sx={{ color: "black" }}
            onClick={() => {
              setIsSearchSelected(false);
              setTypeOfChecklist("");
              setSearchOption("");
            }}
          />
        </div>
      </div>

      {isSearchSelected ? (
        <SearchChecklist pluginData={pluginData} />
      ) : (
        <div className="content-list">
          <div className="chapter-title">{title}</div>
          <div
            style={{
              height: "90%",
              overflowY: "auto",
              overflowX: "hidden",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "flex-end",
              width: "90%",
            }}
          >
            {chaptersArr && chaptersArr.length
              ? chaptersArr.map((element: any, idx: number) => (
                  <div
                    key={`idx${idx}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      className="chapters-item"
                      style={{
                        color: "white",
                      }}
                    >
                      <ChapterListItem
                        setSelectedTask={setSelectedTask}
                        selectedTask={selectedTask}
                        chapterIdx={idx}
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
                  </div>
                ))
              : null}
            <div style={{ opacity: 0 }}>hello world</div>
          </div>
        </div>
      )}
    </div>
  );
};

type ChapterListItemProps = {
  chapterIdx: number;
  selectedChapters: number[];
  setSelectedChapters: React.Dispatch<React.SetStateAction<number[]>>;
  element: any;
  setSelectedTask: React.Dispatch<any>;
  selectedTask: any;
};

const ChapterListItem = ({
  chapterIdx,
  selectedChapters,
  setSelectedChapters,
  element,
  setSelectedTask,
  selectedTask,
}: // setSelectedTask,
// selectedTask,
ChapterListItemProps) => {
  // const adjustedChapter = chapter + 1;
  return (
    <div
      className="chapter-item-closed"
      style={{
        fontWeight: selectedChapters.includes(chapterIdx) ? "bold" : "",
      }}
      onClick={() => {
        // if (!selectedTask && !selectedTask?.chapterIdx) {
        //   console.log("test baby");
        //   setSelectedTask({ chapterIdx: chapter, taskIdx: null });
        // }
        if (selectedTask && selectedTask.taskIdx) {
          setSelectedTask(null);
        }

        if (selectedChapters.includes(chapterIdx)) {
          const newArr = selectedChapters.filter((item) => item != chapterIdx);
          setSelectedChapters(newArr);
        } else {
          const newArr = [...selectedChapters, chapterIdx];
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
      style={{ marginTop: "0.5em", width: "90%" }}
      onClick={() => {
        if (selectedTask?.taskIdx == taskIdx) {
          if (!selectedTask) {
            setSelectedTask({ chapterIdx, taskIdx });
          } else {
            setSelectedTask(null);
          }
        } else {
          setSelectedTask({ chapterIdx, taskIdx });
        }
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
