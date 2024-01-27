export function HTTPError({
  param,
  message,
}: {
  param?: string;
  message?: string;
}) {
  let statusCode;
  if (param) {
    statusCode = 400;
    if (!message) message = missingParam(param);
  }
  if (!message) message = InternalError;
  const er = JSON.stringify({ statusCode, message });
  return new Error(er);
}

export const InternalError = 'Internal Error';

const missingParam = (param: string) => `Provide valid ${param}.`;

export const Regex = {
  email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
};

export const passwordNotMatch = 'Passwords does not match.';
