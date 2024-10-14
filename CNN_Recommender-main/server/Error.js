//different types of errors that can occur in the server

class ClientError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name - "ClientError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name - "NotFoundError";
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name - "InternalServerError";
    }
}

module.exports = {
    ClientError,
    InternalServerError,
    NotFoundError,
};
