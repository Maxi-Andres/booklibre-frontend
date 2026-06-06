import type { BookConversion } from "@/domain/BookConversion";
import axios from "axios";

 export type GraphQLResponse<T> = {
      data: T
      errors?: { message: string }[]   // GraphQL puede mandar errores en HTTP 200
  }

class GraphQLService {


	async getConversionRate(): Promise<BookConversion[]> {
		const response = await
			axios.post<GraphQLResponse<{ conversionRate: BookConversion[]}>>(import.meta.env.VITE_API_URL + `/graphql`,
				{
					query:  `
						query {
								conversionRate {
								bookId
								title
								clicks
								reservations
								conversionRate
								}
						}
						`,
				}
			)

		if(response.data.errors) {
			throw new Error("Error en consulta GraphQL: " 
				+ response.data.errors.map(e => e.message).join(", "))
		}
		return response.data.data.conversionRate
	}

}

export const graphqlService = new GraphQLService()

// {
//     "query": 
//         "{ conversionRate { bookId title clicks reservations conversionRate } }"
// }