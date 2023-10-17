import React, { useContext } from "react"

import { InboxOutlined, MailOutlineOutlined } from "@mui/icons-material"
import {
  Box,
  ButtonBase,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"

import { UIContext } from "../../context/ui"

const menuItem: string[] = ["Inbox", "Starred", "Send Email", "Drafts"]

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: "250px" }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItem.map((text, index) => (
            <ButtonBase key={text} sx={{ width: "100%" }}>
              <ListItem>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlined /> : <MailOutlineOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </ButtonBase>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  )
}
