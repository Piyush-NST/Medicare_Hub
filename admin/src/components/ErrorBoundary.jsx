import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-[#F8F9FD]">
                    <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
                        <div className="text-5xl mb-4">!</div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
                        <p className="text-gray-500 mb-6">{this.state.error?.message || "An unexpected error occurred"}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-900 text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;