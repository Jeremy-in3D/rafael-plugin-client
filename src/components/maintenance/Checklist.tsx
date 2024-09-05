import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";

export function Checklist({ pluginData }: any) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [currentItem, setCurrentItem] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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

  return (
    <div className="checklist-container">
      <div
        style={{
          marginRight: "3em",
          fontSize: "1.2em",
          fontWeight: "bold",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: "3em",
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
        chapter title
      </div>
      <div className="checklist-content">
        {checkItems.map((item, idx) => (
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
                  sx={isEditMode ? { color: "red" } : { color: "#40e01f" }}
                  onClick={() => handleCheckBox(idx)}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={isEditMode ? { color: "red" } : {}}
                  onClick={() => handleCheckBox(idx)}
                />
              )}
            </div>

            <div style={{ color: "white", marginRight: "1em" }}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const checkItems = ["thing1", "thing2", "thing3", "thing4"];
