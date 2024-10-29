import { useState } from "react";

export function Search() {
  const options = ["סופה", "רעם", "חד מושבי", "דו מושבי", "תלת מושבי"];
  const [isOpen, setIsOpen] = useState(false);
  const [isDeregOpen, setIsDeregOpen] = useState(true);
  const [isMaarachetOpen, setIsMaarechetOpen] = useState(true);
  const [dereg, setDereg] = useState(false);
  const [maarechet, setMaarechet] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(options[0]); // Default to the first option

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    // setIsOpen(false);
  };

  const selectedStyles = {
    backgroundColor: "#0F0032",
    color: "#FFFFFF",
    // height: "34%",
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const unselectedStyles = {
    backgroundColor: "",
    color: "#D0D5DD",
    // height: "34%",
    width: "20%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={{ marginTop: "1em" }}>
      <div
        style={{
          padding: "3px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // marginTop: "1em",
          fontWeight: "bold",
          fontSize: "1.2em",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsDeregOpen(!isDeregOpen)}
        >
          <img
            src="/images/chapters-chevron.png"
            alt="Chevron Icon"
            style={{
              marginLeft: "0.5em",
              transform: isDeregOpen ? "rotate(-90deg)" : "",
            }}
          />
          דרג
        </div>
        {isDeregOpen ? (
          <div
            style={{
              display: "flex",
              height: "2em",
              justifyContent: "space-evenly",
            }}
          >
            <div></div>
            <button
              style={!dereg ? unselectedStyles : selectedStyles}
              className="dereg-btns"
              onClick={() => setDereg(!dereg)}
            >
              ב
            </button>
            <button
              style={dereg ? unselectedStyles : selectedStyles}
              className="dereg-btns"
              onClick={() => setDereg(!dereg)}
            >
              א
            </button>
            <div></div>
          </div>
        ) : null}
      </div>

      <div
        style={{
          padding: "3px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "1em",
          fontWeight: "bold",
          fontSize: "1.2em",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsMaarechetOpen(!isMaarachetOpen)}
        >
          <img
            src="/images/chapters-chevron.png"
            alt="Chevron Icon"
            style={{
              marginLeft: "0.5em",
              transform: isMaarachetOpen ? "rotate(-90deg)" : "",
            }}
          />
          מערכת
        </div>
        {isMaarachetOpen ? (
          <div
            style={{
              display: "flex",
              height: "2em",
              justifyContent: "space-evenly",
            }}
          >
            <div></div>

            <button
              style={!maarechet ? unselectedStyles : selectedStyles}
              className="dereg-btns"
              onClick={() => setMaarechet(!maarechet)}
            >
              ב
            </button>
            <button
              style={maarechet ? unselectedStyles : selectedStyles}
              className="dereg-btns"
              onClick={() => setMaarechet(!maarechet)}
            >
              א
            </button>
            <div></div>
          </div>
        ) : null}
      </div>

      <div
        onClick={toggleDropdown}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "1.2em",
          padding: "3px",
          cursor: "pointer",
          marginTop: "1em",
        }}
      >
        <img
          src="/images/chapters-chevron.png"
          alt="Chevron Icon"
          style={{
            marginLeft: "0.5em",
            transform: isOpen ? "rotate(-90deg)" : "",
          }}
        />
        <label htmlFor="dropdown2">פלטפורמה</label>
      </div>

      {isOpen && (
        <div
          style={{
            marginTop: "0.5em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {options.map((option) => (
            <label
              key={option}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
                padding: "5px 0",
                borderBottom: "1px solid rgb(0,0,0,0.3)",
                width: "100%",
              }}
            >
              {option}
              <input
                type="radio"
                name="dropdownOptions"
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                style={{ marginLeft: "0.5em" }} // Radio button on the right side
              />
            </label>
          ))}
        </div>
      )}

      {/* Optional: Display selected option */}
      {/* {selectedOption && <p>Selected: {selectedOption}</p>} */}
    </div>
  );
}
