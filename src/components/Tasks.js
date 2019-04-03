import React, { Component } from 'react';
import _ from "lodash";

import TaskItem from "./TaskItem";


class Tasks extends Component {

  state= {
  }

  saveTask = (task) => {
    this.props.saveTask(task);
  };
  createTask = (task) => {
    this.props.createTask(task);
  };

  render() {
    const tasks = this.props.tasks;
    return (
      <div className="tasks-container">
        <div className="tasks">
          {tasks.map( (task,i) => <TaskItem key={task.id} task={task} saveTask={this.saveSong} /> )}
        </div>
      </div>
    );
  };
}

export default Tasks;
