import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";

export const SearchChecklist = ({
  pluginData,
  // setSearchData,
  searchData,
}: any) => {
  if (false) console.log({ pluginData, searchData });

  const { setSearchOption } = useAppContext();

  useEffect(() => {
    setSearchOption("all");
  }, []);

  return (
    <div style={{ direction: "rtl" }}>
      <h2>חיפוש</h2>
      <div
        style={{
          borderBottom: "1px solid black",
          padding: "3px",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
          fontWeight: "bold",
          fontSize: "1.2em",
        }}
      >
        <label htmlFor="dropdown1">דרג:</label>
        <select className="dropdown-container" id="dropdown1">
          <option className="search-dropdown-option" value="option1">
            דרג א
          </option>
          {/* <option className="search-dropdown-option" value="option2">
              דרג ב
            </option> */}
          {/* <option className="search-dropdown-option" value="option3">
            דרג ג
          </option> */}
        </select>
      </div>

      <div
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
          fontWeight: "bold",
          fontSize: "1.2em",
          padding: "3px",
        }}
      >
        <label htmlFor="dropdown2">פלטפורמה:</label>
        <select
          className="dropdown-container"
          id="dropdown2"
          onChange={(e: any) => setSearchOption(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Select an option
          </option>
          <option className="search-dropdown-option" value="סופה">
            סופה
          </option>
          <option className="search-dropdown-option" value="רעם">
            רעם
          </option>
          <option className="search-dropdown-option" value="חד מושבי">
            חד מושבי
          </option>
          <option className="search-dropdown-option" value="דו מושבי">
            דו מושבי
          </option>
          <option className="search-dropdown-option" value="תלת מושבי">
            תלת מושבי
          </option>
        </select>
      </div>
    </div>
  );
};
