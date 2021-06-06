import { Heading } from "@chakra-ui/layout";
import { Filters } from "../../../Filters/Filters";

export const EntriesDrawer = ({ filters, counts, setFilter, fields }) => {
  return (
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
  );
};
