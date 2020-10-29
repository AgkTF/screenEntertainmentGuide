import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: '',
    errorInfo: '',
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.setState.hasError) {
      return (
        <p className="text-sm font-semibold font-bai text-red-700">
          Something went wrong!
        </p>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
