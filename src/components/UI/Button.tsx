import styled from "styled-components";

export const Button = styled.button<{ $fullWidth?: boolean }>`
    background-color: #61dafb;
    color: black;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    height: fit-content;
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

    &:hover {
        background-color: #dea8a8;
    }

    &:active {
        background-color: #dea8a8;
        transform: translateY(2px);
    }
`;
