class CustomErrorHandler {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static error(status = 500, message = "internal server error") {
        return new CustomErrorHandler(status, message);
    }
}

export default CustomErrorHandler;