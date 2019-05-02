import React, {Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

class AddServices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      items: [],
      addServicesForm: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        selected: '',
        content: ''
      }
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:49567/api/service-types');
      this.setState({items: response.data.data});
    } catch (error) {
      this.setState({error: 'this is an error'});
    }
  }

  handleInput = (event) => {
    this.setState({
      addServicesForm: {
        [event.target.name]: event.target.value
      }
    })
  }

  handleSelect = (event) => {
    this.setState({
      addServicesForm: {
        selected: event.target.value
      }
    })
  }

  render() {
    const services = this
      .state
      .items
      .map(item => {
        return (
          <option key={item.id} value={item.display_name}>{item.display_name}</option>
        )
      })
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control
              type="text"
              name="firstName"
              onChange={this.handleInput}
              placeholder="First Name"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control
              type="text"
              name="lastName"
              onChange={this.handleInput}
              placeholder="Last Name"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlInput">
            <Form.Control
              type="email"
              name="email"
              onChange={this.handleInput}
              placeholder="Email Address"/>
          </Form.Group>
          <Form.Group controlId="addServices.ControlSelect">
            <Form.Control
              as="select"
              value={this.state.addServicesForm.selected}
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
        </Form>
      </div>
    )
  }
}

export default AddServices;
