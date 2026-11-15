import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules/FormField/FormField";

function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }
    setError("");
    alert(`Saved: ${name}`);
  }

  return (
    <>
      <h1>StockDesk</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }} noValidate>
        <FormField
          label="Product name"
          hint="Shown in the product list"
          placeholder="e.g. USB-C Cable"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        />
        <Button type="submit" style={{ marginTop: 16 }}>
          Save
        </Button>
      </form>
    </>
  );
}

export default App;
