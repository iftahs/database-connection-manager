import styled from "styled-components";

export const DatabasesList = styled.div`
    width: 100%;
    text-align: center;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid #ccc;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    gap: 0.5rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled(Row)`
    background-color: #61dafb;
    font-weight: bold;
`;

export const TableItem = styled(Row)`
    background-color: #dea8a8;
    transition: box-shadow 0.3s;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;