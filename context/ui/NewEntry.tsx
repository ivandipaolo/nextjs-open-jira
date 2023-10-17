import { AddOutlined, CancelOutlined, SaveOutlined } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import React, { ChangeEvent, useContext, useState } from "react"
import { EntriesContext } from "../entries"
import { UIContext } from "./UIContext"

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("")
  const [touched, setTouched] = useState(false)
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue("")
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText="Ingrese un valor"
            error={inputValue.length === 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanges}
            onBlur={() => setTouched(true)}
          />
          <Box justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              endIcon={<CancelOutlined />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddOutlined />}
          fullWidth
          variant="outlined"
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}
