import React from "react";

import Task from "../components/task";

import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Home({tasks, setTasks}) {
  const [text, setText] = React.useState("");
  

  const addTask = () => {
    if (text.trim() !== "")
      setTasks((prevTasks) => [
        {
          text: text.trim(),
          isDone: false,
        },
        ...prevTasks,
      ]);
    setText("");
  };
  const dragHasEnded = (e) => {
    if (e.source && e.destination) {
      const temp = tasks[e.source.index];
      tasks.splice(e.source.index, 1);
      tasks.splice(e.destination.index, 0, temp);
      setTasks([...tasks]);
    }
  };

  return (
    <div className="Home">
      <div className="branding-name">Tasks</div>
      <div className="task-input">
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          spellCheck={false}
          placeholder="Add Item..."
        />
        <IconButton onClick={addTask}>
          <Add className="add-btn" />
        </IconButton>
      </div>
      <DragDropContext onDragEnd={dragHasEnded}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div
              className="tasks-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Task
                  title={task.text}
                  isDone={task.isDone}
                  index={index}
                  tasks={tasks}
                  setTasks={setTasks}
                  key={`task-${index}`}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Home;
