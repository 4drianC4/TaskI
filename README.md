# Taski - Monolito Fullstack Profesional

Arquitectura unificada de frontend + backend con Next.js App Router, Prisma y TypeScript.

Objetivo principal:
- Mantener una estructura clara para desarrolladores.
- Asegurar una base profesional, escalable y segura para cliente y equipo tecnico.

## Estructura del proyecto

```text
taski/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── api/
│   │   └── users/
│   │       └── route.ts                # Endpoints REST
│   ├── board/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── prisma/
│   └── schema.prisma                   # Modelos de datos
├── src/
│   ├── controllers/
│   │   └── user-controller.ts          # Capa HTTP req/res
│   └── services/
│       └── user/
│           ├── index.ts                # Punto de entrada del feature
│           ├── service.ts              # Utilidades y mapeos compartidos
│           ├── create.ts               # Create user
│           ├── delete.ts               # Delete user
│           ├── get-all.ts              # List users
│           ├── get-by-id.ts            # Get user by id
│           ├── put.ts                  # Replace user
│           └── patch.ts                # Partial update user
├── components/
│   ├── ui/
│   ├── auth/
│   ├── board/
│   └── shared/
├── hooks/
├── lib/
├── schemas/
├── services/
├── store/
├── types/
├── proxy.ts
└── tailwind.config.ts
```

## Principios de arquitectura

1. Monolito modular
Frontend y backend viven en el mismo repositorio, con limites claros entre capas.

2. Separacion de responsabilidades
- app/api: define rutas y metodos HTTP.
- src/controllers: interpreta request/response y errores.
- src/services: concentra reglas de negocio y acceso a Prisma.
- schemas: valida payloads con Zod.
- types: contratos DTO y tipos compartidos.
- services (raiz): clientes de API para frontend.

3. Seguridad por defecto
- Validacion estricta de entrada con Zod.
- Control de errores sin exponer stack sensible.
- Proxy para proteger rutas privadas.
- Normalizacion de datos de entrada (ejemplo: email lowercase).

4. Escalabilidad
Cada nuevo dominio (boards, cards, comments, auth) replica este patron:
- route -> controller -> service -> schema -> type.

## Flujo backend recomendado

1. Definir endpoint en app/api/modulo/route.ts.
2. Delegar a src/controllers/modulo.controller.ts.
3. Aplicar validacion con schemas/modulo.schema.ts.
4. Ejecutar logica y Prisma en src/services/modulo.service.ts.
5. Responder DTO tipado desde types/modulo.ts.

## Flujo frontend recomendado

1. Crear pagina en app/(grupo)/ruta/page.tsx.
2. Componer UI con components por dominio.
3. Encapsular estado en store con Zustand.
4. Reutilizar logica en hooks.
5. Consumir API desde services con lib/api-client.ts.

## Convenciones de desarrollo

- Un modulo por feature (users, boards, cards).
- Evitar logica de negocio en componentes o routes.
- Mantener respuestas HTTP consistentes: { data } o { error }.
- Centralizar cliente DB en lib/prisma.ts.
- Mantener DTOs y validadores sincronizados.
- Usar archivos y carpetas en kebab-case.
- Mantener una sola fuente de verdad por dominio para evitar duplicados.
- Estandarizar formato con .editorconfig y .gitattributes.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Siguiente evolucion sugerida

1. Implementar autenticacion real con cookies httpOnly + JWT o NextAuth.
2. Agregar capa de autorizacion por rol (RBAC) en services/controllers.
3. Añadir testing:
	- Unit tests para services.
	- Integration tests para app/api.
	- E2E para flujos criticos de auth y board.
