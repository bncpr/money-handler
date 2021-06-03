import { AddIcon } from "@chakra-ui/icons"
import { Box, Stack } from "@chakra-ui/layout"
import { Button, Portal, Table, Tbody } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Filters } from "../../components/Filters/Filters"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { TableHead } from "../../components/UI/Table/TableHead"
import { TableRow } from "../../components/UI/Table/TableRow"
import { useFilters } from "../../hooks/useFilters/useFilters"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"

const headers = ["Date", "Value", "Payer", "Category", "Tags", "more"]

export const Entries = () => {
  const dispatch = useDispatch()
  const { entries, groupedTree, fields } = useSelector(
    state => state.groupedEntries,
    shallowEqual
  )
  const {
    setFilter,
    counts,
    filteredEntries: surfaceData,
    filters,
  } = useFilters({
    entries,
    groupedTree,
  })

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

  useEffect(() => {
    // console.log(surfaceData)
  }, [surfaceData, filters, page, pagesNum, pageSize])

  return (
    <Stack direction={["column", "row"]} pt={4} justify='center'>
      <Filters
        filters={filters}
        fields={fields}
        counts={counts}
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
    </Stack>
  )
}
