import React, { Component } from 'react';
import _ from "lodash";


class TaskItem extends Component {

  render() {
    const task = this.props.task;
    console.log(task)

    return (
      <div className="task" key={task.id}>
        <div className="task__name">{task.name}</div>
        <div className="task__category">{task.category}</div>
        <div className="task__last-time-added">{task.last_time_done}</div>
        <div className="task__frequency">{task.frequency}</div>
        <div className="task__done button" onClick={() => this.props.updateTask(this.props.task)} >Done</div>
      </div>
    );
  };
}

export default TaskItem;
