import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header"
import { Input } from "../../components/Input";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText"
import { api } from "../../services";
import { Container, Form, Tag } from "./styles";

export function NewNote() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleAddLink() {
    setLinks(previousLinks => [newLink, ...previousLinks])
    setNewLink("")
  }

  function handleRemoveLink(linkDeleted) {
    setLinks(previousLinks => previousLinks.filter(link => link !== linkDeleted))
  }

  function handleAddTag() {
    setTags(previousTags => [newTag, ...previousTags])
    setNewTag("")
  }

  function handleRemoveTag(tagDeleted) {
    setTags(previousTags => previousTags.filter(tag => tag !== tagDeleted))
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Por favor, defina um título para a nota.")
    }

    if(newLink) {
      return alert("Ops... É necessário adicionar o link antes de salvar a nota.")
    }

    if(newTag) {
      return alert("Ops... É necessário adicionar a tag antes de salvar a nota.")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota cadastrada com sucesso.")
    navigate(-1)
  }

  return(
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input 
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          <TextArea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            <NoteItem 
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />

            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)} 
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
          </Section>

          <Section title="Marcadores">
            <Tag>
              <NoteItem
                isNew
                placeholder="Nova tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />

              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}                  
                  />
                ))
              }
            </Tag>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote} 
          />
        </Form>
      </main>
  </Container>
  )
}