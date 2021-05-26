import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./screens/home";
import Edit from "./screens/edit";

function App() {
  const [tasks, setTasks] = React.useState([
    {
      text: "Get a haircut",
      isDone: false,
    },
    {
      text: "Buy some milk",
      isDone: false,
    },
  ]);

  React.useEffect(() => {
    if (localStorage && localStorage.getItem("tasks"))
      setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  React.useEffect(() => {
    if (localStorage) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            exact
            path="/edit"
            component={() => <Edit tasks={tasks} setTasks={setTasks} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
