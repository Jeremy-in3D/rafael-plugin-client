import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";

export function Checklist({ pluginData, selectedTask }: any) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [totalItemsInChecklist, setTotalItemsInChecklist] = useState<number>(0);

  // if (!!selectedTask.chapterIdx && !!selectedTask.taskIdx) {
  // }

  // console.log({ pluginData, selectedTask });

  const relevantTasks =
    pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[selectedTask.taskIdx]
      .checkListData;

  const handleCheckBox = (idx: number) => {
    const isUserRecheckingPreviouslyEditedChecks = idx !== currentItem;

    if (isEditMode) {
      if (checkedItems.includes(idx)) {
        const updatedArray = [...checkedItems].filter((item) => item != idx);
        setCheckedItems(updatedArray);
      }
    } else {
      if (isUserRecheckingPreviouslyEditedChecks) {
        if (!checkedItems.includes(idx) && currentItem > idx) {
          const updatedArray = [...checkedItems];
          updatedArray.splice(idx, 0, idx);
          setCheckedItems(updatedArray);
        }
        return;
      }

      if (!checkedItems.includes(idx)) {
        setCheckedItems([...checkedItems, idx]);
        if (idx === currentItem) {
          setCurrentItem(currentItem + 1);
        }
      } else {
        setCheckedItems(checkedItems.filter((item) => item !== idx));
      }
    }
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
          {relevantTasks
            ? relevantTasks.map((item: any, idx: number) => (
                <div className="checklist-list-items" key={idx}>
                  <div
                    style={{
                      color: "white",
                      marginLeft: "1em",
                    }}
                  >
                    {currentItem === idx ? (
                      <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
                    ) : checkedItems.includes(idx) ? (
                      <CheckIcon
                        sx={
                          isEditMode ? { color: "red" } : { color: "#40e01f" }
                        }
                        onClick={() => handleCheckBox(idx)}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={isEditMode ? { color: "red" } : {}}
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
            : null}
        </div>
      </div>

      <div className="bottom-actions-bar-container">
        <BottomBar />
      </div>
    </div>
  );
}

const BottomBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        borderBottomLeftRadius: "12px",
      }}
    >
      <div>
        <CloudDownloadIcon fontSize="large" sx={{ opacity: 0.6 }} />
      </div>
      <div>
        <GpsFixedIcon fontSize="large" sx={{ opacity: 0.6 }} />
        <FormatListNumberedRtlIcon
          fontSize="large"
          style={{ marginLeft: "2em" }}
          sx={{ opacity: 0.6 }}
        />
      </div>
    </div>
  );
};
