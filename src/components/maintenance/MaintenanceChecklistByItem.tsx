import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// import { useState } from "react";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import TableComponent from "./Table";

export function MaintenanceChecklistByItem({
  setIsOpen,
  relevantTasks,
  isTable,
  checkImage,
  isEditMode,
  handleCheckBox,
  checkPreviousTasks,
  pluginData,
  selectedTask,
  setModalData,
}: any) {
  return relevantTasks.map((item: any, idx: number) => (
    <div
      className="checklist-list-items"
      key={idx}
      style={{
        background: "rgb(43, 83, 216, 0.4)",
        borderRadius: "20px",
      }}
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
            ) : relevantTasks[idx > 0 ? idx - 1 : 0].isChecked == false ? (
              <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
            ) : (
              <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
            )
          ) : checkPreviousTasks(pluginData, selectedTask) ? (
            <GpsFixedIcon onClick={() => handleCheckBox(idx)} />
          ) : (
            <RadioButtonUncheckedIcon />
          )
        ) : (
          <CheckIcon
            sx={isEditMode ? { color: "red" } : { color: "#40e01f" }}
            onClick={() => handleCheckBox(idx)}
          />
        )}
      </div>

      {checkImage ? (
        <div
          style={{
            width: "20%",
            marginBottom: "5em",
          }}
        >
          <img
            style={{ width: "50%" }}
            onClick={() => {
              setModalData(`images/${extractFileName(checkImage)}`);
              setIsOpen(true);
            }}
            src={`images/${extractFileName(checkImage)}`}
          />
        </div>
      ) : null}

      <div
        style={{
          color: "white",
          marginRight: "1em",
          fontSize: "1.2em",
          fontWeight: "bold",
        }}
        onClick={() => console.log({ checkImage })}
      >
        {item?.name}
      </div>

      {isTable ? (
        <div>
          <TableComponent />
        </div>
      ) : null}
    </div>
  ));
}

function extractFileName(filePath: string) {
  const regex = /([^\\]+\.png)$/;
  const match = filePath.match(regex);
  return match ? match[0] : null;
}
