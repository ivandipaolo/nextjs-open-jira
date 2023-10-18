import React, { ChangeEvent, useContext, useMemo, useState } from "react"
import Layout from "../../components/layouts/Layout"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from "@mui/material"
import { DeleteOutlined, SaveOutlined } from "@mui/icons-material"
import { Entry, EntryStatus } from "../../interfaces"
import { GetServerSideProps } from "next"
import { dbEntries } from "../../database"
import { EntriesContext } from "../../context/entries"
import { useRouter } from "next/router"

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

const EntryPage = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  const router = useRouter()
  const isNotValid = useMemo(() => {
    return inputValue.length <= 0 && touched
  }, [inputValue.length, touched])

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    setTouched(false)
    if (inputValue.length !== 0) {
      const updatedEntry: Entry = {
        ...entry,
        description: inputValue,
        status,
      }
      updateEntry(updatedEntry)
      return router.push("/")
    } else {
      return
    }
  }

  const onDelete = () => {
    deleteEntry(entry._id)
    return router.push("/")
  }

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={
                "Creada hace: " + Date.parse(entry.createdAt) || "" + " minutos"
              }
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onInputValueChanged}
                helperText={isNotValid && "Escribe tu nueva entrada"}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado: {status} </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanges}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant="contained"
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={onDelete}
      >
        <DeleteOutlined />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }
  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return {
    props: { entry },
  }
}

export default EntryPage
