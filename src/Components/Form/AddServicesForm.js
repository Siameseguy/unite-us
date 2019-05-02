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
      content: ''
    }
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
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const data = this.props.data
    const services = data.map(item => {
      return (
        <option key={item.id} value={item.display_name}>{item.display_name}</option>
      )
    })
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
        </Form>
      </div>
    )
  }
}

export default AddServicesForm;
