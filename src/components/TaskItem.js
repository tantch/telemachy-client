import React, { Component } from 'react';
import _ from "lodash";


class TaskItem extends Component {

  render() {
    const task = this.props.task;

    return (
      <div className="task" key={task.id}>
        <div className="task__name">{task.name}</div>
        <div className="task__category">{task.category}</div>
      </div>
    );
  };
}

export default TaskItem;
