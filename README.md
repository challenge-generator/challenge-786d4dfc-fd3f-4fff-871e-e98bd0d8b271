# Diseño y Desarrollo de Sistema con Patrones GRASP

El sistema de gestión de préstamos hipotecarios requiere la aplicación de patrones GRASP para mejorar su estructura y funcionalidad. Los patrones a aplicar incluyen Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas. El sistema debe manejar solicitudes de préstamos, validar información del solicitante, calcular elegibilidad y gestionar la aprobación o rechazo de préstamos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Aplicación de Patrones GRASP en el Desarrollo de Sistemas |
| **Nivel** | advanced-l2 |
| **Tipo** | mixed |
| **Tiempo estimado** | 20 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Exploración y Modelado Inicial

**Objetivo:** Comprender el dominio y modelar las entidades clave del sistema.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Identificar y describir las entidades principales del sistema (solicitud de préstamo, solicitante, préstamo, aprobación/rechazo).
- Definir las relaciones entre estas entidades y sus atributos relevantes.
- Establecer los criterios de aceptación para la fase: un modelo conceptual claro y completo de las entidades y relaciones del dominio.

**Entregable:** Modelo conceptual de las entidades y relaciones del sistema de gestión de préstamos hipotecarios.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo los patrones GRASP pueden aplicarse a las entidades y relaciones identificadas.
- Piensa en cómo las responsabilidades se asignan entre las entidades.

</details>

### Fase 2: Aplicación de Patrones GRASP

**Objetivo:** Aplicar al menos dos patrones GRASP al diseño del sistema.

**Tiempo estimado:** 6 horas

**Instrucciones:**

- Seleccionar y aplicar al menos dos patrones GRASP (Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas) al diseño del sistema.
- Describir cómo cada patrón se aplica y justifica su elección.
- Establecer los criterios de aceptación para la fase: aplicación correcta y justificada de al menos dos patrones GRASP en el diseño del sistema.

**Entregable:** Descripción detallada de la aplicación de al menos dos patrones GRASP en el diseño del sistema de gestión de préstamos hipotecarios.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo cada patrón GRASP mejora la estructura y funcionalidad del sistema.
- Piensa en los trade-offs y las decisiones de diseño implicadas en la aplicación de cada patrón.

</details>

### Fase 3: Implementación y Validación

**Objetivo:** Implementar y validar la aplicación de los patrones GRASP en el sistema.

**Tiempo estimado:** 10 horas

**Instrucciones:**

- Implementar el diseño del sistema aplicando los patrones GRASP seleccionados.
- Validar que el sistema cumple con los criterios de aceptación establecidos en las fases anteriores.
- Establecer los criterios de aceptación para la fase: implementación y validación exitosa de la aplicación de los patrones GRASP en el sistema.

**Entregable:** Sistema implementado que aplica al menos dos patrones GRASP y cumple con los criterios de aceptación establecidos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo los patrones GRASP influyen en la implementación y el funcionamiento del sistema.
- Piensa en las posibles dificultades y cómo resolverlas durante la implementación.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los patrones GRASP y cómo se aplican en el diseño de sistemas?
- **paraQueSirve**: ¿Cómo mejoran los patrones GRASP la estructura y funcionalidad del sistema de gestión de préstamos hipotecarios?
- **comoSeUsa**: ¿Cómo se aplican los patrones GRASP en el diseño y desarrollo del sistema?
- **erroresComunes**: ¿Cuáles son los errores comunes al aplicar patrones GRASP y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica la aplicación de patrones GRASP en el sistema?

## Criterios de Evaluacion

- Comprensión y aplicación correcta de al menos dos patrones GRASP en el diseño del sistema.
- Justificación clara y detallada de la elección y aplicación de los patrones GRASP.
- Implementación y validación exitosa del sistema aplicando los patrones GRASP.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
