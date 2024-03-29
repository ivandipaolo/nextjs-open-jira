import React, { FC, PropsWithChildren, useReducer } from "react"
import { UIContext, UiReducer } from "./"

export interface UIState {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" })
  }

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" })
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding })
  }

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" })
  }

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
