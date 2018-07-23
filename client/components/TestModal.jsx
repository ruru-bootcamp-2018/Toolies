import React from 'react';
import Modal from 'react-responsive-modal';

export class TestModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this)
        this.onCloseModal = this.onCloseModal.bind(this)
    }


    onOpenModal () {
        this.setState({ open: true });
    };

    onCloseModal () {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Simple centered modal</h2>
                </Modal>
            </div>
        );
    }
}

export default TestModal