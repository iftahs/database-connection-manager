import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { DatabasesContext } from "../../store/databases-context";
import { DatabaseDetailsContainer } from "./styled";

const DatabaseDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { databases } = useContext(DatabasesContext);
    const database = databases.find((db) => String(db.id) === id);

    if (!database) {
        return <h1>Database not found</h1>;
    }

    const { name, username, type, url, password } = database;
    

    return (
        <DatabaseDetailsContainer>
            <Link to="/databases">← Back to databases</Link>
            <h1>{name}</h1>
            <p>Username: <strong>{username}</strong></p>
            <p>Type: <strong>{type}</strong></p>
            <p>URL: <a href={url} target="_blank" rel="noreferrer"><strong>{url}</strong></a></p>
            <p>Password: <strong>{password}</strong></p>
        </DatabaseDetailsContainer>
    );
};

export default DatabaseDetailsPage;