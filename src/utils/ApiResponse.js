class ApiResponse {
  constructor(statusCode, data, message, success) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
  }
}

const response = new ApiResponse();
