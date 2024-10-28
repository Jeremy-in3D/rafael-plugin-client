import { useState, useEffect } from "react";
// import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CheckIcon from "@mui/icons-material/Check";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import { CompareSharp } from "@mui/icons-material";
import {
  checkNextTasks,
  checkPreviousTasks,
} from "./logic/checkTasksForChecklist";
import { useAppContext } from "../../context/appContext";
import TableComponent from "./Table";

type MaintenanceFullChapterListProps = {
  pluginData: any;
  selectedChapters: any[];
  selectedTask: any;
  isEditMode: boolean;
};

export function MaintenanceFullChapterList({
  pluginData,
  selectedChapters,
  selectedTask,
  isEditMode,
}: MaintenanceFullChapterListProps) {
  const [openedChapterContent, setOpenedChatperContent] = useState([]);

  if (false) {
    console.log(pluginData, selectedTask, selectedChapters);
  }
  const { searchOption, setModalData, setIsOpen } = useAppContext();

  useEffect(() => {
    const chapterData: any = [];

    if (searchOption == "all") {
      pluginData.forEach((chapter: any) => chapterData.push(chapter));
      setOpenedChatperContent(chapterData);

      return;
    }

    if (searchOption) {
      pluginData.forEach((chapter: any) => {
        if (chapter.chapter.platform == searchOption) {
          chapterData.push(chapter);
        }
      });
    } else {
      if (!selectedChapters.length) {
        return;
      }

      pluginData.forEach((chapter: any, idx: number) => {
        if (selectedChapters.includes(idx)) {
          chapterData.push(chapter);
        }
      });
    }
    // console.log({ chapterData });

    setOpenedChatperContent(chapterData);
  }, [selectedChapters, searchOption]);

  if (selectedTask && (selectedTask?.taskIdx || selectedTask.taskIdx == 0)) {
    return null;
  }

  return (
    <div>
      <div>
        {openedChapterContent.length
          ? openedChapterContent.map((chapter: any, chapterIdx: number) => (
              <div
                className="checklist-full-item"
                style={{
                  marginTop: chapterIdx == 0 ? "2em" : "1.5em",
                  // background: "white",
                }}
                key={`chapter${chapterIdx}`}
              >
                <div
                  style={{
                    fontSize: "1.3em",
                    fontWeight: "bold",
                    color: searchOption == "all" ? "	#32CD32" : "",
                  }}
                >
                  {/* {chapter.chapter?.name} */}
                </div>
                <div
                  style={
                    {
                      // background: searchOption
                      //   ? "rgb(211, 211, 211, 0.7)"
                      //   : "rgb(43, 83, 216, 0.5)",
                      // borderRadius: "20px",
                      // marginTop: "50px",
                    }
                  }
                >
                  {chapter.chapter.tasks.length
                    ? chapter.chapter.tasks.map((task: any, taskIdx: any) => (
                        <span key={`task${taskIdx}`}>
                          {/* <div
                            style={{
                              fontSize: "1.3em",
                              fontWeight: "bold",
                              marginTop: taskIdx == 0 ? "2em" : "0.5em",
                            }}
                            onClick={() => console.log({ task })}
                          >
                            {task.name}
                          </div> */}
                          <div>
                            {task?.checkListData?.length
                              ? task.checkListData.map(
                                  (checkData: any, checklistIdx: any) => (
                                    <div
                                      key={`checkdata${checklistIdx}`}
                                      style={{
                                        // width: "80%",
                                        // marginTop: "0.5em",
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        justifyContent: "space-between",
                                        borderBottom:
                                          "1px solid rgb(0,0,0,0.4)",
                                        alignItems: "center",
                                        padding: "2px",
                                        marginTop:
                                          checklistIdx > 0 ? "1em" : "1em",
                                      }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <div
                                          style={{
                                            marginRight: "3em",
                                            fontSize:
                                              searchOption && chapterIdx > 2
                                                ? "1.4em"
                                                : "1.2em",
                                            fontWeight: "600",
                                            color:
                                              searchOption && chapterIdx > 2
                                                ? "#FF0000"
                                                : "",
                                          }}
                                        >
                                          {checkData.name}
                                        </div>
                                        {checkData.isChecked ? (
                                          <CheckIcon
                                            sx={{
                                              color: isEditMode
                                                ? "red"
                                                : "#40e01f",
                                            }}
                                            style={{ marginLeft: "2em" }}
                                            onClick={() => {
                                              if (isEditMode) {
                                                const chapterArrCopy = [
                                                  ...openedChapterContent,
                                                ];
                                                if (
                                                  !checkNextTasks(pluginData, {
                                                    chapterIdx,
                                                    taskIdx,
                                                    checklistIdx,
                                                  })
                                                ) {
                                                  (
                                                    chapterArrCopy[
                                                      chapterIdx
                                                    ] as any
                                                  ).chapter.tasks[
                                                    taskIdx
                                                  ].checkListData[
                                                    checklistIdx
                                                  ].isChecked = false;
                                                  //   );
                                                  setOpenedChatperContent(
                                                    chapterArrCopy
                                                  );
                                                } else {
                                                  console.log(". ");
                                                }
                                              }
                                            }}
                                          />
                                        ) : checkPreviousTasks(pluginData, {
                                            chapterIdx,
                                            taskIdx,
                                            checklistIdx,
                                          }) ? (
                                          // <GpsFixedIcon
                                          //   style={{ marginLeft: "2em" }}
                                          //   onClick={() => {
                                          //     if (isEditMode) {
                                          //       return;
                                          //     }
                                          //     const chapterArrCopy = [
                                          //       ...openedChapterContent,
                                          //     ];

                                          //     if (
                                          //       checkPreviousTasks(
                                          //         chapterArrCopy,
                                          //         {
                                          //           chapterIdx,
                                          //           taskIdx,
                                          //           checklistIdx,
                                          //         }
                                          //       )
                                          //     ) {
                                          //       (
                                          //         chapterArrCopy[
                                          //           chapterIdx
                                          //         ] as any
                                          //       ).chapter.tasks[
                                          //         taskIdx
                                          //       ].checkListData[
                                          //         checklistIdx
                                          //       ].isChecked = true;
                                          //       //   );
                                          //       setOpenedChatperContent(
                                          //         chapterArrCopy
                                          //       );
                                          //     } else {
                                          //       console.log("out");
                                          //     }
                                          //   }}
                                          // />
                                          <img
                                            style={{
                                              width: "1em",
                                              height: "1em",
                                            }}
                                            onClick={() => {
                                              if (isEditMode) {
                                                return;
                                              }
                                              const chapterArrCopy = [
                                                ...openedChapterContent,
                                              ];

                                              if (
                                                checkPreviousTasks(
                                                  chapterArrCopy,
                                                  {
                                                    chapterIdx,
                                                    taskIdx,
                                                    checklistIdx,
                                                  }
                                                )
                                              ) {
                                                (
                                                  chapterArrCopy[
                                                    chapterIdx
                                                  ] as any
                                                ).chapter.tasks[
                                                  taskIdx
                                                ].checkListData[
                                                  checklistIdx
                                                ].isChecked = true;
                                                //   );
                                                setOpenedChatperContent(
                                                  chapterArrCopy
                                                );
                                              } else {
                                                console.log("out");
                                              }
                                            }}
                                            src="/public/images/Checkbox-1.png"
                                          />
                                        ) : (
                                          // <RadioButtonUncheckedIcon
                                          //   style={{ marginLeft: "2em" }}
                                          // />
                                          <img
                                            style={{
                                              width: "1em",
                                              height: "1em",
                                            }}
                                            src="/public/images/Checkbox-1.png"
                                          />
                                        )}
                                      </div>
                                      {task.table ? (
                                        <div>
                                          <TableComponent />
                                        </div>
                                      ) : null}
                                      <div>
                                        {task.imageData ? (
                                          <div
                                            style={{
                                              width: "15%",
                                            }}
                                          >
                                            <img
                                              onClick={() => {
                                                setModalData(
                                                  `images/${extractFileName(
                                                    task.imageData
                                                  )}`
                                                );
                                                setIsOpen(true);
                                              }}
                                              style={{ width: "50%" }}
                                              src={`images/${extractFileName(
                                                task.imageData
                                              )}`}
                                            />
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  )
                                )
                              : null}
                          </div>
                        </span>
                      ))
                    : null}
                </div>
              </div>
            ))
          : null}
      </div>
      <div style={{ marginTop: "2em", opacity: 0 }}>hello world</div>
    </div>
  );
}

function extractFileName(filePath: string) {
  const regex = /([^\\]+\.png)$/;
  const match = filePath.match(regex);
  return match ? match[0] : null;
}
