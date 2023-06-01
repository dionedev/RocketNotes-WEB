import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { FiPlus } from "react-icons/fi"
import { Input } from "../../components/Input"
import { Note } from "../../components/Note"
import { Section } from "../../components/Section"
import { api } from "../../services"
import { useNavigate } from "react-router-dom"
import { 
  Container,
  Brand,
  Menu,
  Search,
  Content,
  NewNote 
} from "./styles"

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleSelectTags(tagName) {
    if(tagName === "all") {
      return setTagsSelected([])
    }

    const tagAlreadySelected = tagsSelected.includes(tagName)

    if(tagAlreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    }
    else {
      setTagsSelected(previousState => [...previousState, tagName])
    }
  }

  function handleNoteDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      setNotes(response.data)
    }

    fetchNotes()

  }, [tagsSelected, search])

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  return(
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            isActive={tagsSelected.length === 0}
            onClick={() => handleSelectTags("all")}
          />
        </li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleSelectTags(tag.name)} 
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }        
      </Menu>

      <Search>
        <Input 
          type="text" 
          placeholder="Pesquisar pelo título"
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)} 
                data={note}
                onClick={() => handleNoteDetails(note.id)}
              />
            ))
          }
          
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus /> Criar nota
      </NewNote>

    </Container>
  )
}