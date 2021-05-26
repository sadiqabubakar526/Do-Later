import React from 'react'

import { DragIndicator, Delete, Edit } from '@material-ui/icons';
import { Draggable } from "react-beautiful-dnd";

import {useHistory} from 'react-router-dom';

function Task({title, isDone, index, tasks, setTasks}) {
    const history = useHistory();
    const deleteItem = (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        setTasks([...tasks]);
    }
    const edit = (e) => {
        e.stopPropagation();
        history.push("/edit?index="+index);
    }
    const strike = () => {
        tasks[index].isDone = !tasks[index].isDone;
        setTasks([...tasks]);
    }
    
    return (
        <Draggable draggableId={`task-id-${index}`} index={index}>
            {provided=>(
                <div className="task" 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    onClick={strike}
                >
                    <span 
                        className="drag-handle"
                        {...provided.dragHandleProps}
                    >
                        <DragIndicator />
                    </span>        
                    <div className="text-task" style={{textDecoration: isDone ? "line-through" : "none"}}>{title}</div>
                    <span className="edit-task" onClick={edit}>
                        <Edit />
                    </span>
                    <span className="delete-task" onClick={deleteItem}>
                        <Delete />
                    </span>
                </div>
            )}
        </Draggable>
    )
}

export default Task;