import { Container } from "./styles"
import { Tag } from "../../components/Tag"

export function Note({ data, ...rest }) {
  const { title, tags } = data

  return(
    <Container {...rest}>
      <h1>{title}</h1>

      {
        tags &&
        <footer>
          {
            tags.map(tag => (
              <Tag 
                key={String(tag.id)} 
                title={tag.name} 
              />
            ))
          }
        </footer>
      }
    </Container>
  )
}