import { AddIcon } from "@chakra-ui/icons"
import { Box } from "@chakra-ui/layout"
import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Portal,
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Filters } from "../../components/Filters/Filters"
import { MotionFilterTag } from "../../components/Motion/MotionFilterTag/MotionFilterTag"
import { DeleteEntryAlert } from "../../components/UI/Alert/DeleteEntryAlert"
import { CardBox } from "../../components/UI/Box/CardBox/CardBox"
import { EntryForm } from "../../components/UI/Form/EntryForm/EntryForm"
import { PagePanel } from "../../components/UI/PagePanel/PagePanel"
import { TableRow } from "../../components/UI/Table/TableRow"
import { usePagination } from "../../hooks/usePagination/usePagination"
import { removeEntryFromDbThunk } from "../../store/thunks/removeEntryFromDbThunk"
import { NewEntryDrawerForm } from "../EntryDrawerForm/NewEntryDrawerForm/NewEntryDrawerForm"
import { UpdateEntryDrawerForm } from "../EntryDrawerForm/UpdateEntryDrawerForm/UpdateEntryDrawerForm"

const focusVariant = {
  none: { scale: 1 },
  focus: {
    scale: [1, 1.05, 1.05, 1],
    delay: 3,
    transition: {
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: 3,
      duration: 1,
    },
  },
}

const MotionBox = motion(Box)

export const Entries = ({
  surfaceData,
  fields,
  filters,
  counts,
  setFilter,
  signedIn,
  isEmptyEntries,
  isLoading,
  filterStack,
  categoryColors,
}) => {
  const dispatch = useDispatch()

  const {
    pageSize,
    page,
    pagesNum,
    onChangePage,
    onChangePageSize,
    resetPage,
  } = usePagination(surfaceData.length, 10, filters)

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
    <Grid
      templateColumns='1fr auto 1fr'
      templateRows='48px 1fr'
      columnGap={6}
      pt={6}
    >
      <GridItem colSpan='3' justifySelf='center'>
        <HStack>
          <AnimatePresence>
            {filterStack.map(([key, value]) => (
              <MotionFilterTag
                key={key}
                filter={key}
                value={value}
                setFilter={setFilter}
              />
            ))}
          </AnimatePresence>
        </HStack>
      </GridItem>
      <GridItem>
        <VStack w='2xs' ml={12} spacing={5} align='stretch' justifySelf='start'>
          <CardBox p={6}>
            <Heading size='md' fontWeight='semibold' pl={3} pb={3}>
              Filters
            </Heading>
            <Filters
              filters={filters}
              counts={counts}
              fields={fields}
              setFilter={setFilter}
            />
          </CardBox>
          <MotionBox
            animate={
              isEmptyEntries && signedIn && !isLoading && !isOpen
                ? "focus"
                : "none"
            }
            whileHover='none'
            variants={focusVariant}
            pt={2}
          >
            <Button
              onClick={onOpenNew}
              leftIcon={<AddIcon />}
              colorScheme='green'
              w='full'
              variant='solid'
            >
              ADD ENTRY
            </Button>
          </MotionBox>
        </VStack>
      </GridItem>
      <GridItem colStart='2' rowStart='2' justifySelf='center'>
        {!isLoading && (
          <CardBox px={6} py={3}>
            <Table variant='simple' size='md' w='max'>
              <Thead>
                <Tr>
                  <Th isNumeric>Date</Th>
                  <Th isNumeric>Value</Th>
                  <Th>Payer</Th>
                  <Th>Category</Th>
                  <Th>Tags</Th>
                  <Th>More</Th>
                  <Th></Th>
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
                    categoryColors={categoryColors}
                    setFilter={setFilter}
                    filters={filters}
                  />
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th isNumeric>Total:</Th>
                  <Th isNumeric>
                    {Math.round(R.sum(paginated.map(R.prop("value"))))}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </CardBox>
        )}
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
