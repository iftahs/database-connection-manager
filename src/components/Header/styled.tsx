import styled from "styled-components";

export const Container = styled.header`
    background-color: #282c34;
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 0 1rem;
    align-items: center;

    span:first-child {
        color: #61dafb;
    }

    span:last-child {
        color: #dea8a8;
    }

    h1 {
        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }
`;