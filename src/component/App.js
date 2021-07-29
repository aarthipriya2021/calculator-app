import React, { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

/* export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
  };

  handleClick = buttonName => {
    console.log("App - handleClick - ", buttonName);
    console.log("App - before calculate - this.state - ", this.state);
    this.setState(calculate(this.state, buttonName));
  };

  render() {
    console.log("App - render - this.state - ", this.state);
    console.log("--------------------------------------------");
    return (
      <div className="component-app">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
} */

const App = () => {
  const initialState = {
    total: null,
    next: null,
    operation: null,
    displayText: " ",
  };

  const [typed, setTyped] = useState(initialState);

  const handleClick = buttonName => {
    console.log("App - handleClick - buttonName - ", buttonName);
    console.log("App - before calculate - state - ", typed);

    if (typed.displayText && buttonName) {
      typed.displayText = typed.displayText.trim() + " " + buttonName;
    }

    let newState = calculate(typed, buttonName);
    console.log("App - after calculate - newState - ", newState);

    if (!newState.next && !newState.operation && newState.total) {
      typed.displayText += " " + newState.total;
    }

    if (buttonName === "AC") {
      typed.displayText = " ";
    }

    setTyped(prevState => ({ ...prevState, ...newState }));
  };

  console.log("App - render - this.state - ", typed);
  console.log("--------------------------------------------");
  return (
    <div className="component-app">
      <Display
        value={
          (typed.displayText &&
            typed.displayText.trim().length > 0 &&
            typed.displayText) ||
          "0"
        }
      />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
};

export default App;
