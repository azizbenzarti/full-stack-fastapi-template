import { Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <HStack spacing={2}>
            <Button
                size="sm"
                variant={i18n.language === 'en' ? 'solid' : 'outline'}
                onClick={() => changeLanguage('en')}
            >
                EN
            </Button>
            <Button
                size="sm"
                variant={i18n.language === 'fr' ? 'solid' : 'outline'}
                onClick={() => changeLanguage('fr')}
            >
                FR
            </Button>
        </HStack>
    );
}; 