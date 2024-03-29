import React, { FC, PropsWithChildren } from "react"

import { Box } from "@mui/material"
import Head from "next/head"
import { Navbar, Sidebar } from "../ui"

interface Props {
  title?: string
}

const Layout: FC<PropsWithChildren<Props>> = ({
  title = "OpenJira",
  children,
}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  )
}

export default Layout
