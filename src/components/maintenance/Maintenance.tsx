import { Chapters } from "./Chapters";

export function Maintenance({ setTypeOfChecklist, pluginData }: any) {
  const maintenancePluginData = [...pluginData].filter(
    (item) => item.name === "maintenance"
  );

  return (
    <>
      <Chapters
        setTypeOfChecklist={setTypeOfChecklist}
        title={"Maintenance"}
        pluginData={maintenancePluginData}
      />
    </>
  );
}
