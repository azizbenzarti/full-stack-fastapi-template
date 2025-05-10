import type { ApiError } from "./client"
import { useTranslation } from "react-i18next"

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
}

export const passwordRules = (isRequired = true) => {
  const { t } = useTranslation()
  const rules: any = {
    minLength: {
      value: 8,
      message: t("signup.passwordMinLength"),
    },
  }

  if (isRequired) {
    rules.required = t("signup.passwordRequired")
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
) => {
  const { t } = useTranslation()
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : t("signup.passwordsDoNotMatch")
    },
  }

  if (isRequired) {
    rules.required = t("signup.confirmPasswordRequired")
  }

  return rules
}

export const handleError = (err: ApiError, showToast: any) => {
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showToast("Error", errorMessage, "error")
}
