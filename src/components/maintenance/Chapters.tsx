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
        <List pluginData={pluginData} />
      </div>
    </div>
  );
}

export const List = ({ pluginData }: any) => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const chaptersArr = new Array(5).fill(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        border: "1px solid black",
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
        <div className="chapter-title">Chapter title</div>
        {chaptersArr && chaptersArr.length
          ? chaptersArr.map((element: any, idx: number) => (
              <div
                key={idx}
                className="chapters-item"
                style={{ border: "1px solid black", color: "white" }}
              >
                <ListItem
                  chapter={idx}
                  selectedChapter={selectedChapter}
                  setSelectedChapter={setSelectedChapter}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

type ListItemProps = {
  chapter: number;
  selectedChapter: number | null;
  setSelectedChapter: React.Dispatch<React.SetStateAction<number | null>>;
};

const ListItem = ({
  chapter,
  selectedChapter,
  setSelectedChapter,
}: ListItemProps) => {
  const adjustedChapter = chapter + 1;
  return (
    <div>
      {selectedChapter == chapter ? (
        <div
          className="chapter-item-open"
          onClick={() => setSelectedChapter(null)}
        >
          hello world
        </div>
      ) : (
        <div
          className="chapter-item-closed"
          onClick={() => setSelectedChapter(chapter)}
        >
          {adjustedChapter}
        </div>
      )}
    </div>
  );
};
