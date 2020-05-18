class APIResponse {
  constructor(response, message, data) {
    this.response = response;
    this.message = message;
    this.data = data;
  }
}

module.exports = APIResponse;
