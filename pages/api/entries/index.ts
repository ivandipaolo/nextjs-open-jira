import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry, IEntry } from "../../../models"

type Data = { message: string } | IEntry[] | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getEntries(res)

    case "POST":
      return postEntry(req, res)

    // case "PUT":
    //   return putEntry(req, res)

    default:
      return res.status(400).json({ message: "No existe" })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: "ascending" })
  await db.disconnect()
  return res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description = "" } = req.body
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try {
    await db.connect()

    await newEntry.save()
    await db.disconnect()

    return res.status(200).json({newEntry})
  } catch (error) {
    await db.disconnect()


    return res.status(400)
  }
}
