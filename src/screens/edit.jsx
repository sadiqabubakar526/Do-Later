import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

import {IconButton} from '@material-ui/core';
import {Edit as EditIcon} from '@material-ui/icons';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function Edit({tasks, setTasks}) {
    const history = useHistory(), query = useQuery();
    const index = query.get("index");
    const [text, setText] = React.useState(tasks[index].text);
    const editTask = () => {
        if(text) {
            tasks[index].text = text;
            setTasks([...tasks])
            history.goBack();
        }
    }
    return (
        <div className="Edit">
            <div className="branding-name">Edit Tasks</div>
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
                <IconButton onClick={editTask}>
                    <EditIcon className="add-btn" />
                </IconButton>
            </div>
        </div>
    )
}

export default Edit
