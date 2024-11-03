export function Error({ errorMsg }: { errorMsg: string }) {
  if (errorMsg) {
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10em",
        width: "100%",
        border: "1px solid black",
        textAlign: "center",
      }}
    >
      <h3 style={{ color: "red" }}>THIS is an error</h3>
    </div>
  );
}
