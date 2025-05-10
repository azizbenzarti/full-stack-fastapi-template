import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      signup: {
        logoAlt: 'FastAPI logo',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Full Name',
        fullNameRequired: 'Full Name is required',
        email: 'Email',
        emailPlaceholder: 'Email',
        emailRequired: 'Email is required',
        password: 'Password',
        passwordPlaceholder: 'Password',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordPattern: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        confirmPassword: 'Repeat Password',
        confirmPasswordPlaceholder: 'Repeat Password',
        confirmPasswordRequired: 'Please confirm your password',
        passwordsDoNotMatch: 'Passwords do not match',
        signUpButton: 'Sign Up',
        alreadyHaveAccount: 'Already have an account?',
        login: 'Log In'
      }
    }
  },
  fr: {
    translation: {
      signup: {
        logoAlt: 'Logo FastAPI',
        fullName: 'Nom complet',
        fullNamePlaceholder: 'Nom complet',
        fullNameRequired: 'Le nom complet est requis',
        email: 'Email',
        emailPlaceholder: 'Email',
        emailRequired: 'L\'email est requis',
        password: 'Mot de passe',
        passwordPlaceholder: 'Mot de passe',
        passwordRequired: 'Le mot de passe est requis',
        passwordMinLength: 'Le mot de passe doit contenir au moins 8 caractères',
        passwordPattern: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
        confirmPassword: 'Répéter le mot de passe',
        confirmPasswordPlaceholder: 'Répéter le mot de passe',
        confirmPasswordRequired: 'Veuillez confirmer votre mot de passe',
        passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
        signUpButton: 'S\'inscrire',
        alreadyHaveAccount: 'Vous avez déjà un compte ?',
        login: 'Se connecter'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 