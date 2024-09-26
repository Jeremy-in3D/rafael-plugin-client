export const SearchChecklist = ({
  pluginData,
  // setSearchData,
  searchData,
}: any) => {
  if (false) console.log({ pluginData, searchData });

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
          <option className="search-dropdown-option" value="option3">
            דרג ג
          </option>
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
        <select className="dropdown-container" id="dropdown2">
          <option className="search-dropdown-option" value="option1">
            סופה
          </option>
          <option className="search-dropdown-option" value="option2">
            רעם
          </option>
          <option className="search-dropdown-option" value="option3">
            חד מושבי
          </option>
          <option className="search-dropdown-option" value="option4">
            דו מושבי
          </option>
          <option className="search-dropdown-option" value="option5">
            תלת מושבי
          </option>
        </select>
      </div>

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
        <label htmlFor="dropdown3">מערכת:</label>
        <select className="dropdown-container" id="dropdown3">
          <option className="search-dropdown-option" value="option1">
            מערכת א
          </option>
          <option className="search-dropdown-option" value="option2">
            מערכת ב
          </option>
        </select>
      </div>
    </div>
  );
};
