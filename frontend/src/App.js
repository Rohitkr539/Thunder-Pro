import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => { document.title = "JSCraft — Learn JavaScript"; }, []);
  return (
    <div className="App" data-testid="jscraft-app-root">
      <iframe
        data-testid="jscraft-frame"
        title="JSCraft"
        src="/jscraft.html"
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", border: "none", background: "#0a0a0f" }}
      />
    </div>
  );
}

export default App;
