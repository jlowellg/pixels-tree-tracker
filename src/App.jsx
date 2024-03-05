import { useState } from "react";
import "./App.css";
import AddForm from "./components/AddForm";

function App() {
  return (
    <div className="mainContainer">
      <header>
        <h1 className="title">PiXels Tree</h1>
      </header>

      <AddForm />

      <table>
        <thead>
          <tr>
            <td>Land ID</td>
            <td>Comeback in:</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3367</td>
            <td>11pm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
