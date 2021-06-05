import { AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout"
import { Button, Portal, Table, Tbody } from "@chakra-ui/react"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Filters } from "../../components/Filters/Filters"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { TableHead } from "../../components/UI/Table/TableHead"
import { TableRow } from "../../components/UI/Table/TableRow"
import { useFilters } from "../../hooks/useFilters/useFilters"
import { useInitialPick } from "../../hooks/useInitialPick/useInitialPick"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"
import { PermanentDrawer } from "../../components/UI/Drawer/PermanentDrawer/PermanentDrawer"

const headers = ["Date", "Value", "Payer", "Category", "Tags", "more"]

export const Entries = ({ isOpenSide, onOpenSide, top }) => {
  const dispatch = useDispatch()
  const { entries, groupedTree, fields } = useSelector(
    state => state.groupedEntries,
    shallowEqual,
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

  useInitialPick(fields.year, setFilter("year"))
  useInitialPick(R.keys(counts.month), setFilter("month"))

  useEffect(() => {
    console.log(filters)
  }, [filters])

  useEffect(() => {
    onOpenSide()
  }, [])

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
    <Box>
      <PermanentDrawer
        isOpen={isOpenSide}
        top={`${top}px`}
        p={6}
        width='320px'
        align='stretch'
      >
        <Filters
          filters={filters}
          fields={fields}
          counts={counts}
          setFilter={setFilter}
          spacing={3}
          p={3}
        >
          <Heading size='md' fontWeight='normal'>
            Filters
          </Heading>
        </Filters>
      </PermanentDrawer>

      <Flex
        direction='column'
        align='center'
        pt={6}
      >
        <Box width='max' shadow='md' p={6} borderRadius='lg'>
          <Table variant='simple' size='md'>
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

        <HStack p={3} pos='fixed' bottom={0} spacing={10}>
          <PagePanel
            page={page}
            pagesNum={pagesNum}
            pageSize={pageSize}
            changePage={onChangePage}
            changePageSize={onChangePageSize}
          />
          <Button
            onClick={onOpenNew}
            leftIcon={<AddIcon />}
            colorScheme='purple'
          >
            ADD
          </Button>
        </HStack>
      </Flex>

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
