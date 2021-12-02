import React from 'react';
import './Modal.css';

class Modal extends React.Component {
    state = {
        isOpen: false,
    };

    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.setState({ isOpen: true })}>
                    Open modal
                </button>

                {this.state.isOpen && (<div className="modal">
                    <div className="modal-body">
                        <h1>Info</h1>
                        <p>
                            This application is a simple "Todo" list without memory.
                            This app uses external API to get JSON data for basic tasks set.
                            You can set tasks as completed, delete them and also add new ones.
                        </p>
                        <button onClick={() => this.setState({ isOpen: false })}>
                            Exit
                        </button>
                    </div>
                </div>)}
            </React.Fragment>
        );
    }
}

export default Modal;
