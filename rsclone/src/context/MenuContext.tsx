import { createContext, useState } from "react";

interface IMenuContext {
  menu: boolean,
  open: () => void,
  close: () => void
}

export const MenuContext = createContext<IMenuContext>({
  menu: false,
  open: () => {},
  close: () => {}
})

export const MenuState = ( { children }: {children: React.ReactNode} ) => {
  const [menu, setMenu] = useState(false)

  const open = () => setMenu(true) 
  const close = () => setMenu(false) 

  return (
    <MenuContext.Provider value={{menu, open, close}}>
      { children }
    </MenuContext.Provider>
  )
}