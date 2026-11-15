import { Button } from "./components/atoms/Button/Button";

function App() {
  return (
    <>
      <h1>StockDesk</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <Button>Save</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="ghost">Cancel</Button>
        <Button size="sm">Small</Button>
        <Button disabled>Disabled</Button>
      </div>
    </>
  );
}

export default App;
