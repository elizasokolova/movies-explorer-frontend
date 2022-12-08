const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject({
        message: response.statusText,
        status: response.status,
    });
};

export default handleResponse;