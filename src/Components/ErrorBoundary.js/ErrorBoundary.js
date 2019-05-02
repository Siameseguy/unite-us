import React from 'react';
import Button from 'react-bootstrap/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({error: true});
    console.log(error.props);
  }

  resetError = () => {
    this.setState({error: false})
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container d-flex justify-content-center align-items-center">
          <p className="text-center">Oh snap! Something went wrong!</p>
          <Button variant="success" onClick={this.resetError}>Try Again</Button>
        </div>
      )

    }

    return this.props.children;
  }
}

export default ErrorBoundary;