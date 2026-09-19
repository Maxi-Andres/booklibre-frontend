import { describe, it, expect } from "vitest"
import { UserProfile } from "@/domain/userProfile"
import { UserKind } from "@/types/userKind"
import {
  borrowerStatusLabels,
  borrowerStatusStyles,
  ownerStatusLabels,
  ownerStatusStyles,
} from "@/types/statusLabels"

describe("Estados de un libro vistos por su dueño (ProfileBook)", () => {
  it.each([
    ["BORROWED", "Prestado", "bg-orange-400 text-white"],
    ["AVAILABLE", "Disponible", "bg-green-500 text-white"],
  ])('El estado %s se muestra como "%s"', (state, label, style) => {
    expect(ownerStatusLabels[state]).toBe(label)
    expect(ownerStatusStyles[state]).toBe(style)
  })

  it("Un estado de préstamo no tiene etiqueta de dueño (se muestra tal cual)", () => {
    expect(ownerStatusLabels["ACTIVE"]).toBeUndefined()
  })
})

describe("Estados de un préstamo vistos por quien lo pidió (BookCard)", () => {
  it.each([
    ["ACTIVE", "Activo", "bg-blue-500 text-white"],
    ["RESERVED", "Reservado", "bg-green-500 text-white"],
    ["SOON_TO_END", "Próximo a vencer", "bg-orange-400 text-white"],
    ["RETURNED", "Devuelto", "bg-red-400 text-white"],
  ])('El estado %s se muestra como "%s"', (state, label, style) => {
    expect(borrowerStatusLabels[state]).toBe(label)
    expect(borrowerStatusStyles[state]).toBe(style)
  })

  it("Un estado desconocido no tiene etiqueta definida", () => {
    expect(borrowerStatusLabels["UNKNOWN"]).toBeUndefined()
  })
})

describe("UserProfile: validacion del perfil rechaza datos invalidos", () => {
  const validProfile = () =>
    new UserProfile(
      "1",
      "Carlos",
      "Amante de los libros",
      "/img.jpg",
      "Buenos Aires, ARG",
      "2026-01-01",
      100,
      "carlos@mail.com",
      "1122334455",
      UserKind.READER,
    )

  it("Un perfil con datos validos no tiene errores", () => {
    const profile = validProfile()
    profile.validate()
    expect(profile.errors).toHaveLength(0)
  })

  it("Nombre mayor a 15 caracteres genera error", () => {
    const profile = validProfile()
    profile.name = "NombreDemasiadoLargoParaElCampo"
    profile.validate()
    const nameError = profile.errors.find((e) => e.field === "invalid-name")
    expect(nameError).toBeDefined()
  })

  it("Nombre vacio o de 1 caracter genera error", () => {
    const profile = validProfile()
    profile.name = "A"
    profile.validate()
    const nameError = profile.errors.find((e) => e.field === "invalid-name")
    expect(nameError).toBeDefined()
  })

  it("Descripcion mayor a 45 caracteres genera error", () => {
    const profile = validProfile()
    profile.description =
      "Esta descripcion tiene mas de cuarenta y cinco caracteres y deberia fallar"
    profile.validate()
    const descError = profile.errors.find((e) => e.field === "too-long-desc")
    expect(descError).toBeDefined()
  })

  it("Telefono con formato invalido genera error", () => {
    const profile = validProfile()
    profile.cel = "12345"
    profile.validate()
    const celError = profile.errors.find(
      (e) => e.field === "invalid-format-cel",
    )
    expect(celError).toBeDefined()
  })

  it("Telefono valido con formato 11XXXXXXXX no genera error", () => {
    const profile = validProfile()
    profile.cel = "1198765432"
    profile.validate()
    const celError = profile.errors.find(
      (e) => e.field === "invalid-format-cel",
    )
    expect(celError).toBeUndefined()
  })

  it("Email con formato invalido genera error", () => {
    const profile = validProfile()
    profile.email = "correo-invalido"
    profile.validate()
    const emailError = profile.errors.find(
      (e) => e.field === "invalid-format-email",
    )
    expect(emailError).toBeDefined()
  })

  it("Ubicacion con formato invalido genera error", () => {
    const profile = validProfile()
    profile.location = "lugar cualquiera"
    profile.validate()
    const locError = profile.errors.find(
      (e) => e.field === "invalid-format-loc",
    )
    expect(locError).toBeDefined()
  })

  it('Ubicacion con formato valido "Ciudad, ARG" no genera error', () => {
    const profile = validProfile()
    profile.location = "Cordoba, ARG"
    profile.validate()
    const locError = profile.errors.find(
      (e) => e.field === "invalid-format-loc",
    )
    expect(locError).toBeUndefined()
  })

  it("Multiples campos invalidos generan multiples errores", () => {
    const profile = validProfile()
    profile.name = ""
    profile.email = "invalido"
    profile.cel = "abc"
    profile.location = "sin formato"
    profile.validate()
    expect(profile.errors.length).toBeGreaterThanOrEqual(4)
  })
})
