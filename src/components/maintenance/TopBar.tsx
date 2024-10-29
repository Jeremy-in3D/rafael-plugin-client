type TopBarProps = {
  title: any;
  typeOfChecklist: string;
  setTypeOfChecklist: React.Dispatch<React.SetStateAction<string>>;
};

export function TopBar({
  title,
  typeOfChecklist,
  setTypeOfChecklist,
}: TopBarProps) {
  const selectedStyles = {
    backgroundColor: "#0F0032",
    color: "#FFFFFF",
    height: "34%",
    width: "24%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const unselectedStyles = {
    backgroundColor: "none",
    color: "#D0D5DD",
    height: "34%",
    width: "24%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
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
            typeOfChecklist == "maintenance" ? unselectedStyles : selectedStyles
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
            typeOfChecklist == "operational" ? unselectedStyles : selectedStyles
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
  );
}
