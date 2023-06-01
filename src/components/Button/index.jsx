import { ButtonContainer } from "./styles";

export function Button({ title, ...rest }) {
  return(
    <ButtonContainer type="button" {...rest}>
      {title}
    </ButtonContainer>
  )
}