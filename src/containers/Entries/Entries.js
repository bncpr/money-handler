import { AddIcon } from "@chakra-ui/icons"
import { Box } from "@chakra-ui/layout"
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Portal,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Filters } from "../../components/Filters/Filters"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { TableRow } from "../../components/UI/Table/TableRow"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"

export const Entries = ({
  surfaceData,
  fields,
  filters,
  counts,
  setFilter,
  signedIn,
}) => {
  const dispatch = useDispatch()

  const toast = useToast()

  const {
    pageSize,
    page,
    pagesNum,
    onChangePage,
    onChangePageSize,
    resetPage,
  } = usePagination(surfaceData.length, 12, filters)

  useEffect(() => {
    resetPage()
  }, [filters, resetPage])

  const [pickedEntry, setPickedEntry] = useState()

  const onPickEntry = id => {
    setPickedEntry(id)
  }

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen()
  const onOpenEdit = () => setIsOpen("edit")
  const onOpenDel = () => setIsOpen("del")
  const onOpenNew = () => setIsOpen("new")

  const [isDeleting, setIsDeleting] = useState(false)

  const deleteEntry = () => {
    setIsDeleting(true)
    setTimeout(() => {
      dispatch(removeEntryFromDbThunk(pickedEntry))
      onClose()
      setIsDeleting(false)
    }, 0)
  }

  const paginated = surfaceData.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  return (
    <Grid templateColumns='1fr auto 1fr' columnGap={6} pt={9}>
      <GridItem colStart='3' rowStart='1' justifySelf='start'>
        <VStack
          spacing={6}
          align='stretch'
          width='2xs'
          shadow='xl'
          px={10}
          py={6}
          borderRadius='lg'
        >
          <Box>
            <Heading size='md' fontWeight='semibold' p={2}>
              Filters
            </Heading>
            <Filters
              filters={filters}
              counts={counts}
              fields={fields}
              setFilter={setFilter}
            />
          </Box>
          <Button
            onClick={onOpenNew}
            leftIcon={<AddIcon />}
            colorScheme='green'
          >
            ADD ENTRY
          </Button>
        </VStack>
      </GridItem>
      <GridItem colStart='2' rowStart='1' rowSpan='1' colSpan='1'>
        <Box shadow='xl' px={6} py={3} borderRadius='lg'>
          <Table variant='simple' size='md'>
            <Thead>
              <Tr>
                <Th isNumeric>Date</Th>
                <Th isNumeric>Value</Th>
                <Th>Payer</Th>
                <Th>Category</Th>
                <Th>Tags</Th>
                <Th>More</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginated.map(d => (
                <TableRow
                  key={d.id}
                  d={d}
                  onDelete={onOpenDel}
                  onEdit={onOpenEdit}
                  onPick={onPickEntry}
                />
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th isNumeric>Total:</Th>
                <Th isNumeric>{R.sum(paginated.map(R.prop("value")))}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
        <PagePanel
          pos='fixed'
          bottom='0'
          left='50%'
          transform='translate(-50%, 0)'
          p={2}
          page={page}
          pagesNum={pagesNum}
          pageSize={pageSize}
          changePage={onChangePage}
          changePageSize={onChangePageSize}
        />
      </GridItem>
      <Portal>
        <DeleteEntryAlert
          isOpen={isOpen === "del"}
          onClose={onClose}
          onYes={deleteEntry}
          isLoading={isDeleting}
        />
        <UpdateEntryDrawerForm
          isOpen={isOpen === "edit"}
          onClose={onClose}
          placement='left'
          header='Edit Entry'
          pickedEntry={pickedEntry}
          fields={fields}
          component={EntryForm}
        />
        <NewEntryDrawerForm
          isOpen={isOpen === "new"}
          onClose={onClose}
          placement='right'
          header='Create New Entry'
          fields={fields}
          component={EntryForm}
        />
      </Portal>
    </Grid>
  )
}
