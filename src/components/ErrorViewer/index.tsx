const ErrorViewer: React.FC<{ error: string }> = ({ error }) => {
    return (
        <div>
            <h1>Error occurred</h1>
            <p>Please try again later</p>
        </div>
    );
};

export default ErrorViewer;