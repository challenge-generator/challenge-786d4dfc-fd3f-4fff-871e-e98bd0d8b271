# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Diseño y Desarrollo de Sistema con Patrones GRASP**.

| | |
|---|---|
| Tema | Aplicación de Patrones GRASP en el Desarrollo de Sistemas |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | hexagonal/clean con capas de dominio, aplicación e infraestructura |
| Tiempo estimado | 20 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 11.0.0
- @nestjs/core 11.0.0
- @nestjs/platform-express 11.0.0
- @nestjs/swagger 7.4.0
- class-validator 0.14.1
- class-transformer 0.5.1
- prisma 5.19.0
- @prisma/client 5.19.0
- jest 29.7.0
- @nestjs/testing 11.0.0
- typescript 5.7.0
- reflect-metadata 0.2.2
- rxjs 7.8.1

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Exploración y Modelado Inicial**: Modelo conceptual de las entidades y relaciones del sistema de gestión de préstamos hipotecarios.
- **Fase 2 — Aplicación de Patrones GRASP**: Descripción detallada de la aplicación de al menos dos patrones GRASP en el diseño del sistema de gestión de préstamos hipotecarios.
- **Fase 3 — Implementación y Validación**: Sistema implementado que aplica al menos dos patrones GRASP y cumple con los criterios de aceptación establecidos.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (8)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findPending`
      Se invoca `findPending` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findApproved`
      Se invoca `findApproved` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.findRejected`
      Se invoca `findRejected` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.create`
      Se invoca `create` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/loan-request.controller.ts` — `LoanRequestRepositoryPort.updateStatus`
      Se invoca `updateStatus` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/application/usecases/loan-request.usecase.ts` — `LoanRequestRepositoryPort.findPendingByApplicant`
      Se invoca `findPendingByApplicant` sobre `LoanRequestRepositoryPort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `test/eligibility.service.spec.ts` — `EligibilityService.assessRisk`
      Se invoca `assessRisk` sobre `EligibilityService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `typescript@5.7.0`
      typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (20)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/entities/loan-request.entity.ts`
- `src/domain/entities/applicant.entity.ts`
- `src/domain/entities/loan.entity.ts`
- `src/domain/ports/loan-request.repository.port.ts`
- `src/domain/ports/applicant.repository.port.ts`
- `src/domain/ports/eligibility.service.port.ts`
- `src/infrastructure/repositories/loan-request.repository.ts`
- `src/infrastructure/repositories/applicant.repository.ts`
- `src/infrastructure/controllers/loan-request.controller.ts`
- `src/infrastructure/database/prisma.schema`
- `src/infrastructure/config/database.config.ts`
- `src/app.module.ts`
- `src/application/services/eligibility.service.ts`
- `src/application/usecases/loan-request.usecase.ts`
- `test/loan-request.usecase.spec.ts`
- `test/eligibility.service.spec.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/domain`
- `src/domain/entities`
- `src/domain/ports`
- `src/application`
- `src/application/services`
- `src/application/usecases`
- `src/infrastructure`
- `src/infrastructure/repositories`
- `src/infrastructure/controllers`
- `src/infrastructure/config`
- `src/infrastructure/database`
- `test`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **hexagonal/clean con capas de dominio, aplicación e infraestructura**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced
- Brecha que el reto ataca: Aplica al menos dos patrones GRASP (Patrones de Software para la Asignación de Responsabilidades Generales) en el diseño y desarrollo de un sistema, entre ellos: Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas.
- Mision: Candidato con nivel Advanced, trabaja en desarrollo Backend con Node.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
