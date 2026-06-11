import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import { graphqlService } from "@/services/graphql/graphqlService"

const mockedPost = vi.spyOn(axios, "post")

const mockCalifications = [
  { bookType: "COMUN", avgRating: 4.12 },
  { bookType: "CON DEDICATORIA", avgRating: 4.57 },
  { bookType: "COLECCIONABLE", avgRating: 4.83 },
]

describe("GraphQLService - getCalificationAnalisis", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("debería hacer POST al endpoint /graphql", async () => {
    mockedPost.mockResolvedValue({
      data: { data: { calificactionAnalisis: mockCalifications } },
    })
    await graphqlService.getCalificationAnalisis()
    expect(mockedPost).toHaveBeenCalledWith(
      expect.stringContaining("/graphql"),
      expect.objectContaining({ query: expect.stringContaining("calificactionAnalisis") }),
    )
  })

  it("debería retornar el array de calificaciones por tipo", async () => {
    mockedPost.mockResolvedValue({
      data: { data: { calificactionAnalisis: mockCalifications } },
    })
    const result = await graphqlService.getCalificationAnalisis()
    expect(result).toEqual(mockCalifications)
  })

  it("debería lanzar error si la respuesta GraphQL contiene errores", async () => {
    mockedPost.mockResolvedValue({
      data: { errors: [{ message: "campo no válido" }] },
    })
    await expect(graphqlService.getCalificationAnalisis()).rejects.toThrow(
      "Error en consulta GraphQL: campo no válido",
    )
  })

  it("debería lanzar error si axios falla", async () => {
    mockedPost.mockRejectedValue(new Error("Network error"))
    await expect(graphqlService.getCalificationAnalisis()).rejects.toThrow("Network error")
  })
})
