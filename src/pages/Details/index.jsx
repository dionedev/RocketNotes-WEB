import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../services'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'
import { Container, Links, Content } from './styles'

export function Details() {
  const [data, setData] = useState(null)
  const params = useParams()

  const navigate = useNavigate()

  async function handleRemoveNote() {
    const confirm = window.confirm("Deseja realmente deletar esta nota?")

    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  function handleBack() {
    navigate(-1)
  }

  useEffect(() => {
    async function fetchNoteDetails() {
      const response = await api.get(`/notes/${params.id}`)

      setData(response.data)
    }

    fetchNoteDetails()
  }, [])

  return (
    <Container>
      <Header />
      
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemoveNote} />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            { 
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target='_blank'>
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)} 
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      }
    </Container>
  )
}