import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry, IEntry } from "../../../models"

type Data = { message: string } | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" })
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res)

    case "PUT":
      return updateEntry(req, res)

    case "DELETE":
      return deleteEntry(req, res)

    default:
      return res.status(400).json({ message: "No existe" })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await db.connect()
  try {
    const entryInDB = await Entry.findById(id)
    if (!entryInDB) {
      await db.disconnect()
      return res.status(400).json({ message: "No existe entry con ese ID" })
    }
    await db.disconnect()
    return res.status(200).json({ entryInDB })
  } catch (error) {
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await db.connect()
  const entryToUpdate = await Entry.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(400).json({ message: "No existe el entry" })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body
  // const updatedEntry = await Entry.findByIdAndUpdate(
  //   id,
  //   {
  //     description,
  //     status,
  //   },
  //   { runValidators: true, new: true }
  // )

  try {
    entryToUpdate.description = description
    entryToUpdate.status = status
    await entryToUpdate.save()

    await db.disconnect()
    return res.status(200).json({ entryToUpdate })
  } catch (error) {
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await db.connect()
  try {
    const entryToDelete = await Entry.findById(id)
    if (!entryToDelete) {
      await db.disconnect()
      return res.status(400).json({ message: "No existe el entry" })
    }
    await entryToDelete.deleteOne()
    await db.disconnect()
    return res.status(200).json({ message: "Entry eliminado" })
  } catch (error) {
    await db.disconnect()
    return res.status(400).json({ message: error.errors.status.message })
  }
}
