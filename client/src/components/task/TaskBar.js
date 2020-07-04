import React, { Component } from "react";
import { Card, Modal } from "react-bootstrap";
import { BsX, BsPlus } from "react-icons/bs";
import TaskForm from "./TaskForm";
import { API } from "../../utils/taskAPI";

// slide-out taskbar overlay component

export default class TaskBar extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.getCookieId(),
            width: 0,
            showTaskFormModal: false,
            usersTasks: []
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
        console.log("TaskBar > getUserTasks > userId: ", userId);
        API.getUserTasks(userId)
            .then(res => {
                if(this._isMounted) {
                    this.setState({ usersTasks: res.data});
                }
                console.log("TaskBar.getUserTasks -> res.data: ", res.data);
            })
            .catch(err => console.log(err));
    };

    handleShowTaskFormModal = () => {
        
        if(this._isMounted) {
            this.setState({showTaskFormModal: true});
        }


    };


    handleTaskFormModalClose = () => {

        console.log("TaskBar.handleTaskFormModalClose called!");
       
        if(this._isMounted) {
            this.setState({showTaskFormModal: false});
        }

    };

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
                <div className="taskbar-btn-wrapper">
                    
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

                    <p>{this.props.userId}</p>

                
                </div>
               
                <div className="tasklist-container">
                    {this.state.usersTasks.map(task => (
                        <Card key={task._id} className="task-card m-1" border="light">
                            <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>{task.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                
                <Modal className="taskbar-modal" show={this.state.showTaskFormModal} onHide={this.handleTaskFormModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TaskForm
                            userId={this.props.userId}
                        />
                
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Alert show={props.showAlert} variant="danger" dismissible="false"
                            header="Oops!"
                            message={props.alertMessage}
                        /> */}
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}