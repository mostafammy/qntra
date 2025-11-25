export type FormState = {
  status: "success" | "error" | "idle";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialFormState: FormState = {
  status: "idle",
};
