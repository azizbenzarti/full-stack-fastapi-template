import { Button, Flex, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

type PaginationFooterProps = {
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  onChangePage: (newPage: number) => void
  page: number
}

export function PaginationFooter({
  hasNextPage,
  hasPreviousPage,
  onChangePage,
  page,
}: PaginationFooterProps) {
  const { t } = useTranslation()

  return (
    <Flex
      gap={4}
      alignItems="center"
      mt={4}
      direction="row"
      justifyContent="flex-end"
    >
      <Button
        onClick={() => onChangePage(page - 1)}
        isDisabled={!hasPreviousPage || page <= 1}
      >
        {t('common.previous')}
      </Button>
      <Text>{t('common.page', { number: page })}</Text>
      <Button isDisabled={!hasNextPage} onClick={() => onChangePage(page + 1)}>
        {t('common.next')}
      </Button>
    </Flex>
  )
}
