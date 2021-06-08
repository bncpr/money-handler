import { Radio } from "@chakra-ui/radio"
import { PermanentDrawerContent } from "../../../UI/Drawer/PermanentDrawer/PermanentDrawerContent"
import { ControlledRadioGroup } from "../../../UI/Form/ControlledRadioGroup/ControlledRadioGroup"
export const ChartDrawerContent = ({
  onChangeShowBy,
  onChangeSeries,
  showBy,
  series,
}) => {
  return (
    <PermanentDrawerContent>
      <ControlledRadioGroup
        onChange={onChangeShowBy}
        value={showBy}
        label='Show By'
      >
        <Radio value='month'>Month</Radio>
        <Radio value='category'>Category</Radio>
        <Radio value='payer'>Payer</Radio>
      </ControlledRadioGroup>
      <ControlledRadioGroup
        onChange={onChangeSeries}
        value={series}
        label='Series'
      >
        <Radio value='' isDisabled={showBy !== "month"}>
          None
        </Radio>
        <Radio value='category' isDisabled={showBy !== "month"}>
          Category
        </Radio>
        <Radio value='payer' isDisabled={showBy !== "month"}>
          Payer
        </Radio>
      </ControlledRadioGroup>
    </PermanentDrawerContent>
  )
}
