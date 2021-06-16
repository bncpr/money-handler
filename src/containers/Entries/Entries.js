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
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Filters } from "../../components/Filters/Filters"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { TableHead } from "../../components/UI/Table/TableHead"
import { TableRow } from "../../components/UI/Table/TableRow"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"

const headers = ["Date", "Value", "Payer", "Category", "Tags", "more"]

export const Entries = ({
  surfaceData,
  fields,
  filters,
  counts,
  setFilter,
  signedIn,
}) => {
  const dispatch = useDispatch()

  const {
    pageSize,
    page,
    pagesNum,
    onChangePage,
    onChangePageSize,
    resetPage,
  } = usePagination(surfaceData.length, 20, filters)

  useEffect(() => {
    resetPage()
  }, [filters])

  const [pickedEntry, setPickedEntry] = useState()

  const onPickEntry = event => {
    setPickedEntry(event.target.value)
  }

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen()
  const onOpenEdit = () => setIsOpen("edit")
  const onOpenDel = () => setIsOpen("del")
  const onOpenNew = () => setIsOpen("new")

  const deleteEntry = async () => {
    await dispatch(removeEntryFromDbThunk(pickedEntry))
    onClose()
  }

  return (
    <Box>
      <Grid templateColumns='1fr auto 1fr' columnGap={6} pt={9}>
        {/* <GridItem colStart='3' rowStart='1'>
          {signedIn || <LoginForm />}
        </GridItem> */}
        <GridItem colStart='1' rowStart='1' justifySelf='end'>
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
            {signedIn && (
              <Button
                onClick={onOpenNew}
                leftIcon={<AddIcon />}
                colorScheme='purple'
              >
                ADD ENTRY
              </Button>
            )}
          </VStack>
        </GridItem>
        <GridItem colStart='2' rowStart='1' rowSpan='1'>
          <Box shadow='xl' p={6} borderRadius='lg'>
            <Table variant='simple' size='sm'>
              <TableHead headers={headers} />
              <Tbody>
                {surfaceData
                  .slice(page * pageSize, page * pageSize + pageSize)
                  .map(d => (
                    <TableRow
                      key={d.id}
                      d={d}
                      onDelete={onOpenDel}
                      onEdit={onOpenEdit}
                      onPick={onPickEntry}
                    />
                  ))}
              </Tbody>
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
      </Grid>

      <Portal>
        <DeleteEntryAlert
          isOpen={isOpen === "del"}
          onClose={onClose}
          onYes={deleteEntry}
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
    </Box>
  )
}
