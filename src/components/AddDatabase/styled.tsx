import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-block-end: 1rem;
    gap: 1rem;
    justify-content: space-between;
    width: 400px;

    @media (max-width: 768px) {
        width: 100%;
    }
`