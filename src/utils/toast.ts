import { toast } from "react-toastify"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    const { data, status } = error.response

    if (typeof data === "object" && data !== null) {
      if (data.detalle) return data.detalle
      if (data.message && status < 500) return data.message
      if (status >= 500) return "Ocurrió un error, consulte al administrador."
    }

    if (typeof data === "string" && status < 500) return data
  }

  if (error?.code === "ERR_NETWORK")
    return "Problema de conexión con el servidor. Intente más tarde."

  return error?.message ?? "Error desconocido"
}

export const showToast = {
  success: (msg: string) => toast.success(msg),
  warning: (msg: string) => toast.warning(msg),
  error: (msg: string) => toast.error(msg),
  httpError: (error: unknown, prefix?: string) => {
    const msg = getErrorMessage(error)
    toast.error(prefix ? `${prefix}: ${msg}` : msg)
  },
}
