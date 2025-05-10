import type { ApiError } from "./client";
import useCustomToast from "./hooks/useCustomToast";
import i18n  from "i18next"; // Import i18n instance

// Helper function to get translations without hook
const t = (key: string) => i18n.t(key, { ns: "validation" });

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: t("email.invalid"), // Translated message
};

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: t("name.invalid"), // Translated message
};

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: t("password.min_length"), // Translated message
    },
  };

  if (isRequired) {
    rules.required = t("password.required"); // Translated message
  }

  return rules;
};

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password;
      return value === password ? true : t("password.mismatch"); // Translated message
    },
  };

  if (isRequired) {
    rules.required = t("password.confirm_required"); // Translated message
  }

  return rules;
};

export const handleError = (err: ApiError) => {
  const { showErrorToast } = useCustomToast();
  const errDetail = (err.body as any)?.detail;
  let errorMessage = errDetail || t("errors.generic"); // Translated default error
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg;
    // You might want to add translation mapping for API error messages here
  }
  showErrorToast(errorMessage);
};
