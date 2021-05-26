import { AlertYesNo } from "./AlertYesNo"

export const DeleteEntryAlert = props => (
  <AlertYesNo
    {...props}
    header='Delete Entry?'
    body='Are you sure you want to delete this entry?'
  />
)
