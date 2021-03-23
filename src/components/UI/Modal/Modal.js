import { ContentBox } from "../../../containers/ContentBox/ContentBox"

export const Modal = ({ children }) => {
  return (
    <ContentBox className={styles.Modal}>
      {children}
    </ContentBox>
  )
}