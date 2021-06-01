import { useEffect, useState } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import { Box, Stack } from "@chakra-ui/layout"
import { Table, Tbody, Portal, Button } from "@chakra-ui/react"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { useDispatch } from "react-redux"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { Filters } from "../../components/Filters/Filters"
import { TableRow } from "../../components/UI/Table/TableRow"
import { TableHead } from "../../components/UI/Table/TableHead"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"
import { AddIcon } from "@chakra-ui/icons"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"

const headers = ["Date", "Value", "Payer", "Category", "Tags", "more"]

export const Entries = () => {
  const entries = useEntries()
  const dispatch = useDispatch()

  const {
    surfaceData,
    setFilter,
    filters,
    filterables,
    removeEntryFromStack,
  } = useFilters(entries)

  const { pageSize, page, pagesNum, onChangePage, onChangePageSize } =
    usePagination(surfaceData.length, 20, filters)

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
    removeEntryFromStack(pickedEntry)
    onClose()
  }

  useEffect(() => {
    // console.log(surfaceData)
  }, [surfaceData, filters, filterables, page, pagesNum, pageSize])

  return (
    <Stack direction={["column", "row"]} pt={4} justify='center'>
      <Filters
        filters={filters}
        filterables={filterables}
        setFilter={setFilter}
      />
      
      <Button
        onClick={onOpenNew}
        leftIcon={<AddIcon />}
        colorScheme='purple'
      >
        Add Entry
      </Button>

      <Box
        width='max'
        alignSelf='center'
        boxShadow='md'
        p={6}
        borderRadius='lg'
      >
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
        style={{
          padding: "2",
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
        page={page}
        pagesNum={pagesNum}
        pageSize={pageSize}
        changePage={onChangePage}
        changePageSize={onChangePageSize}
      />

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
          component={EntryForm}
        />
        <NewEntryDrawerForm
          isOpen={isOpen === "new"}
          onClose={onClose}
          placement='right'
          header='Create New Entry'
          component={EntryForm}
        />
      </Portal>
    </Stack>
  )
}
