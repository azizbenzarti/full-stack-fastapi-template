import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import Logo from "/assets/images/fastapi-logo.svg"
import type { UserRegister } from "../client"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { confirmPasswordRules, emailPattern, passwordRules } from "../utils"

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface UserRegisterForm extends UserRegister {
  confirm_password: string
}

function SignUp() {
  const { t } = useTranslation()
  const { signUpMutation } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <>
      <Flex flexDir={{ base: "column", md: "row" }} justify="center" h="100vh">
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
            alt={t("signup.logoAlt")}
            height="auto"
            maxW="2xs"
            alignSelf="center"
            mb={4}
          />
          <FormControl id="full_name" isInvalid={!!errors.full_name}>
            <FormLabel htmlFor="full_name" srOnly>
              {t("signup.fullName")}
            </FormLabel>
            <Input
              id="full_name"
              minLength={3}
              {...register("full_name", { required: t("signup.fullNameRequired") })}
              placeholder={t("signup.fullNamePlaceholder")}
              type="text"
            />
            {errors.full_name && (
              <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel htmlFor="email" srOnly>
              {t("signup.email")}
            </FormLabel>
            <Input
              id="email"
              {...register("email", {
                required: t("signup.emailRequired"),
                pattern: emailPattern,
              })}
              placeholder={t("signup.emailPlaceholder")}
              type="email"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel htmlFor="password" srOnly>
              {t("signup.password")}
            </FormLabel>
            <Input
              id="password"
              {...register("password", passwordRules())}
              placeholder={t("signup.passwordPlaceholder")}
              type="password"
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="confirm_password"
            isInvalid={!!errors.confirm_password}
          >
            <FormLabel htmlFor="confirm_password" srOnly>
              {t("signup.confirmPassword")}
            </FormLabel>

            <Input
              id="confirm_password"
              {...register("confirm_password", confirmPasswordRules(getValues))}
              placeholder={t("signup.confirmPasswordPlaceholder")}
              type="password"
            />
            {errors.confirm_password && (
              <FormErrorMessage>
                {errors.confirm_password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            {t("signup.signUpButton")}
          </Button>
          <Text>
            {t("signup.alreadyHaveAccount")}{" "}
            <Link as={RouterLink} to="/login" color="blue.500">
              {t("signup.login")}
            </Link>
          </Text>
        </Container>
      </Flex>
    </>
  )
}

export default SignUp
