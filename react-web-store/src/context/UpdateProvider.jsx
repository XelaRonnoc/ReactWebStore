import { createContext, useState } from "react";

export const UpdateContext = createContext({
    updated: 0,
    setUpdated: () => {},
});

const UpdateProvider = ({ children }) => {
    const [updated, setUpdated] = useState(0);

    const updatePage = () => {
        setUpdated(updated + 1);
    };

    const updateData = { updated, updatePage };
    return (
        <UpdateContext.Provider value={updateData}>
            {children}
        </UpdateContext.Provider>
    );
};

export default UpdateProvider;
