import { Component, ErrorInfo, ReactElement } from 'react';

type ErrorBoundaryProps = {
  children: ReactElement;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <p>Ошибка</p>;
    }

    return this.props.children;
  }
}
