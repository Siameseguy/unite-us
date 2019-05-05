import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddServicesForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      selected: '',
      content: '',
      checked: false,
      error: false,
      errorCode: '',
      submitted: false,
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      selectError: '',
      checkError: ''
    }
  }

  clearInputs = () => {
    this.setState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      selected: '',
      checked: false,
      content: '',
      error: false,
      errorCode: '',
      submitted: true
    })
  }

  resetPage = () => {
    this.setState({submitted: false})
  }

  handleInput = (event) => {
    let target = event.target;
    let value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    let name = target.name;
    this.setState({[name]: value})
  }

  validate = () => {
    let firstNameError = '';
    let lastNameError = '';
    let emailError = '';
    let selectError = '';
    let checkError = '';

    if (!this.state.firstName) {
      firstNameError = 'Please provide a First Name';
    }

    if (!this.state.lastName) {
      lastNameError = 'Please provide a Last Name';
    }

    // validation for email
    if (!this.state.email) {
      emailError = 'Please provide an Email Address';
    }

    if (!this.state.selected) {
      selectError = 'Please select a Service Type';
    }

    if (!this.state.checkbox) {
      checkError = 'Please accept the terms';
    }

    if (firstNameError || lastNameError || emailError || selectError || checkError) {
      this.setState({firstNameError, lastNameError, emailError, selectError, checkError});
      return false;
    }

    return true;
  }

  handleSelect = (event) => {
    this.setState({selected: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      axios.post('http://localhost:49567/api/assistance-requests', {
        "assistance_request": {
          "contact": {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email
          },
          "service_type": this.state.selected,
          "description": this.state.content
        }
      }).then((response) => {
        if (response.status === 201) {
          this.clearInputs();
        }
      }).catch((error) => {
        this.setState({error: true, errorCode: error.response.status});
      });
    }
  }

  render() {
    if (this.state.error) {
      throw new Error(this.state.errorCode);
    }

    const data = this.props.data
    const services = data.map(item => {
      return (
        <option key={item.id} value={item.display_name}>{item.display_name}</option>
      )
    })

    if (this.state.submitted) {
      return (
        <div className="container title mb-5">
          <p className="text-center">Your assistance request has been successfully submitted.</p>
          <Button variant="success" onClick={this.resetPage}>
            Submit a New Request
          </Button>
        </div>
      )
    } else {
      return (
        <div className="container col-md-6 offset-md-3 mb-5">
          <Form onSubmit={this.handleSubmit} noValidate>
            <h1 className="text-center mb-4">New Assistance Request</h1>
            <Form.Group controlId="addServices.ControlInput1">
              <Form.Control
                type="text"
                name="firstName"
                onChange={this.handleInput}
                placeholder="First Name"/>
              <span className="error">
                <small>{this.state.firstNameError}</small>
              </span>
            </Form.Group>
            <Form.Group controlId="addServices.ControlInput2">
              <Form.Control
                type="text"
                name="lastName"
                onChange={this.handleInput}
                placeholder="Last Name"
                required/>
              <span className="error">
                <small>{this.state.lastNameError}</small>
              </span>
            </Form.Group>
            <Form.Group controlId="addServices.ControlInput3">
              <Form.Control
                type="email"
                name="email"
                onChange={this.handleInput}
                placeholder="Email Address"
                required/>
              <span className="error">
                <small>{this.state.emailError}</small>
              </span>
            </Form.Group>
            <Form.Group controlId="addServices.ControlSelect">
              <Form.Control
                as="select"
                value={this.state.selected}
                onChange={this.handleSelect}
                required>
                <option>Select Service Type</option>
                {services}
              </Form.Control>
              <span className="error">
                <small>{this.state.selectError}</small>
              </span>
            </Form.Group>
            <Form.Group controlId="addServices.ControlTextarea">
              <Form.Control
                as="textarea"
                name="content"
                onChange={this.handleInput}
                rows="3"
                required/>
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check
                type="checkbox"
                name="checkbox"
                onChange={this.handleInput}
                label="I hearby accept the terms of service for THE NETWORK and the Privacy Policy."/>
              <span className="error">
                <small>{this.state.checkError}</small>
              </span>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Get Assistance
              </Button>
            </div>
          </Form>
        </div>
      )
    }
  }
}

export default AddServicesForm;
