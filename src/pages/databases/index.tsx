import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DatabasesContext } from "../../store/databases-context";
import { DatabasesList, TableItem, TableHeader, SpinnerContainer } from "./styled";
import { Spinner } from "../../components/UI";

const DatabasesPage: React.FC = () => {
    const { databases, isLoading } = useContext(DatabasesContext);
    const navigate = useNavigate();

    if (isLoading) {
        return <SpinnerContainer><Spinner /></SpinnerContainer>;
    }

    if (!databases || databases.length === 0) {
        return <h1>No databases found</h1>;
    }

    const handleClickedDatabase = (id: number | string) => {
        navigate(`/databases/${id}`);
    };

    return (
        <>
            <h1>Databases</h1>
            <DatabasesList data-testid="databases-list">
                <TableHeader>
                    <div>Name</div>
                    <div>Username</div>
                    <div>Type</div>
                </TableHeader>
                {databases.map((database) => (
                    <TableItem
                        key={database.id}
                        onClick={() => handleClickedDatabase(database.id)}
                    >
                        <div>{database.name}</div>
                        <div>{database.username}</div>
                        <div>{database.type}</div>
                    </TableItem>
                ))}
            </DatabasesList>
        </>
    );
};

export default DatabasesPage;
