import React, { FC, PropsWithChildren, useEffect, useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

import { EntriesContext, entriesReducer } from "./"
import { Entry } from "../../interfaces"

import { entriesApi } from "../../apis"

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description: description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // }
    const { data } = await entriesApi.post<Entry>("/entries", { description })
    dispatch({ type: "[Entry] - AddEntry", payload: data })
  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })

      dispatch({ type: "[Entry] - Entry-Updated", payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`)
      dispatch({ type: "[Entry] - Entry-Deleted", payload: _id })
    } catch (error) {
      console.log(error)
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries")
    dispatch({ type: "[Entry] - Refresh-Data", payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [state])

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry, deleteEntry }}>
      {children}
    </EntriesContext.Provider>
  )
}
