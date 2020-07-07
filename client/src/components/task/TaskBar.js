import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { BsX, BsPlus } from "react-icons/bs";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { API } from "../../utils/taskAPI";

// slide-out taskbar overlay component

export default class TaskBar extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.getCookieId(),
            width: 0,
            showTaskForm: false,
            taskFormIsEdit: false,
            usersTasks: [],
            taskTypes: [],
            currentTask: ""
        };
    };

    componentDidMount() {
        this._isMounted = true;
        console.log("TaskBar component mounted!");
        console.log("taskbar mount: ", this.props.show, "this.state.userId: ", this.state.userId);
        this.getUserTasks(this.props.getCookieId());

    };

    componentWillMount() {
        this._isMounted = false;
    };

    getUserTasks = userId => {
        API.getUserTasks(userId)
            .then(res => {
                if(this._isMounted) {
                    this.setState({
                        usersTasks: res.data.tasks,
                        taskTypes:  res.data.taskTypes
                    });
                }
            })
            .catch(err => console.log(err));
    };

    handleShowTaskFormModal = (task) => {
        if(this._isMounted) {
            if (typeof task === "object" && task !== null && task !== "undefined") {
                this.setState({
                    showTaskForm: true,
                    taskFormIsEdit: true,
                    currentTask: task
                });
            } else {
                this.setState({
                    showTaskForm: true,
                    taskFormIsEdit: false
                });
            }
        }
    };

    handleTaskFormModalClose = () => {
        if(this._isMounted) {
            this.setState({showTaskForm: false});
        }
    };

    handleOpeningTask= (task) => {
        this.handleShowTaskFormModal(task);
    }

    render() {
       
        // TODO: update width after component renders WITHOUT rerending component
        if (this.props.show) {
            setTimeout(() => {
                if(this._isMounted) {
                    this.setState({width: 360});
                }
            }, 50);
        } else {
            setTimeout(() => {
                if(this._isMounted) {
                    this.setState({width: 0});
                }
            }, 50);
            return null
        }

        return (
            
            <div
                style={{width: this.state.width}}
                className={`taskbar-container ${this.props.show && 'show'}`}
            >
                <div className="taskbar-btn-container">
                    
                    <div
                        className="taskbar-close-btn"
                        onClick={() => this.props.handleShowTaskBar()}>
                        <BsX/>
                    </div>

                    <div
                        className="taskbar-add-btn"
                        onClick={() => this.handleShowTaskFormModal()}>
                        <BsPlus/>
                    </div>
                    
                    <div style={{clear: "both"}}/>
                
                </div>
               
               <div style={{clear: "both"}}>
                    <h4 className="p-0">Tasks</h4>
                
                </div>
               
                <div className="tasklist-container">
                    
                    {this.state.usersTasks.map(task => (
                        <TaskItem key={task._id} task={task} handleOpeningTask={this.handleOpeningTask}/>
                        
                    ))}

                </div>
                
                
                <TaskForm
                    show            = {this.state.showTaskForm}
                    userId          = {this.state.userId}
                    isEdit          = {this.state.taskFormIsEdit}
                    task            = {this.state.currentTask}
                    taskTypes       = {this.state.taskTypes}
                    onHide          = {this.handleTaskFormModalClose}
                    getUsersTasks   = {this.getUserTasks}
                />

            </div>
            
        )
    }
}