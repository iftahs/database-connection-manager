import { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    justify-content: space-between;
    width: 100%;
`;

type StyledInputProps = {
    $error?: string;
};

const StyledInput = styled.input<StyledInputProps>`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
    border: 1px solid
        ${(props: StyledInputProps) => (props.$error ? "#ff0000" : "#ccc")};
    &:focus {
        border-color: #007bff;
    }
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    $error?: string;
    label: string;
    error?: string;
    touched?: boolean;
    type: string | HTMLInputTypeAttribute;
    children?: React.ReactNode;
}

const Input: React.FC<IProps> = ({
    label,
    error,
    touched,
    type,
    children,
    ...props
}) => {
    return (
        <Container>
            <label>{label}</label>
            <StyledInput $error={error} type={type} {...props} />
            {error && touched && (
                <small style={{ color: "#ff0000" }}>{error}</small>
            )}
        </Container>
    );
};

export default Input;
