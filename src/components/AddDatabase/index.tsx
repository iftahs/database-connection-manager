import { useState, ChangeEvent, useCallback, useContext } from "react";
import { Button, Input } from "../UI";
import { Container } from "./styled";
import { DatabaseType, DatabasesContext } from "../../store/databases-context";

type InputData = {
    value: string;
    error: string;
    touched?: boolean;
};

type FormData = {
    name: InputData;
    type: {
        value: DatabaseType | "";
        error: string;
        touched?: boolean;
    };
    url: InputData;
    username: InputData;
    password: InputData;
};

interface AddDatabaseProps {
    onFinishAddDatabase: () => void;
};


const AddDatabase: React.FC<AddDatabaseProps> = ({ onFinishAddDatabase }) => {
    const { addDatabase } = useContext(DatabasesContext);
    const [formData, setFormData] = useState<FormData>({
        name: { value: "", error: "" },
        type: { value: "", error: "" },
        url: { value: "", error: "" },
        username: { value: "", error: "" },
        password: { value: "", error: "" },
    });

    const validateField = useCallback((name: keyof FormData, value: string) => {
        if (!value) {
            setFormData((prev) => ({
                ...prev,
                [name]: {
                    ...prev[name],
                    error: "This field is required",
                },
            }));
        }   
    }, []);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: {
                value,
                error: "",
                touched: true,
            },
        }));
        validateField(name as keyof FormData, value);
    }, [validateField]);

    const handleSubmit = useCallback(() => {
        for (const key in formData) {
            const field = formData[key as keyof FormData];
            field.touched = true;
            validateField(key as keyof FormData, field.value);
        }

        if (Object.values(formData).every((input) => input.value)) {
            addDatabase({
                id: Date.now(),
                name: formData.name.value,
                type: formData.type.value as DatabaseType,
                url: formData.url.value,
                username: formData.username.value,
                password: formData.password.value,
            });
            onFinishAddDatabase();
        }
    }, [addDatabase, formData, onFinishAddDatabase, validateField]);

    return (
        <Container>
            <Input
                type="text"
                name="name"
                label="Database Name"
                required
                value={formData.name.value}
                error={formData.name.error}
                touched={formData.name.touched}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="type"
                label="Database Type"
                required
                value={formData.type.value}
                error={formData.type.error}
                touched={formData.type.touched}
                onChange={handleChange}
            />
            <Input
                type="url"
                name="url"
                label="Database Url"
                required
                value={formData.url.value}
                error={formData.url.error}
                touched={formData.url.touched}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="username"
                label="Database Username"
                required
                value={formData.username.value}
                error={formData.username.error}
                touched={formData.username.touched}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                label="Database Password"
                required
                value={formData.password.value}
                error={formData.password.error}
                touched={formData.password.touched}
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} $fullWidth>Add Database</Button>
        </Container>
    );
};

export default AddDatabase;
