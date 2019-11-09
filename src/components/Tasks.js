import React, { Component } from 'react';
import _ from "lodash";

import TaskItem from "./TaskItem";


class Tasks extends Component {

  state = {
    formTask: {
      name: "",
      category: "",
      frequency: 24,
    }
  }

  updateTask = (task) => {
    this.props.saveTask({...task, last_time_done: (new Date()).getTime()});
    this.props.createTaskEvent(task.id,{time: (new Date()).getTime(), on_time: true});
  };
  createTask = (e) => {
    e.preventDefault();
    this.props.createTask(this.state.formTask);
    this.setState({formTask: {name: "",category: "", frequency: 24}});
  };

  onTaskInputChange = (key, value) => {
    this.setState( ({formTask}) => ({formTask: { ...formTask, [key]: value }}) );
  }

  render() {
    const tasks = this.props.tasks;
    return (
      <div className="tasks page" >
        <div className="tasks__actions">
          <form className="new-task__form" onSubmit={this.createTask}>
            <input className="input" placeholder="Task Name" type="text" value={this.state.formTask.name} onChange={(e) => this.onTaskInputChange("name", e.target.value)}/>
            <input className="input" placeholder="Task Category" type="text" value={this.state.formTask.category} onChange={(e) => this.onTaskInputChange("category", e.target.value)}/>
            <input className="input" type="number" value={this.state.formTask.frequency} onChange={(e) => this.onTaskInputChange("frequency", e.target.value)}/>
            <input className="button" type="submit" value="Create"/>
          </form>
        </div>
        <div className="tasks__container">
          <div className="tasks">
            <div className={"task task--header"}>
              <div>Task</div>
              <div>Category</div>
              <div>Last Time Done</div>
              <div>Period</div>
            </div>
            {tasks.map( (task,i) => <TaskItem key={task.id} task={task} updateTask={this.updateTask} /> )}
          </div>
        </div>
      </div>
    );
  };
}

export default Tasks;
