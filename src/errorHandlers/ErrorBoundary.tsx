import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}
  
// interface ErrorBoundaryState {
//     hasError: boolean;
//     error?: Error;
// }

export default class ErrorBoundary extends Component<any, any> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }
    static getDerivedStateFromError(error: any)  {
        console.error("Error from component", error)
        return { hasError: true, error }
    }

    componentDidCatch(error: any, errorInfo: any): void {
        console.error("Error Boundary caught an error:", error, errorInfo)
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}