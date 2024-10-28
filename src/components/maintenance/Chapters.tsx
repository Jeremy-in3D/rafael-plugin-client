import { useEffect, useState } from "react";
// import HomeIcon from "@mui/icons-material/Home";
import { Checklist } from "./Checklist";
// import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import { SearchChecklist } from "../search/SearchChecklist";
import { useAppContext } from "../../context/appContext";
// import { AppContext, useAppContext } from "../../context/appContext";
// import { countCheckedItems } from "../../common/getNumberOfCheckableItems";

export function Chapters({
  setTypeOfChecklist,
  title,
  pluginData,
  typeOfChecklist,
}: any) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [selectedChapters, setSelectedChapters] = useState<number[]>([0]);

  const { triggerRerender } = useAppContext();

  // useEffect(() => {
  //   // console.log("does this go off every time?");
  // }, [triggerRerender]);

  const selectedStyles = {
    backgroundColor: "#0F0032",
    color: "#FFFFFF",
    height: "42%",
    width: "22%",
  };

  const unselectedStyles = {
    backgroundColor: "none",
    color: "#D0D5DD",
    height: "42%",
    width: "22%",
  };

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
              style={{ width: "90%", marginTop: "0.5em" }}
              src="/images/rafael-logo-hebrew.png"
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ opacity: 0 }}>{title}</h1>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={
              typeOfChecklist == "maintenance"
                ? unselectedStyles
                : selectedStyles
            }
            className="temp-btn"
            onClick={() => {
              if (typeOfChecklist == "operational") return;
              setTypeOfChecklist("operational");
            }}
            // disabled={typeOfChecklist == "operational" ? true : false}
          >
            אחזקה
          </button>
          <button
            style={
              typeOfChecklist == "operational"
                ? unselectedStyles
                : selectedStyles
            }
            // disabled={typeOfChecklist == "" ? false : true}
            className="temp-btn"
            onClick={() => {
              if (typeOfChecklist == "maintenance") return;
              setTypeOfChecklist("maintenance");
            }}
          >
            מבצעי
          </button>
        </div>
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
            triggerRerender={triggerRerender}
          />
        </div>
      </div>
    </div>
  );
}

export const ChapterList = ({
  pluginData,
  // title,
  selectedTask,
  setSelectedTask,
  isSearchSelected,
  setIsSearchSelected,
  // setTypeOfChecklist,
  selectedChapters,
  setSelectedChapters,
  triggerRerender,
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
        {/* <div className="content-navbar-holder">
          <AssignmentIcon
            fontSize="large"
            // sx={{ color: "#2b4cd8" }}
            sx={{ color: "black" }}
            onClick={() => {
              setIsSearchSelected(false);
              setSearchOption("");
            }}
          />
        </div> */}
        {/* <div className="content-navbar-holder">
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
        </div> */}
      </div>

      {isSearchSelected ? (
        <SearchChecklist pluginData={pluginData} />
      ) : (
        <div className="content-list">
          {/* <div className="chapter-title">{title}</div> */}
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
                    <div className="chapters-item">
                      <ChapterListItem
                        setSelectedTask={setSelectedTask}
                        selectedTask={selectedTask}
                        chapterIdx={idx}
                        selectedChapters={selectedChapters}
                        setSelectedChapters={setSelectedChapters}
                        element={element}
                        pluginData={pluginData}
                        triggerRerender={triggerRerender}
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
  pluginData: any;
  triggerRerender: boolean;
};

const ChapterListItem = ({
  chapterIdx,
  selectedChapters,
  setSelectedChapters,
  element,
  setSelectedTask,
  selectedTask,
  triggerRerender,
}: // setSelectedTask,
// selectedTask,
ChapterListItemProps) => {
  const [isEveryTaskInChapterComplete, setIsEveryTaskInChapterComplete] =
    useState<null | boolean>(null);
  // let isEveryTaskInChapterComplete;

  useEffect(() => {
    if (element?.chapter.tasks?.length) {
      let numberOfTasksInChapter = 0;

      element.chapter.tasks.map((task: any) => {
        if (task.checkListData?.length) {
          task.checkListData?.map((singleTask: any) => {
            if (singleTask.isChecked) {
              numberOfTasksInChapter = numberOfTasksInChapter + 1;

              if (numberOfTasksInChapter == element?.chapter.tasks?.length) {
                setIsEveryTaskInChapterComplete(true);
              }
            } else {
              if (isEveryTaskInChapterComplete !== false) {
                setIsEveryTaskInChapterComplete(false);
              }
              return;
            }
          });
        }
      });
    }
  }, [triggerRerender]);

  return (
    <div
      className="chapter-item-closed"
      style={{
        fontWeight: selectedChapters.includes(chapterIdx) ? "bold" : "",
        color: isEveryTaskInChapterComplete === true ? "#66ff00" : "",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        background: "#EEF0F2",
        borderRadius: "20px",
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
      <div> {`${element?.chapter?.name}`}</div>

      {/* <div style={{ border: "1px solid red" }}> */}
      <img
        style={{
          transform: selectedChapters.includes(chapterIdx)
            ? "rotate(-90deg)"
            : "",
        }}
        src="/images/chapters-chevron.png"
      />
      {/* </div> */}
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

  // console.log({ chapterIdx, taskIdx, item: item?.checkListData[0] });

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
        {/* {`${item.name}`} <AssignmentIcon fontSize="small" /> */}
        {`${item.name}`}{" "}
        <img
          style={{ marginLeft: "0.6em" }}
          src="/public/images/Checked-non-faded-4.png"
        />
      </span>
    </div>
  );
};
