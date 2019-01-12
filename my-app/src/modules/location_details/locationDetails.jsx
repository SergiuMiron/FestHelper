import React, { Component, Fragment } from 'react';
import { getLocations } from '../locations/apiCalls';
import { locations } from '../../endpoints';
import { Grid,Col,Image,Row } from 'react-bootstrap';
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

    render() {
        return(
            <Fragment>
                <Grid>
                    <Row className="left-container">
                        <Col md={6} mdPull={6}>
                            <Image src={this.state.pictures}></Image>
                            <div className="container-phone-number">
                                <i class="fas fa-phone"></i>
                                <span>0{this.state.phone}</span>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Fragment>
        )
    }
}

export default LocationDetails;