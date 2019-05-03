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
      error: false,
      errorCode: '',
      submitted: false
    }
  }

  clearInputs() {
    this.setState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      selected: '',
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelect = (event) => {
    this.setState({selected: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
        console.log('success', response.status)

      }
    }).catch((error) => {
      this.setState({error: true, errorCode: error.response.status});
    });
  }

  render() {
    if (this.state.error) {
      throw new Error(this.state.errorCode)
    }

    const data = this.props.data
    const services = data.map(item => {
      return (
        <option key={item.id} value={item.display_name}>{item.display_name}</option>
      )
    })

    if (this.state.submitted) {
      return (
        <div className="container title">
          <p className="text-center">Your assistance request has been successfully submitted.</p>
          <Button variant="success" onClick={this.resetPage}>
            Submit a New Request
          </Button>
        </div>
      )
    } else {
      return (
        <div className="container col-md-6 .offset-md-3">
          <Form onSubmit={this.handleSubmit}>
            <h1 className="text-center mb-4">New Assistance Request</h1>
            <Form.Group controlId="addServices.ControlInput1">
              <Form.Control
                type="text"
                name="firstName"
                onChange={this.handleInput}
                placeholder="First Name"/>
            </Form.Group>
            <Form.Group controlId="addServices.ControlInput2">
              <Form.Control
                type="text"
                name="lastName"
                onChange={this.handleInput}
                placeholder="Last Name"/>
            </Form.Group>
            <Form.Group controlId="addServices.ControlInput3">
              <Form.Control
                type="email"
                name="email"
                onChange={this.handleInput}
                placeholder="Email Address"/>
            </Form.Group>
            <Form.Group controlId="addServices.ControlSelect">
              <Form.Control
                as="select"
                value={this.state.selected}
                onChange={this.handleSelect}>
                <option>Select Service Type</option>
                {services}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="addServices.ControlTextarea">
              <Form.Control
                as="textarea"
                name="content"
                onChange={this.handleInput}
                rows="3"/>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            {this.state.error}
          </Form>
        </div>
      )
    }
  }
}

export default AddServicesForm;
