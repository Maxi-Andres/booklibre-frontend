# 📚 BookLibre — Frontend

SPA de **BookLibre**, una plataforma para prestar y reservar libros entre usuarios.
Consume la API REST y GraphQL del [backend en Kotlin + Spring Boot](https://github.com/CatalinaCorrea-png/booklibre-backend).

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)

> Proyecto grupal de la materia PHM (UNSAM, 2026). Este repositorio es una copia del
> original de la cátedra, con todo el historial. [Equipo](#equipo) al final.

---

## Qué ve cada usuario

La app tiene cuatro roles. Cada uno entra a un lugar distinto y tiene rutas propias:

| Rol | Al iniciar sesión va a… | Puede |
|---|---|---|
| **Lector** | Catálogo | Buscar y filtrar libros, reservarlos, calificarlos y reseñarlos, seguir sus préstamos |
| **Publicador** | Su perfil | Publicar, editar y borrar sus libros |
| **Lector / Publicador** | Catálogo | Todo lo anterior |
| **Admin** | Dashboard | Ver métricas de uso del catálogo |

### Catálogo

- **Filtros combinables:** título, varios géneros a la vez, rango de páginas (slider doble),
  fechas de disponibilidad, ISBN y dueño.
- **Orden y paginación del lado del servidor:** el frontend manda `page`, `pageSize`,
  `sortBy` y `ascending`, y el backend devuelve una página.
- Para los filtros con varios valores, la instancia de Axios serializa los arrays como claves
  repetidas (`genders=A&genders=B`), el formato que Spring vincula directamente a una lista.

### Detalle y reserva

- **Calendario de reserva** (`react-datepicker`) que marca en rojo los días en que el libro
  ya está reservado y avisa si se elige uno de ellos.
- Muestra cuántos **bibliokarmas** (los puntos de reputación de la plataforma) suma la
  reserva, calculados por el backend según las fechas.
- Cada visita al detalle registra un clic (`POST /book-detail/:id/click`), que es el dato con el
  que el dashboard calcula la conversión de cada libro.

### Dashboard de administración

Consulta la API **GraphQL** con `axios.post` a `/graphql`, sin cliente dedicado, y trata los
errores que GraphQL devuelve con HTTP 200:

- **Tasa de conversión** por libro: clics contra reservas.
- **Calificación promedio** por tipo de libro.
- **Actividad reciente** de la plataforma.

---

## Autenticación y sesión

Es la parte más trabajada del frontend.

**Dónde vive cada token.** El *access token* (JWT) se guarda **solo en memoria**, en un módulo de
JavaScript, nunca en `localStorage`. El *refresh token* lo maneja el backend en una cookie
`httpOnly` + `SameSite=Strict`, así que JavaScript no puede leerlo. Axios manda esa cookie
con `withCredentials`.

**Interceptores de Axios** (`src/config/axiosConfig.ts`):

- **Request:** agrega `Authorization: Bearer …` a cada request, salvo a `/api/auth`, para que
  un token vencido no haga fallar el login. Otro interceptor corta la request y manda al login
  si ya no hay sesión guardada.
- **Response, con refresh *single-flight*:** cuando el backend responde `401` con
  `WWW-Authenticate: … invalid_token`, dispara **un solo** refresh aunque fallen varias requests
  en paralelo. Las demás esperan en una cola y, cuando llega el token nuevo, se reintentan
  todas. Sin eso, los refreshes simultáneos se rotarían el token entre sí y cerrarían la sesión.
  Si el refresh falla, limpia la sesión y vuelve al login con un mensaje.

**Ciclo de vida de la sesión** (`src/context/AuthContext.tsx`):

- **"Recordarme"** decide si los datos del usuario (nunca el token) van a `localStorage` o a
  `sessionStorage`.
- **Al recargar la página**, la sesión se recupera con un *refresh silencioso*. Una `ref`
  evita que se dispare dos veces por el doble montaje de `StrictMode`.
- **Vencimiento:** un timer y el evento `visibilitychange` detectan el fin de la sesión, incluso
  en pestañas que quedaron en segundo plano, y muestran un modal con *focus trap* para que el
  foco del teclado no se escape a la página de atrás.
- **Editar el perfil devuelve un token nuevo:** desde el perfil se pueden cambiar el email y el
  rol, y los dos viajan dentro del JWT. Por eso el backend emite otro token y el frontend lo
  reemplaza en memoria.

**Rutas protegidas por rol** (`src/layouts/`): `PrivateLayer` exige sesión, `PublisherLayer`
exige rol de publicador (o combinado) y `AdminLayer` exige rol de admin. Quien no cumple el requisito es
redirigido.

---

## Estructura

```
src/
├── config/        # instancias de Axios e interceptores (auth, refresh, serializado de params)
├── context/       # AuthContext (sesión) y UserProfileContext
├── services/      # un servicio por dominio (libros, reservas, usuarios, perfil) + graphql/
├── domain/        # modelos del dominio y su conversión desde JSON
├── layouts/       # guards de rutas por sesión y por rol
├── pages/         # Home, BookDetail, LoanDetails, Profile, EditBook, ControlPanel, Login…
├── components/    # tarjetas, modales, paginación, slider de rango, dashboard
├── validation/    # validación de formularios y mensajes de error
└── tests/         # Vitest + Testing Library
```

---

## Cómo correrlo

Necesita el [backend](https://github.com/CatalinaCorrea-png/booklibre-backend) corriendo.

```bash
pnpm install
cp .env.example .env     # VITE_API_URL=http://localhost:8080
pnpm dev                 # http://localhost:5173
```

> Con **pnpm 11 o posterior**, la primera vez hay que aprobar los *build scripts* de
> `esbuild` y `@swc/core` con `pnpm approve-builds`. Si no, cualquier `pnpm <script>` corta con
> `ERR_PNPM_IGNORED_BUILDS`.

| Script | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm lint` | ESLint |
| `pnpm test` | Tests (Vitest + Testing Library + jsdom) |

---

## Equipo

- **Andres Bianchimano, Maximiliano**
- **Cernadas, Nicolas**
- **Correa, Catalina**
- **Cossetini Reyes, Dana**
- **Perez, Fernanda**
