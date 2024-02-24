const {REACT_APP_BACKEND_URL} = process.env

export const backendUrl = REACT_APP_BACKEND_URL || "http://localhost:8080/"

export const apiV1 = backendUrl