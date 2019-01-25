import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'antd';
import Textarea from '../textarea/textarea';
import { postLocation } from '../../modules/add-a-location/apiCalls';
import { feedbacks } from '../../endpoints';

class FeedbackModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            feedback: "",
        }
    }

    handleOk = () => {
        this.setState({ loading: true });

        let newFeedbackEntry = {};
        newFeedbackEntry["feedback"] = this.state.feedback;
        newFeedbackEntry["author"] = localStorage.getItem("username");

        postLocation(feedbacks,newFeedbackEntry,(response) => {
        })

        setTimeout(() => {
          this.setState({ loading: false,
                           feedback: "" });
          this.props.handleCancelFeedbackModal();
        }, 3000);
    }

    onFeedbackChange = (event) => {
        const { target } = event;
        this.setState({
            feedback: target.value
        });
    }

    render() {
        const { loading } = this.state;
        return (
          <div>
            <Modal
              visible={this.props.showFeedbackModal}
              title="Write down your feedback"
              onOk={this.handleOk}
              onCancel={this.props.handleCancelFeedbackModal}
              footer={[
                <Button key="back" onClick={this.props.handleCancelFeedbackModal}>Return</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                  Submit
                </Button>,
              ]}
            >
              <Textarea value={this.state.feedback}
                        onChange={this.onFeedbackChange}/>
            </Modal>
          </div>
        );
      }


}

export default FeedbackModal;