import React, { DragEvent, FC, useContext, useMemo } from "react"

import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from "../../interfaces"
import { EntriesContext } from "../entries"
import { UIContext } from "./UIContext"

import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const id = event.dataTransfer.getData("text")
    const entry = entries.find((e) => e._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
          backgroundColor: "transparent",
          padding: "5px 10px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "0.3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
