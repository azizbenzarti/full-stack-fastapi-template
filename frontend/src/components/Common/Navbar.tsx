import type { ComponentType, ElementType } from "react"

import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "../LanguageSwitcher"

interface NavbarProps {
  type: string
  addModalAs: ComponentType | ElementType
}

const Navbar = ({ type, addModalAs }: NavbarProps) => {
  const addModal = useDisclosure()
  const { t } = useTranslation()

  const AddModal = addModalAs
  return (
    <>
      <Flex py={8} gap={4} justify="space-between" align="center">
        <Flex gap={4}>
          {/* TODO: Complete search functionality */}
          {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
              <InputLeftElement pointerEvents='none'>
                  <Icon as={FaSearch} color='ui.dim' />
              </InputLeftElement>
              <Input type='text' placeholder={t('common.search')} fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
          </InputGroup> */}
          <Button
            variant="primary"
            gap={1}
            fontSize={{ base: "sm", md: "inherit" }}
            onClick={addModal.onOpen}
          >
            <Icon as={FaPlus} /> {t('common.create')} {type}
          </Button>
        </Flex>
        <LanguageSwitcher />
        <AddModal isOpen={addModal.isOpen} onClose={addModal.onClose} />
      </Flex>
    </>
  )
}

export default Navbar
