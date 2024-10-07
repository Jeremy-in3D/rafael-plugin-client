const TableComponent = () => {
  const titles = ["Title A", "Title B", "Title C"];

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = ["red", "green", "orange", "blue", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          {titles.map((title, index) => (
            <td
              key={index}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div>{title}</div>
              <div style={{ color: getRandomColor(), marginTop: "10px" }}>
                Random Color Item
              </div>
            </td>
          ))}
        </tr>
        <tr>
          {titles.map((title, index) => (
            <td
              key={index}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <div>{title}</div>
              <div style={{ color: getRandomColor(), marginTop: "10px" }}>
                Random Color Item
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;
