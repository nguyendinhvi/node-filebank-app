export enum ResponseCode {
  ok = "ok",
  error = "error",
  unauthorized = "unauthorized",
  user_not_found = "user_not_found",
  token_missing_or_invalid = "token_missing_or_invalid",
  missing_signature_or_address = "missing_signature_or_address",
  email_or_password_is_wrong = "email_or_password_is_wrong",
  create_success = "create_success",
  delete_success = "delete_success",
  forbidden = "forbidden",
}

export const ErrorMessages = new Map([
  [ResponseCode.error, "Something error during process the request"],
  [
    ResponseCode.missing_signature_or_address,
    "Request should have signature and public_addres",
  ],
  [ResponseCode.email_or_password_is_wrong, "Email or password is wrong"],
]);
