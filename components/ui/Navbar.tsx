import { MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import React, { useContext } from "react"
import { UIContext } from "../../context/ui"
import NextLink from "next/link"

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton onClick={openSideMenu} size="large" edge="start">
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref>
          <Typography
            variant="h6"
            color="white"
            sx={{
              textDecoration: "none",
              "&:active": { textDecoration: "none" },
            }}
          >
            OpenJira
          </Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
