import { Component, ErrorInfo } from "react";

export default class ErrorBoundary extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return <p>Ошибка</p>
        }

        return this.props.children
    }
}