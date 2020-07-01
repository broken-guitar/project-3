import React, { Component } from "react";
import API from "../../utils/API";

// slide-out taskbar overlay component

export default class TaskBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
    }

    componentDidMount() {
        console.log("taskbar mount: ", this.props.show);

    }

    getTasks = (userId) => {

    };

    render() {
       
        // TODO: update width after component renders WITHOUT rerending component
        if (this.props.show) {
            setTimeout(() => {
                this.setState({width: 400});
            }, 50);
        } else {
            setTimeout(() => {
                this.setState({width: 0});
            }, 50);
            return null
        }

        return (
            
            <div
                style={{width: this.state.width}}
                className={`taskbar-container ${this.props.show && 'show'}`}>
                <h3 className="p-0">i'm the TaskBar</h3>
            </div>
            
        )
    }
}