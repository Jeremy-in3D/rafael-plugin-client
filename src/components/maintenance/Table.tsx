const TableComponent = () => {
  const titles = ["חוט A", "חוט B", "חוט C"];
  const titles2 = ["חוט C", "חוט B", "חוט A"];

  const item = ["green", "red", "blue"];
  const item2 = ["blue", "red", "green"];
  // Function to generate a random color
  // const getRandomColor = () => {
  //   const colors = ["red", "green", "orange", "blue", "purple"];
  //   return colors[Math.floor(Math.random() * colors.length)];
  // };

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
                color: "black",
              }}
            >
              <div>{title}</div>
              <div style={{ color: item[index], marginTop: "10px" }}>
                Color Item
              </div>
            </td>
          ))}
        </tr>
        {/* <tr>
          {titles2.map((title, index) => (
            <td
              key={index}
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
                color: "white",
              }}
            >
              <div>{title}</div>
              <div style={{ color: item2[index], marginTop: "10px" }}>
                Color Item
              </div>
            </td>
          ))}
        </tr> */}
      </tbody>
    </table>
  );
};

export default TableComponent;
