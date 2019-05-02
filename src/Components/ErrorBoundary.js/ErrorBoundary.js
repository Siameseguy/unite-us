import React from 'react';
import Button from 'react-bootstrap/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
      errorNumber: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true, error: error, info: info, errorNumber: error.message});
    console.log(error.message);
  }

  switchCases(params) {
    switch (params) {
      case '401':
        return <p className="text-center">Sorry, you are not authorized to make this request.</p>;
      case '500':
        return <p className="text-center">Oh no! Something completely unexpected happened!</p>;
      case '503':
        return <p className="text-center">We're down!!!!!! Come back later.....(please).</p>;
      default:
        return <p className="text-center">Oh snap! Something went wrong!</p>;
    }

  }

  resetError = () => {
    this.setState({hasError: false, error: null, info: null})
  }

  render() {
    if (this.state.info) {
      return (
        <div className="container">
          {this.switchCases(this.state.errorNumber)}
          <div className="d-flex justify-content-center align-items center">
            <Button variant="success" onClick={this.resetError}>Try Again</Button>
          </div>
        </div>
      )

    }

    return this.props.children;
  }
}

export default ErrorBoundary;