import { Chapters } from "../maintenance/Chapters";

export function Operational({ setTypeOfChecklist, pluginData }: any) {
  const operationalPluginData = [...pluginData].filter(
    (item) => item.name === "operational"
  );

  return (
    <div style={{ height: "100%" }}>
      {/* <h2>Operational Lists</h2> */}
      <Chapters
        setTypeOfChecklist={setTypeOfChecklist}
        title={"Operational"}
        pluginData={operationalPluginData}
      />
    </div>
  );
}
