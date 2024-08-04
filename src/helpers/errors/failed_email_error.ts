import { BaseError } from "./base_error";

export class FailToSendEmail extends BaseError {
    constructor(message: string) {
      super(`Fail to send email for ${message}`);
    }
}