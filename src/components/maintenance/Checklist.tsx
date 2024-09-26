import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { OperationalChecklist } from "../operational/OperationalChecklist";
import { OperationalFullChapterList } from "../operational/OperationalFullChapterList";
import { MaintenanceFullChapterList } from "./MaintenanceFullChapterList";

export function Checklist({
  pluginData,
  selectedTask,
  isMaintenance,
  // setCurrentQuestion,
  // currentQuestion,
  selectedChapters,
}: any) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isShowSoloChecklist, setIsShowSoloChecklist] = useState<number | null>(
    null
  );
  // const [totalItemsInChecklist, setTotalItemsInChecklist] = useState<number>(0);
  const relevantTasks =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask.taskIdx]
      .checkListData;

  const handleCheckBox = (idx: number) => {
    // const isUserRecheckingPreviouslyEditedChecks = idx !== currentItem;

    if (isEditMode) {
      if (checkedItems.includes(idx)) {
        const updatedArray = [...checkedItems].filter((item) => item != idx);
        setCheckedItems(updatedArray);
      }
    } else {
      // if (isUserRecheckingPreviouslyEditedChecks) {
      //   console.log("in 3");
      //   if (!checkedItems.includes(idx) && currentItem > idx) {
      //     console.log("in 4");
      //     const updatedArray = [...checkedItems];
      //     updatedArray.splice(idx, 0, idx);
      //     setCheckedItems(updatedArray);
      //   }
      //   return;
      // }

      relevantTasks[idx].isChecked = true;
      if (!checkedItems.includes(idx)) {
        setCheckedItems([...checkedItems, idx]);
        if (idx === currentItem) {
          setCurrentItem(currentItem + 1);
        }
      } else {
        setCheckedItems(checkedItems.filter((item) => item !== idx));
      }
    }
    // setCurrentQuestion(currentQuestion + 1);
  };

  const chapterName = pluginData[selectedTask?.chapterIdx]?.chapter?.name;
  const taskName =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask?.taskIdx];

  return (
    <div className="checklist-container">
      <div
        style={{
          fontSize: "1.2em",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: "4em",
          width: "90%",
        }}
      >
        <div
          className="vertical-align"
          style={{ marginLeft: "0.5em" }}
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <EditNoteIcon
            sx={isEditMode ? { color: "red" } : {}}
            fontSize="large"
          />
          <span style={isEditMode ? { color: "red" } : {}}>Edit</span>
        </div>

        {selectedTask ? (
          <span>{`${chapterName} -> ${taskName?.name} `}</span>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div className="checklist-content">
          {selectedChapters?.length &&
          !selectedTask?.taskIdx &&
          !isMaintenance ? (
            <OperationalFullChapterList
              pluginData={pluginData}
              selectedChapters={selectedChapters}
              selectedTask={selectedTask}
              isShowSoloChecklist={isShowSoloChecklist}
            />
          ) : null}
          {selectedChapters?.length &&
          isMaintenance &&
          !selectedTask?.taskIdx ? (
            <MaintenanceFullChapterList
              pluginData={pluginData}
              selectedChapters={selectedChapters}
              selectedTask={selectedTask}
            />
          ) : null}
          {!isMaintenance ? (
            <OperationalChecklist
              pluginData={pluginData}
              selectedTask={selectedTask}
              isShowSoloChecklist={isShowSoloChecklist}
              setIsShowSoloChecklist={setIsShowSoloChecklist}
              isEditMode={isEditMode}
            />
          ) : relevantTasks ? (
            relevantTasks.map((item: any, idx: number) => (
              <div
                className="checklist-list-items"
                key={idx}
                // onClick={() => console.log(checkedItems)}
              >
                <div
                  style={{
                    color: "white",
                    marginLeft: "1em",
                  }}
                >
                  {relevantTasks[idx].isChecked == false ? (
                    idx > 0 ? (
                      relevantTasks[idx - 1].isChecked == false ? (
                        <RadioButtonUncheckedIcon
                          sx={isEditMode ? { color: "red" } : {}}
                          // onClick={() => handleCheckBox(idx)}
                        />
                      ) : relevantTasks[idx > 0 ? idx - 1 : 0].isChecked ==
                        false ? (
                        <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                      ) : (
                        <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                        // <RadioButtonUncheckedIcon
                        //   sx={isEditMode ? { color: "red" } : {}}
                        //   // onClick={() => handleCheckBox(idx)}
                        // />
                      )
                    ) : (
                      <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                    )
                  ) : (
                    <CheckIcon
                      sx={isEditMode ? { color: "red" } : { color: "#40e01f" }}
                      onClick={() => handleCheckBox(idx)}
                    />
                  )}
                </div>

                <div
                  style={{
                    color: "white",
                    marginRight: "1em",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  {item?.name}
                </div>
              </div>
            ))
          ) : null}
        </div>
        {isMaintenance ? null : selectedTask ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={
                selectedTask?.chapterIdx == 0
                  ? "/images/test.png"
                  : "/images/camera.png"
              }
              style={{
                position: "absolute",
                bottom: "10em",
                // left: selectedTask?.chapterIdx != 0 ? "31em" : "30em",
                width: selectedTask?.chapterIdx != 0 ? "17em" : "",
              }}
            />
          </div>
        ) : null}
      </div>

      <div className="bottom-actions-bar-container">
        <BottomBar
          setIsShowSoloChecklist={setIsShowSoloChecklist}
          isMaintenance={isMaintenance}
          isShowSoloChecklist={isShowSoloChecklist}
        />
      </div>
    </div>
  );
}

type BottomBarProps = {
  setIsShowSoloChecklist: React.Dispatch<React.SetStateAction<number | null>>;
  isMaintenance: boolean;
  isShowSoloChecklist: number | null;
};

const BottomBar = ({
  setIsShowSoloChecklist,
  isMaintenance,
  isShowSoloChecklist,
}: BottomBarProps) => {
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "space-evenly",
        justifyContent: "flex-end",
        marginRight: "5em",
        alignItems: "center",
        height: "100%",
        borderBottomLeftRadius: "12px",
      }}
    >
      {!isMaintenance ? (
        <div>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 1 ? null : 1);
            }}
            style={{ background: isShowSoloChecklist == 1 ? "grey" : "" }}
          >
            Worker 2
          </button>
          <button
            onClick={() => {
              setIsShowSoloChecklist(isShowSoloChecklist == 2 ? null : 2);
            }}
            style={{
              marginLeft: "2em",
              background: isShowSoloChecklist == 2 ? "grey" : "",
            }}
          >
            Worker 1{" "}
          </button>
        </div>
      ) : null}
      {/* <div>
        <CloudDownloadIcon fontSize="large" sx={{ opacity: 0.6 }} />
      </div>
      <div>
        <GpsFixedIcon fontSize="large" sx={{ opacity: 0.6 }} />
        <FormatListNumberedRtlIcon
          fontSize="large"
          style={{ marginLeft: "2em" }}
          sx={{ opacity: 0.6 }}
        />
      </div> */}
    </div>
  );
};
