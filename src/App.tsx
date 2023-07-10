import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import { Container } from "react-bootstrap";
import NewNotes from "./NewNotes";

function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path=":id" element={<h1>hi</h1>}>
          <Route index element={<h1>show</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
        <Route path="/new" element={<NewNotes />} />
      </Routes>
    </Container>
  );
}

export default App;
