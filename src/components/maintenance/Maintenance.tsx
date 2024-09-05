import { Chapters } from "./Chapters";

export function Maintenance({ setTypeOfChecklist, pluginData }: any) {
  return (
    <>
      <Chapters
        setTypeOfChecklist={setTypeOfChecklist}
        title={"Maintenance"}
        pluginData={pluginData}
      />
    </>
  );
}
