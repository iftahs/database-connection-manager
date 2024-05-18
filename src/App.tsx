import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import DatabasesPage from "./pages/databases";
import DatabaseDetailsPage from "./pages/database-details";

interface IProps {}

const router = createBrowserRouter([
    {
        path: "/",
        element: <DatabasesPage />,
    },
    {
        path: "/databases",
        element: <DatabasesPage />,
    },
    {
        path: "/databases/:id",
        element: <DatabaseDetailsPage />,
    },
]);

const App: React.FC<IProps> = () => {
    return (
        <div>
            <Header />
            <Container>
                <RouterProvider router={router} />
            </Container>
        </div>
    );
};

const Container = styled.main`
    margin: 0 auto;
    max-width: 800px;
    padding: 1rem;
`;

export default App;
