import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom'
import Input from './components/input/input';
import Number from './components/number/number';
import ErrorMessage from './components/errorMessage/errorMessage';
import InputDate from './components/date/date';
import Button from '../../common/button/button';
import { postLocation } from './apiCalls';
import { locations } from '../../endpoints';
import defaultLocation from './defaultLocation';
import PopUp from '../../common/pop-up/pop-up';
import ReactPhoneInput from 'react-phone-input-2';
import FileBase64 from 'react-file-base64';
import Textarea from '../../common/textarea/textarea';
import "./add-a-location.scss";

class AddALocation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          nameValue: "",
          cityValue: "",
          nameError: "",
          ownerError: "",
          priceValue: 0,
          commentsValue: [],
          startLocationError: "",
          endLocationError: "",
          startLocationValue: "",
          endLocationValue: "",
          phoneValue: "",
          phoneError: "",
          festivalValue: "",
          festivalError: "",
          submitButtonDisabled: true,
          popup: false,
          actionResult: '',
          messageForPopup: '',
          pictures: [],
          description: "",
          redirect: false,
         }
    }

    getTodayDate = () => {
      let date = new Date();
      let day = date.getDate();
  
      if (day <= 9) {
        day = "0" + day;
      }
      let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + day;
      return today;
    };

    onInputTextChange = ({ target }) => {
      let value = target.id + "Value";
      this.setState(
        {
          [value]: target.value
        },
        () => {
          this.checkErrorsInputText(target);
        }
      );
    };

    handlePriceChange = (value, id) => {
      let valueId = id + "Value";
  
      this.setState(
        {
          [valueId]: value
        },
        () => {
          this.formValidation();
          this.checkErrorsInPrice();
        }
      );
    };

    checkErrorsInPhoneNumber = () => {
      if (this.state.phoneValue.length  === 10) {
        this.setState({
          phoneError: ""
        });
      } else {
        this.setState({
          phoneError: "The number must be 10 digits long"
        })
      }
    }

    checkErrorsInPrice = () => {
      this.formValidation();
      if (this.state.priceValue > 0) {
        this.setState({
          priceError: "",
          classForInputNumber: ""
        });
      } else {
        this.setState({
          priceError: "You need to set a price",
          classForInputNumber: "error-border"
        })
      }
    }

    checkErrorsInputText = target => {
        this.formValidation();
        let value = target.id + "Value";
        let errorValue = target.id + "Error";
    
        if (this.state[value] === "") {
          this.setState({
            [errorValue]: "Field must not be empty!"
          });
        } else {
          this.setState({
            [errorValue]: ""
          });
        }
      };

      onHandleBlur = ({ target }) => {
        this.formValidation();
        this.checkIfEmpty(target);
        this.checkIfOrderIsOk();
      };

      onHandleChange = ({ target }) => {
        const value = target.id + "Value";
        this.setState(
          {
            [value]: target.value
          },
          () => {
            this.formValidation();
            this.checkIfEmpty(target);
          }
        );
      };

      checkIfOrderIsOk = () => {
        if (
          this.state.startLocationValue &&
          new Date(this.state.startLocationValue).getTime() <
            new Date(this.getTodayDate()).getTime()
        ) {
          this.setState({
            startLocationError:
              "Date for Start Campaign must be bigger/equal than current date!"
          });
        }
      }

      checkIfEmpty = target => {
        const inputError = target.id + "Error";
        if (target.value === "") {
          this.setState({
            [inputError]: "Field must not  be empty"
          });
        } else {
          this.setState({
            [inputError]: ""
          });
        }
      };

      createLocationObject = () => {
        let newLocation = {}

        for ( let { id: inputId, type: inputType } of defaultLocation ) {
          let stateName = inputId + "Value";
          newLocation[inputId] = new inputType(this.state[stateName]);
        }

        this.state.pictures.length > 0 ? 
                    newLocation["pictures"] = this.state.pictures[0].base64 
                    : newLocation["pictures"] = "";
        newLocation["description"] = this.state.description;
        newLocation["comments"] = this.state.commentsValue;
        newLocation["festival"] = this.state.festivalValue;
        newLocation["rate"] = 0;
        return newLocation;
      }

      addLocation = () => {
        const campaign = this.createLocationObject();

        postLocation(locations, campaign, (response) => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

          this.setState({
            actionResult: response.ok,
            popup: true
          })

          this.state.actionResult === true? 
             this.setState({ messageForPopup : "Your location have been added" })
             : this.setState({ messageForPopup : "Your location have not beed added" })

             setTimeout(
              function() {
                  this.setState({redirect: true}); }
              .bind(this),
              1500
          );
        })
      }

      formValidation = () => {
        if ( 
          this.state.nameValue !== "" &&
          this.state.cityValue !== "" &&
          this.state.priceValue > 0 && 
          this.state.startLocationValue !== "" &&
          this.state.endLocationValue !== "" &&
          this.state.phoneValue.length === 10 
        ) {
          this.setState({
            submitButtonDisabled: false
          })
        } else {
          this.setState({
            submitButtonDisabled: true
          })
        }
      }

      closePopup = () => {
        this.setState({
            actionResult: '',
            popup: false
        })
    }

    handlePhoneNumber = (value) => {

      this.setState({
        phoneValue: value
      }, () => {
        this.formValidation();
        this.checkErrorsInPhoneNumber();
      })

    }

    getFiles = (files) => {
      this.setState({ pictures: this.state.pictures.concat(files) })
    }

    onDescriptionChange = event => {
      const { target } = event;
      this.setState({
          [target.name]: target.value
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/locations' />
    }
  }

    render() { 
      // if ( this.state.pictures.length > 0 )
      //    console.log(this.state.pictures[0]);

        return ( 
          <Fragment>
            {this.state.popup  ? 
               <PopUp 
                   status={this.state.actionResult}
                   onClose={this.closePopup}
                   message={this.state.messageForPopup}
                   delay={3000}/>
               : null}
             <div className="container-add">
                 <section className="page-header">
                    <h1 className="page-title">
                    <i className="fas fa-file-alt" /> Add a new location
                    </h1>
                 </section> 
                 <form name="saveCampaign">
                    <section className="form-section">
                      <div className="form-group">
                        <Input id="name"
                              name="Location Name"
                              onChange={this.onInputTextChange}
                              onBlur={this.onInputTextChange}
                              error={this.state.nameError}>
                        </Input>
                        <Input
                            id="city"
                            name="City"
                            onChange={this.onInputTextChange}
                            onBlur={this.onInputTextChange}
                            error={this.state.ownerError}
                          />
                      </div>

                      <div className="festival-input">
                        <Input id="festival"
                               name="Festival during this time"
                               onChange={this.onInputTextChange}
                               error={this.state.festivalError}></Input>
                      </div>

                      <p className="section-label">Upload images</p>
                      <div className="upload-image-section">
                        <FileBase64
                          multiple={ true }
                          onDone={ this.getFiles} />
                      </div>

                      <p className="section-label required">Phone number</p>
                      <ReactPhoneInput defaultCountry={'ro'} 
                                       value={this.state.phoneValue}
                                       onlyCountries={['ro']}
                                       onChange={this.handlePhoneNumber}
                                       disableCountryCode={true}
                                       placeholder="Insert your phone number here"/>

                      <p className="section-label price required">
                        Set a price for your location
                      </p>
                      <div className="form-group-price">
                        <div className="form-group input-number" id="counter">
                          <Number id="price"
                                  name="Price"
                                  value={this.state.priceValue}
                                  className={this.state.classForInputNumber}
                                  handleChange={this.handlePriceChange}
                                  min={0}
                                  max={4000}
                                  increment={10}/>
                        </div>

                        <div className="wrapperError">
                          <ErrorMessage message={this.state.priceError}/>
                        </div>
                      </div>

                      <section className="timeline-container">
                        <div className="timeline-title">
                          <span className="timeline-span required">Location date</span>
                        </div>

                        <div className="location-details">
                          <div className="timeline-campaign-body">
                            <InputDate
                              id="startLocation"
                              onChange={this.onHandleChange}
                              onBlur={this.onHandleBlur}
                              className="campaign-input"
                              name="Start Location"
                              min={this.state.startLocationValue || this.getTodayDate()}
                              errorMessage={this.state.startLocationError}
                            />
                          </div>

                          <div className="timeline-campaign-body ">
                            <InputDate
                              id="endLocation"
                              onChange={this.onHandleChange}
                              onBlur={this.onHandleBlur}
                              className="campaign-input"
                              name="End Location"
                              min={this.state.nameError || this.getTodayDate()}
                              errorMessage={this.state.endLocationError}
                            />
                          </div>
                        </div>
                      </section>

                      <p className="section-label">Description</p>
                         <Textarea id="descriptionId" 
                                   value={this.state.description} 
                                   onChange={this.onDescriptionChange} 
                                   name="description" />

                    </section>
                    <section className="align-right save-location">
                    {this.renderRedirect()}
                      <Button 
                          disabled={this.state.submitButtonDisabled}
                          action={this.addLocation}
                          title="ADD LOCATION"
                          size="Medium" />
                    </section>

                 </form>     
            </div>
          </Fragment>
           
         );
    }
}
 
export default AddALocation;