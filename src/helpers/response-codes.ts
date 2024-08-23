export enum ResponseCodes {
  ok = "ok",
  error = "error",
  email_account_already_exists = "email_account_already_exists",
  unauthorized = "unauthorized",
  user_not_found = "user_not_found",
  token_missing_or_invalid = "token_missing_or_invalid",
  missing_signature_or_address = "missing_signature_or_address",
  email_or_password_is_wrong = "email_or_password_is_wrong",
  create_success = "create_success",
}

export const ErrorMessages = new Map([
  [ResponseCodes.error, "Something error during process the request"],
  [
    ResponseCodes.missing_signature_or_address,
    "Request should have signature and public_addres",
  ],
]);
