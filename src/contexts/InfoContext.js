import { createContext } from "react";

export const InfoState = {
    isOpen: false,
    message: "",
    success: false
};

export const InfoContext = createContext();
