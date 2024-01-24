export const commonModel = {
  string: (required: boolean = true) => ({
    type: String,
    ...(required ? { required: true } : {}),
  }),
};
