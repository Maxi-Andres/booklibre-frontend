import { Outlet } from "react-router"
import NavBar from "./NavBar"

import type { LogProps } from "@/types/authState"

export const PrivateLayer = () => {
  return (
    <div>
      <NavBar />

      {/* Contenido de cada página */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
