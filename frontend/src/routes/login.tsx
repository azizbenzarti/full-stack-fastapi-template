import { Container, Image, Input, Text } from "@chakra-ui/react";
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next"; // Add this import

import type { Body_login_login_access_token as AccessToken } from "@/client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import useAuth, { isLoggedIn } from "@/hooks/useAuth";
import Logo from "/assets/images/fastapi-logo.svg";
import { emailPattern, passwordRules } from "../utils";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function Login() {
  const { t } = useTranslation(["auth", "common"]); // Initialize translation
  const { loginMutation, error, resetError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return;

    resetError();

    try {
      await loginMutation.mutateAsync(data);
    } catch {
      // error is handled by useAuth hook
    }
  };

  return (
    <>
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h="100vh"
        maxW="sm"
        alignItems="stretch"
        justifyContent="center"
        gap={4}
        centerContent
      >
        <Image
          src={Logo}
          alt={t("login.logo_alt")} // Translated alt text
          height="auto"
          maxW="2xs"
          alignSelf="center"
          mb={4}
        />
        <Field
          invalid={!!errors.username}
          errorText={errors.username?.message || !!error}
        >
          <InputGroup w="100%" startElement={<FiMail />}>
            <Input
              id="username"
              {...register("username", {
                required: t("errors.required"), // Translated validation
                pattern: {
                  value: emailPattern,
                  message: t("errors.invalid_email"), // Translated validation
                },
              })}
              placeholder={t("login.email_placeholder")} // Translated placeholder
              type="email"
            />
          </InputGroup>
        </Field>
        <PasswordInput
          type="password"
          startElement={<FiLock />}
          {...register("password", {
            ...passwordRules(),
            required: t("errors.required"), // Translated validation
          })}
          placeholder={t("login.password_placeholder")} // Translated placeholder
          errors={errors}
        />
        <RouterLink to="/recover-password" className="main-link">
          {t("login.forgot_password")} {/* Translated link */}
        </RouterLink>
        <Button variant="solid" type="submit" loading={isSubmitting} size="md">
          {t("login.submit_button")} {/* Translated button */}
        </Button>
        <Text>
          {t("login.no_account_text")} {/* Translated text */}
          <RouterLink to="/signup" className="main-link">
            {t("login.signup_link")} {/* Translated link */}
          </RouterLink>
        </Text>
      </Container>
    </>
  );
}
