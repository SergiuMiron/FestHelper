import React, { Component, Fragment } from 'react';
import { getLocations } from '../locations/apiCalls';
import { locations,wishlist } from '../../endpoints';
import { Grid,Col,Image,Row } from 'react-bootstrap';
import Moment from 'react-moment';
import Button  from '../../common/button/button';
import { postLocationToWishlist } from './apiCall';
import defaultWishlistLocation from './defaultWishlistLocation';
import './locationDetails.scss';

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
            idOfQuestion: this.props.match.params.id || "",
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
                    description: data[0].description
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
        console.log("tot", newWishlistLocation)
        return newWishlistLocation;
      }


    addToWishlist = () => {
        const objectToAdd = this.createWishlistObject();
       postLocationToWishlist(wishlist, objectToAdd, (response) => {
           console.log("a mers?");
       })
    }

    render() {
        return(
            <Fragment>
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