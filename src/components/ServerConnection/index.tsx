import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type status = "WORKING" | "NOT WORKING" | "LOADING";

const statusInfo = {
    WORKING: {
        statusMessage: "Fake server is working",
        statusColor: "green",
    },
    "NOT WORKING": {
        statusMessage: "Fake server is not working",
        statusColor: "red",
    },
    LOADING: {
        statusMessage: "Loading...",
        statusColor: "yellow",
    },
};

const ServerConnection = () => {
    const [serverStatus, setServerStatus] = useState<status>("LOADING");

    const { statusMessage, statusColor } = useMemo(
        () => statusInfo[serverStatus],
        [serverStatus]
    );

    useEffect(() => {
        const fakeServerUrl = "http://localhost:4000/databases";

        axios
            .get(fakeServerUrl)
            .then((response) => {
                setServerStatus("WORKING");
                console.log(response.data);
            })
            .catch(() => {
                setServerStatus("NOT WORKING");
            });
    }, []);

    return (
        <div>
            <h5 style={{ color: statusColor }}>{statusMessage}</h5>
        </div>
    );
};

export default ServerConnection;
