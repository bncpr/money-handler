import { FormLabel } from "@chakra-ui/form-control"
import { Filters } from "../../../Filters/Filters"
import { PermanentDrawerContent } from "../../../UI/Drawer/PermanentDrawer/PermanentDrawerContent"

export const EntriesDrawerContent = ({
  filters,
  counts,
  fields,
  setFilter,
}) => {
  return (
    <PermanentDrawerContent>
      <FormLabel fontSize='xl'>Filters</FormLabel>
      <Filters
        filters={filters}
        counts={counts}
        fields={fields}
        setFilter={setFilter}
        px={3}
      />
    </PermanentDrawerContent>
  )
}
