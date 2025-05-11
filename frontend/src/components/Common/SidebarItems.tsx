import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers } from "react-icons/fi"
import { useTranslation } from "react-i18next"

import type { UserPublic } from "../../client"

const SidebarItems = ({ onClose }: { onClose?: () => void }) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.light")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { t } = useTranslation()

  const items = [
    { icon: FiHome, title: t('navigation.dashboard'), path: "/" },
    { icon: FiBriefcase, title: t('navigation.items'), path: "/items" },
    { icon: FiSettings, title: t('navigation.userSettings'), path: "/settings" },
  ]

  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: t('navigation.admin'), path: "/admin" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <Flex
      as={Link}
      to={path}
      w="100%"
      p={2}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={icon} alignSelf="center" />
      <Text ml={2}>{title}</Text>
    </Flex>
  ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
