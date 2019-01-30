import React, { Component, Fragment } from 'react';
import { getLocations } from '../locations/apiCalls';
import { locations,wishlist } from '../../endpoints';
import { Grid,Col,Image,Row } from 'react-bootstrap';
import Moment from 'react-moment';
// import Button  from '../../common/button/button';
import { postLocationToWishlist, updateLocationToWishlist } from './apiCall';
import defaultWishlistLocation from './defaultWishlistLocation';
import PopUp from '../../common/pop-up/pop-up';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import './locationDetails.scss';

const TextArea = Input.TextArea;
// const CommentList = ({ comments }) => (
//     <List
//       dataSource={comments}
//       header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//       itemLayout="horizontal"
//       renderItem={props => <Comment {...props} />}
//     />
//   );

const Editor = ({
onChange, onSubmit, submitting, value,
}) => (
<div>
    <Form.Item>
    <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
    <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
    >
        Add Comment
    </Button>
    </Form.Item>
</div>
);

class LocationDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            city: "",
            price: 0,
            phone: 0,
            startLocation: "",
            endLocation: "",
            pictures: "",
            description: "",
            popup: false,
            actionResult: '',
            messageForPopup: '',
            idOfQuestion: this.props.match.params.id || "",
            comments: [],
            submitting: false,
            value: '',
        }
    }

    componentDidMount() {
        if ( this.state.idOfQuestion ) {
            getLocations(locations + "?_id=" + this.state.idOfQuestion, data => {
                this.setState({
                    name: data[0].name,
                    city: data[0].city,
                    price: data[0].price,
                    phone: data[0].phone,
                    startLocation: data[0].startLocation,
                    endLocation: data[0].endLocation,
                    pictures: data[0].pictures,
                    description: data[0].description,
                    // comments: data[0].comments
                })
            })
        }
    }

    createWishlistObject = () => {
        let newWishlistLocation = {}

        for ( let { id: inputId, type: inputType } of defaultWishlistLocation ) {
          let stateName = inputId;
          newWishlistLocation[inputId] = new inputType(this.state[stateName]);
        }

        this.state.pictures.length > 0 ? 
        newWishlistLocation["pictures"] = this.state.pictures[0].base64 
                    : newWishlistLocation["pictures"] = "";
                    newWishlistLocation["description"] = this.state.description;
        newWishlistLocation["username"] = localStorage.getItem('username');
        newWishlistLocation["comments"] = this.state.comments;
        return newWishlistLocation;
      }


    addToWishlist = () => {
        const objectToAdd = this.createWishlistObject();
       postLocationToWishlist(wishlist, objectToAdd, (response) => {
           window.scrollTo({
               top: 0,
               left: 0,
               behavior: 'smooth'
           })

           this.setState({
               actionResult: response.ok,
               popup: true
           })

           this.state.actionResult === true ? 
              this.setState({ messageForPopup: "Your location have been aded to the wishlist" })
              : this.setState({ messageForPopup: "Your location have not been added to the wishlist" })
       })
       
    }

    handleChange = (e) => {
        this.setState({
          value: e.target.value,
        });
      }

    handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
        
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
                {
                  author: localStorage.getItem('username'),
                  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                  content: <p>{this.state.value}</p>,
                  datetime: moment().fromNow(),
                },
                ...this.state.comments,
              ],
          });
          
          const objectToUpdate = this.createWishlistObject();
          updateLocationToWishlist(locations + '/' + this.state.idOfQuestion, objectToUpdate, (response) => {
          })


        }, 1000);


    }

    closePopup = () => {
        this.setState({
            actionResult: '',
            popup: false
        })
    }

    render() {
        console.log("final data: ", this.state.comments);
        return(
            <Fragment>
                 {this.state.popup  ? 
               <PopUp 
                   status={this.state.actionResult}
                   onClose={this.closePopup}
                   message={this.state.messageForPopup}
                   delay={3000}/>
               : null}
                <div className="big-container">
                    <div className="upper-container__details-page">
                        <div className="left-container__details-page">
                            <Image src={this.state.pictures.length > 0 ? this.state.pictures : "/assets/no-image.png"} ></Image>
                            <div className="container-phone-number">
                                <i className="fas fa-phone"></i>
                                <div className="phone-number-block">
                                    <span>0{this.state.phone}</span>
                                    <span>Mobile</span>
                                </div>
                            </div>
                        </div>

                        <div className="right-container__details-page">
                            <span className="details-location title">{this.state.name}</span>
                            <div className="details-location price">
                                ${this.state.price}.00
                                <span>(per night)</span>
                            </div>
                            <div className="details-location">
                                Located in:
                            </div>
                            <div className="city">{this.state.city}</div>

                            <div className="details-location">
                                Available in the next date interval: 
                            </div>
                            <Moment format="MM.DD.YYYY">{this.state.startLocation}</Moment>
                            <span>  -  </span>
                            <Moment format="MM.DD.YYYY">{this.state.endLocation}</Moment>
                        </div>
                    </div>

                    <div className="bottom-container__details-page">
                        <div className="details-location">
                            Description
                            <div className="description-content">{this.state.description}</div>
                        </div>

                    </div>

                    <div>
                    {this.state.comments !== undefined && this.state.comments.length > 0 ? 
                      <List
                      dataSource={this.state.comments}
                      header={`${this.state.comments.length} ${this.state.comments.length > 1 ? 'replies' : 'reply'}`}
                      itemLayout="horizontal"
                      renderItem={props => <Comment {...props} />}
                      /> : null}
                        <Comment
                            avatar={(
                                <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                                />
                            )}
                            content={(
                                <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={this.state.submitting}
                                value={this.state.value}
                                />
                            )}
                            />
                    </div>
                    
                    <div className="details-location-button align-right">
                        <Button action={this.addToWishlist}
                                title="Add to my wishlist"
                                size="Medium"></Button>
                  </div>
                </div>

            </Fragment>
        )
    }
}

export default LocationDetails;