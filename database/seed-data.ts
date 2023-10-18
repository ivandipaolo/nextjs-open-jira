interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendientes: Lorem",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En Progreso: Lorem",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Terminadas: Lorem",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
}
