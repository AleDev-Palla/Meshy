# Meshy (MeshMX) — Red mesh descentralizada y oportunista para México

> **Nombre del proyecto:** Meshy / MeshMX  
> **Estado actual:** Implementación inicial en **repositorio público** (cliente multiplataforma en Expo / React Native + especificación técnica v0.1)  
> **Idioma:** Español  
> **Alcance:** Android, iOS y Web (pruebas iniciales en México); extensible a Linux, automóviles y nodos de hardware dedicado.

---

## Estrategia de Repositorio (Repositorio Público Inicial)

En el comienzo de este proyecto se utiliza un **repositorio público** con una implementación creada desde cero. El objetivo de iniciar en un repositorio público es:

1. Documentar de forma abierta y verificable la arquitectura, el diseño visual y las decisiones del protocolo de red mesh oportunista.
2. Facilitar pruebas tempranas, revisión de código, trazabilidad de requisitos y colaboración técnica en la primera etapa del proyecto.
3. Mantener una base de código propia y limpia (usando dependencias con licencias permisivas MIT/Apache-2.0/BSD), permitiendo en etapas futuras separar o mantener módulos específicos (como el protocolo abierto, SDK o extensiones empresariales) según evolucione el proyecto.

---

## Stack Tecnológico y Arquitectura del Cliente (`Meshy`)

Esta aplicación reemplaza múltiples bases de código nativas por una única base multiplataforma en **Expo SDK 58 / React Native 0.88** con **React 19** y **React Compiler** activado:

- **Navegación:** `expo-router` (rutas tipadas en `src/app/` sin una sola línea de código ni estilos de React Native; cada archivo de ruta solo importa su vista o layout correspondiente).
- **Estado Global:** `zustand` (stores reactivos por funcionalidad dentro de `states/`).
- **Validación de Esquemas y Datos:** `zod` (validación estricta de contactos, códigos `MESHY-...`, coordenadas geográficas, perfiles públicos y mensajes en `fuctions/`).
- **Optimización Automática:** **React Compiler** habilitado (`"reactCompiler": true`), prescindiendo del uso manual de `useMemo`, `useCallback` o `React.memo`.
- **Estilos y UI:** `StyleSheet.create` nativo en el mismo archivo de cada componente, sin librerías externas de estilos, e iconos vectoriales centralizados en `assets/icons/`.

### Estructura de Carpetas del Proyecto

```text
Meshy/
├── assets/
│   ├── icons/                   # 48 iconos SVG del sistema visual de Meshy
│   └── images/                  # Logos e recursos gráficos esenciales
├── src/
│   ├── app/                     # Rutas de Expo Router (0 líneas de RN; solo importan vistas/layouts)
│   │   ├── _layout.tsx          # Renderiza CustomRootLayout
│   │   ├── onboarding.tsx       # Renderiza ViewOnboarding
│   │   ├── emergency.tsx        # Renderiza ViewEmergency
│   │   └── (tabs)/
│   │       ├── _layout.tsx      # Renderiza CustomTabsLayout
│   │       ├── index.tsx        # Renderiza ViewHome (Mapa y pedir ayuda)
│   │       ├── contacts.tsx     # Renderiza ViewContacts (Contactos y QR)
│   │       ├── messages.tsx     # Renderiza ViewMessages (Chats y ubicación)
│   │       ├── community.tsx    # Renderiza ViewCommunity (Perfiles públicos cercanos)
│   │       └── user.tsx         # Renderiza ViewUser (Identidad, ajustes y participación)
│   ├── components/
│   │   ├── ui/                  # Componentes visuales atómicos (ThemedButton, ThemedText, ThemedIcon, etc.)
│   │   └── layouts/             # Layouts globales (CustomTabBar, CustomSplashScreen, CustomSheet, etc.)
│   ├── feature/                 # Módulos por funcionalidad (aislados entre sí)
│   │   ├── home/                # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── contacts/            # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── messages/            # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── community/           # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── user/                # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── onboarding/          # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   ├── emergency/           # components/{layouts,views}, hooks, fuctions, states, types, constans
│   │   └── ble/                 # Módulo lógico (hooks, fuctions, states, types, constans)
│   ├── constants/               # Paleta de colores, formas y registro de iconos
│   └── hooks/                   # Hooks globales de tema y esquema de color
└── package.json
```

### Comandos de Desarrollo

```bash
npx expo start        # Iniciar servidor de desarrollo
npx expo lint         # Ejecutar linter (ESLint)
npx tsc --noEmit      # Verificar tipos con TypeScript
```

---

# Especificación técnica: red mesh descentralizada y oportunista para México

> **Nombre provisional:** Meshy / MeshMX  
> **Tipo de documento:** Especificación de producto, arquitectura, protocolo, seguridad y plan de verificación  
> **Versión:** 0.1 — borrador de diseño  
> **Fecha:** 28 de octubre de 2026  
> **Idioma:** Español  
> **Alcance inicial:** Android, iOS y pruebas en México; extensible a Linux, automóviles y hardware dedicado  
> **Estado:** Documento de trabajo para convertir el diseño en requisitos comprobables.

---

## Índice de capítulos

- [0. Cómo interpretar este documento](#0-como-interpretar-este-documento)
- [1. Conceptos, topología y capas](#1-conceptos-topologia-y-capas)
- [2. Roles, identidades de uso y dispositivos](#2-roles-identidades-de-uso-y-dispositivos)
- [3. Transporte BLE y límites físicos](#3-transporte-ble-y-limites-fisicos)
- [4. División de México en zonas geográficas](#4-division-de-mexico-en-zonas-geograficas)
- [5. Modelo de datos y formatos de paquetes](#5-modelo-de-datos-y-formatos-de-paquetes)
- [6. Routing híbrido: descubrimiento, corredores y entrega oportunista](#6-routing-hibrido-descubrimiento-corredores-y-entrega-oportunista)
- [7. Lifetime, antigüedad, prioridad y control anti-tormentas](#7-lifetime-antiguedad-prioridad-y-control-anti-tormentas)
- [8. Seguridad, E2EE, confianza y modelo de amenazas](#8-seguridad-e2ee-confianza-y-modelo-de-amenazas)
- [9. Perfiles públicos de voluntarios y alertas de ayuda](#9-perfiles-publicos-de-voluntarios-y-alertas-de-ayuda)
- [10. Ubicación compartida casi en tiempo real](#10-ubicacion-compartida-casi-en-tiempo-real)
- [11. Almacenamiento, cachés, retención y persistencia](#11-almacenamiento-caches-retencion-y-persistencia)
- [12. Energía, optimización y gestión de recursos](#12-energia-optimizacion-y-gestion-de-recursos)
- [13. Rendimiento, capacidad, pérdidas y métricas de calidad](#13-rendimiento-capacidad-perdidas-y-metricas-de-calidad)
- [14. Arquitectura de software y estrategia de repositorio](#14-arquitectura-de-software-y-estrategia-de-repositorio)
- [15. Interfaz de usuario y experiencia offline](#15-interfaz-de-usuario-y-experiencia-offline)
- [16. Estrategia de pruebas: pirámide y laboratorio](#16-estrategia-de-pruebas-piramide-y-laboratorio)
- [17. Pruebas de integración, E2E y escenarios físicos](#17-pruebas-de-integracion-e2e-y-escenarios-fisicos)
- [18. Criterios de aceptación y hitos de desarrollo](#18-criterios-de-aceptacion-y-hitos-de-desarrollo)
- [19. Modelo comercial, comunidad y licenciamiento](#19-modelo-comercial-comunidad-y-licenciamiento)
- [20. Operación, observabilidad y privacidad regulatoria](#20-operacion-observabilidad-y-privacidad-regulatoria)
- [21. Registro de decisiones pendientes (ADR backlog)](#21-registro-de-decisiones-pendientes-adr-backlog)
- [22. Matriz de trazabilidad de requisitos](#22-matriz-de-trazabilidad-de-requisitos)
- [23. Referencias técnicas para implementación y verificación](#23-referencias-tecnicas-para-implementacion-y-verificacion)
- [24. Apéndice A — Ejemplos de ciclos completos](#24-apendice-a--ejemplos-de-ciclos-completos)
- [25. Apéndice B — Checklist previa a la primera release pública](#25-apendice-b--checklist-previa-a-la-primera-release-publica)
- [26. Conclusión arquitectónica](#26-conclusion-arquitectonica)

---

## 0. Cómo interpretar este documento

Este documento consolida el diseño sobre mensajería sin Internet, Bluetooth Low Energy (BLE), nodos voluntarios, relays, zonas, rutas probabilísticas, personas disponibles para ayudar, alertas, privacidad y eventual comercialización. **No presupone que todos los mecanismos de radio ya estén cerrados ni que su viabilidad a escala nacional esté probada sin mediciones de campo.**

Se distinguen cuatro etiquetas:

- **[OBJETIVO]**: comportamiento buscado del producto.
- **[DECISIÓN PROVISIONAL]**: dirección técnica recomendada para comenzar; revisable mediante pruebas.
- **[HIPÓTESIS]**: idea que exige simulación, medición o investigación de seguridad.
- **[FUTURO]**: fuera del MVP; mantener interfaces para incorporarla después.

Las palabras **DEBE**, **NO DEBE**, **DEBERÍA**, **PUEDE** y **RECOMENDADO** expresan el nivel de obligatoriedad *dentro de esta propuesta*, no conformidad automática con algún estándar externo. Los valores de tiempo, batería, tamaño y confiabilidad que aparecen como *iniciales* son **parámetros experimentales**, nunca resultados medidos ni garantías.

### 0.1 Síntesis ejecutiva

Crear una **red descentralizada, multipunto, intermitente y de participación voluntaria** que transporte mensajes y eventos entre dispositivos sin requerir Internet, cuentas ni infraestructura central. Su aplicación inicial será comunicación local/offline con E2EE, mensajes SOS, perfiles públicos optativos de voluntarios y ubicación compartida consensuada. Su diferenciación técnica será un sistema **híbrido** de descubrimiento controlado, routing por corredores/zonas, aprendizaje de encuentros, límites de copias, deduplicación y *store-carry-forward*. Se pretende reutilizar APIs y bibliotecas permisivas, no inventar primitivas criptográficas.

```text
Aplicaciones: chat | alertas | ubicación | perfiles | IoT | enterprise
                              │
            identidad + E2EE + políticas de privacidad
                              │
         control de entrega y almacenamiento oportunista
                              │
        routing híbrido + zonas + aprendizaje de encuentros
                              │
               transporte BLE (primero)
                              │
          Android / iOS / Linux / relay / vehículo
```

### 0.2 Objetivos y no objetivos

**Objetivos funcionales:**

1. Mensajes entre dispositivos próximos sin Internet, SIM, red celular o registro.
2. Alcance extendido mediante relays multi-hop si existen nodos compatibles entre origen y destino.
3. Entrega eventual cuando la topología se interrumpe, con retención cifrada y expiración.
4. Descubrir rutas de forma limitada cuando el destino es desconocido; usar preferencias regionales cuando existe una pista confiable.
5. Proteger confidencialidad e integridad; minimizar la exposición de identidades y lugares.
6. Permitir participación optativa y graduada según batería, conectividad, permisos y roles.
7. Soportar perfiles públicos y alertas locales sin servidor de registro.
8. Proveer mediciones objetivas de entrega, latencia, overhead, energía y fallos.
9. Iniciar el desarrollo en un **repositorio público** con implementación limpia y modular.

**No objetivos ni promesas:**

- **NO** sustituir servicios profesionales de emergencia, el 911 ni una red celular.
- **NO** garantizar entrega, cobertura nacional, latencia «real time» ni disponibilidad permanente.
- **NO** conseguir comunicación con un dispositivo totalmente apagado; solo puede participar si OS, radio y aplicación pueden ejecutarse.
- **NO** sortear bloqueos físicos/jamming de la banda 2.4 GHz únicamente con software.
- **NO** afirmar que un perfil firmado verifica profesión, honestidad o identidad civil.
- **NO** rastrear a todas las personas de la red ni exponer coordenadas exactas a relays.
- **NO** permitir flooding indefinido, almacenamiento ilimitado o permisos ocultos.
- **NO** implementar audio/video continuo o archivos grandes como prioridad en V1.
- **NO** suponer que un altavoz Bluetooth ordinario puede ejecutar el protocolo.

### 0.3 Casos de uso y públicos

| Segmento | Caso de uso | Requisitos especialmente importantes |
|---|---|---|
| Consumidor | Chat sin cobertura entre conocidos | Simplicidad, privacidad, bajo consumo |
| Grupos | Campamentos, senderismo, festivales, campus | Alertas locales, grupos, alcance y estado de entrega |
| Comunidad | Vecinos y voluntarios que aceptan ayudar | Opt-in, directorio temporal, reputación/credenciales verificables opcionales |
| Emergencias | Avisos locales y solicitud de apoyo | Prioridad controlada, expiración, rechazo de spam, información de antigüedad |
| Operaciones | Agricultura, logística, construcción, almacenes, fábricas | Relays alimentados, administración, capacidad de auditar disponibilidad |
| Vehículos | Transporte diferido de paquetes entre zonas | Cifrado, *store-carry-forward*, límites de almacenamiento |
| Hardware | Nodos permanentes BLE/puentes | Bajo consumo, compatibilidad, actualización segura |
| Desarrolladores | SDK y protocolo interoperable | Especificación, pruebas de conformidad y compatibilidad |

---

## 1. Conceptos, topología y capas

### 1.1 Definiciones

- **Nodo:** equipo que ejecuta una implementación compatible y tiene identidad de transporte temporal.
- **Endpoint:** identidad lógica destinataria de mensajes; no equivale necesariamente a un teléfono o dirección BLE fija.
- **Relay:** nodo que recibe y retransmite paquetes cifrados; **transmite por radio**, aunque nunca redacte mensajes de usuario.
- **Hop:** una retransmisión de un nodo a otro.
- **Vecino:** nodo que puede intercambiar datos actualmente sobre un transporte determinado.
- **Ruta:** secuencia de relays o vecinos observada/estimada hacia un endpoint o región.
- **Corredor:** varias rutas compatibles que atraviesan regiones o zonas similares; no especifica una secuencia rígida de teléfonos.
- **Zona:** celda/región geográfica aproximada; definición interna estable, exposición pública cuidadosamente limitada.
- **RouteHint:** evidencia temporal sobre alcanzabilidad, próximo salto o región probable de destino.
- **Lifetime:** tiempo máximo de utilidad de un mensaje o hint.
- **Delivery ACK:** prueba autenticada de que un endpoint ha procesado un mensaje, distinta de aceptación de enlace.
- **Custody/Store:** custodia temporal de una copia cifrada sin garantía de que el siguiente salto exista.
- **Copy budget:** crédito de propagación de copias de un mensaje, con límites locales y protocolo de transferencia.
- **Paquete de control:** descubrimiento, inventario, ruta, hint, ACK, estado o credencial.

### 1.2 Arquitectura lógica

```text
┌────────────────────────────────────────────────────────┐
│ UI y aplicaciones                                     │
│ Chat / SOS / voluntarios / ubicación / enterprise / IoT│
├────────────────────────────────────────────────────────┤
│ Aplicación: mensajes, conversaciones, perfiles, UX     │
├────────────────────────────────────────────────────────┤
│ Identidad, E2EE, firma, autorización, antirreplay       │
├────────────────────────────────────────────────────────┤
│ Mesh Core                                             │
│ codec + dedupe + políticas + routing + DTN + métricas  │
├────────────────────────────────────────────────────────┤
│ Adaptadores de transporte                              │
│ BLE GATT/advertising | [futuro] Wi-Fi / otros           │
├────────────────────────────────────────────────────────┤
│ Plataforma: Android, iOS, Linux, MCU, automóvil         │
└────────────────────────────────────────────────────────┘
```

**[DECISIÓN PROVISIONAL]** La lógica mesh debe ser independiente del transporte. BLE será el transporte principal del MVP; una interfaz de abstracción permitirá añadir Wi-Fi u otros medios sin modificar identificadores, cifrado o políticas de reenvío.

### 1.3 Escenarios

```text
Conectividad contemporánea:
A --BLE-- R1 --BLE-- R2 --BLE-- B  => entrega con baja latencia si los enlaces funcionan.

Conectividad intermitente:
A --BLE-- R1  [B ausente]
              │ guarda paquete cifrado
              └── horas después --> R2 --> B

Transporte físico:
Zona 64 -- teléfono --> vehículo con relay --> Zona 35 --> receptor
```

**Importante:** una cadena multi-hop solo existe cuando los dispositivos tienen oportunidades efectivas de conexión; zonas vecinas en un mapa no implican conectividad real.

---

## 2. Roles, identidades de uso y dispositivos

### 2.1 Roles de comportamiento

Un rol indica **qué puede hacer la aplicación**, no el nivel de confianza de la persona.

| Rol/mode | Origina mensajes | Recibe | Retransmite | Almacena para terceros | Caso |
|---|---:|---:|---:|---:|---|
| Local mínimo | Sí | Sí | No | No | Usuario con batería limitada |
| Escucha/alertas | Respuestas opcionales | Sí | Opcional, apagado por defecto | No | Voluntario que escucha |
| Relay voluntario | Opcional | Sí | Sí | Opcional | Teléfono de apoyo |
| Relay permanente | Opcional | Sí | Sí | Sí | Dispositivo a corriente |
| Courier/vehículo | Opcional | Sí | Sí por encuentros | Sí | Movimiento entre regiones |
| Gateway multiprotocolo | Según política | Sí | Sí | Sí | BLE ↔ Wi-Fi, sin necesidad de Internet |
| Administrador enterprise | Según permisos | Sí | Según configuración | Según política | Gestión de parque, no acceso automático al contenido |

Los roles se implementan mediante **capacidades independientes**, por ejemplo:

```json
{
  "canOriginate": true,
  "canRelay": true,
  "canStoreCarry": false,
  "canReceiveAlerts": true,
  "isMainsPowered": false,
  "supportedTransports": ["ble"],
  "storageBudgetBytes": 52428800
}
```

### 2.2 Políticas configurables por el usuario

- Participación: **apagada / mínima / equilibrada / alta / nodo dedicado**.
- Permitir originar mensajes y/o ayudar como relay en controles separados.
- Consentir difusión de perfil público/rol de ayuda, de forma reversible.
- Batería mínima para retransmitir; desactivar al entrar en modo ahorro si corresponde.
- Cuota de almacenamiento temporal (por ejemplo, *valor inicial de prueba* 10–50 MB).
- Límites de tráfico/uso móvil y de radio, si se incorporan otros transportes.
- Frecuencia de rastreo de vecinos, condicionada por OS; evitar prometer ciclos de scanning exactos.
- Horarios de disponibilidad y tipos de alerta escuchados.
- Compartición de ubicación **desactivada por defecto** salvo que el usuario la solicite.

### 2.3 Identidad de usuario vs identidad de nodo

Un usuario puede tener una identidad criptográfica persistente y varios dispositivos autorizados. Un nodo físico puede tener IDs de descubrimiento rotativos:

```text
Identidad raíz/persona (clave de identidad) ── autoriza ── dispositivo A / B
                                        │
                                        └── contactos cifrados
Dispositivo A ──> identificador BLE efímero 1, 2, 3...

Perfil opt-in ──> alias/pseudónimo y clave pública verificable
```

**No se requiere email, teléfono, password ni servidor para comunicarse.**

### 2.4 Dispositivos compatibles

- **Android e iOS (mediante Expo / React Native + módulos nativos BLE):** plataformas móviles principales.
- **Linux/PC:** BLE y almacenamiento persistente; útil como relay de laboratorio.
- **Hardware dedicado:** microcontrolador o SBC programable con BLE (familias nRF y ESP32), alimentación estable y firmware actualizable.
- **Automóviles:** sistemas con acceso autorizado a apps/firmware y capacidades BLE apropiadas.

---

## 3. Transporte BLE y límites físicos

### 3.1 Estrategia

1. **Advertising BLE:** anunciar la presencia mínima del servicio/protocolo, versión y señales compactas; no publicar perfiles completos, geolocalización exacta ni claves privadas en anuncios.
2. **Scanning BLE:** encontrar vecinos compatibles y recopilar datos de enlace/advertisement cuando el OS lo permita.
3. **Intercambio de datos:** preferentemente GATT u otro mecanismo BLE soportado por ambos extremos, con negociación de capacidad, MTU y framing.
4. **Sesión de vecino:** descubrimiento → intercambio de capacidades → autenticación/política → inventario breve → transmisión → confirmación/timeout → cierre o reutilización.
5. **Transporte desacoplado:** BLE no define el formato E2EE ni el algoritmo de routing.

### 3.2 Capacidades variables

**[DECISIÓN PROVISIONAL]** En V1 usar mensajes de control del orden de decenas a cientos de bytes, textos/envelopes menores a varios KB y fragmentación según el MTU real. Archivo grande, imagen y streaming quedan fuera de V1.

### 3.3 Android e iOS

- Android 12+ exige permisos de proximidad `BLUETOOTH_SCAN`, `BLUETOOTH_ADVERTISE`, `BLUETOOTH_CONNECT` según operación, solicitados en runtime.
- Para trabajo activo continuo puede aplicar un foreground service del tipo `connectedDevice`.
- iOS: evaluar `bluetooth-central`, `bluetooth-peripheral`, restauración de estado y restricciones en background de CoreBluetooth.

### 3.4 Tolerancia a fallos del enlace

- MTU y fragmentación por sesión, no configuración universal.
- Reintento local con backoff exponencial/jitter y máximo configurable.
- `RSSI` solo indica calidad aproximada de señal; **no certifica distancia, identidad ni pertenencia a una zona**.
- No confundir ACK de radio/GATT, ACK de vecino/custodia y ACK firmado de entrega al destinatario.

---

## 4. División de México en zonas geográficas

### 4.1 Objetivo

Usar la geografía como **pista de routing** y forma de reducir duplicados innecesarios, no como condición obligatoria de conectividad.

**[DECISIÓN PROVISIONAL]** Evaluar H3 como malla jerárquica; también geohash o una malla propia. Mantener dos resoluciones: una **región macroscópica** para búsqueda/corredores y una **zona más fina**, solo donde el usuario lo autorice.

```text
Región nacional → macrozona → celda aproximada → coordenada exacta [solo E2EE]
```

### 4.2 Requisitos

- La delimitación será reproducible y versionada (`gridVersion`, `resolution`, `stableCellId`).
- El sistema debe funcionar sin GPS, ubicación denegada o ubicación obsoleta.
- Respetar cambio de zona, movimiento, imprecisión y frontera de celdas (histéresis para evitar anuncios repetidos por oscilación GPS).

### 4.3 Anuncios voluntarios de alcanzabilidad

```json
{
  "type": "DESTINATION_HINT",
  "routingAlias": "efimero",
  "coarseRegionHint": "region-opcional",
  "issuedAt": "t_utc",
  "validForSeconds": 1800,
  "sequence": 42,
  "confidence": "observacion-local",
  "scope": "contactos-autorizados"
}
```

### 4.4 Alias rotativos de zonas

```text
stableCellId (interno) + epoch + clave de ámbito  →  alias rotativo
alias = Trunc128(HMAC-SHA256(zoneScopeKey, "mesh-zone-v1" || gridVersion || stableCellId || epoch))
```

**[DECISIÓN PROVISIONAL V1]** Conservar celdas estables **solo dentro** del dispositivo para cálculos; usar macrozonas opcionales explícitas o hints cifrados para contactos.

---

## 5. Modelo de datos y formatos de paquetes

### 5.1 Principios

- Separar **envolvente inmutable autenticada**, **campos mutables de forwarding** y **payload cifrado**.
- Crear IDs aleatorios de alta entropía.
- Definir serialización canónica y versionada (CBOR / Protocol Buffers).
- No introducir coordenadas, nombres, emails, claves privadas o mensaje claro en cabeceras de relay.

### 5.2 Modelo conceptual `EnvelopeV1`

```text
EnvelopeV1
├── immutableHeader
│   ├── protocolVersion             u8
│   ├── packetKind                  enum
│   ├── messageId                   128 bits aleatorios
│   ├── creationTime                timestamp relativo/UTC
│   ├── maxLifetimeMs               u32/u64
│   ├── maxHops                     u8
│   ├── policyClass                 enum sujeto a autorización
│   ├── destinationHint             opcional, seudónimo/ámbito
│   ├── encryptionSuite             enum/versionado
│   ├── contentHash/length          según diseño criptográfico
│   └── originAuthenticator         firma/MAC según tipo
├── forwardingState
│   ├── hopCount                    u8
│   ├── bundleAgeMs                 contador limitado/monótono
│   ├── remainingCopyCredits        u8/u16, créditos por rama
│   ├── observedRegionTrail         opcional, truncado, con consentimiento
│   └── previousHopProof            opcional, autenticación local
└── encryptedBody
    ├── destinationIdentity         solo receptor
    ├── applicationType
    ├── text / location / profile-private / alert-private
    ├── messageNonce / ratchet state
    └── authenticationTag
```

### 5.3 Tipos de mensaje

| Código lógico | Significado | Alcance/observaciones |
|---|---|---|
| `HELLO` / `CAPABILITIES` | Descubrimiento y negociación | No debe filtrar identidad civil |
| `INVENTORY_SUMMARY` | ID de paquetes/hints disponibles | Intercambio acotado |
| `REQUEST_OBJECT` | Solicitud de contenido faltante | Autorizado y limitado |
| `CHAT` | Mensaje privado E2EE | Uno a uno |
| `GROUP_MESSAGE` | Grupo con administración de claves | [FUTURO] |
| `PROFILE_AD` | Índice de perfil público opt-in | Caducidad corta |
| `PROFILE_DATA` | Perfil firmado | Verificación no equivale a credencial profesional |
| `HELP_REQUEST` | Solicitud de ayuda | Pública o privada, explícitamente indicado |
| `HELP_RESPONSE` | Respuesta a solicitud | E2EE con remitente cuando sea posible |
| `LOCATION_UPDATE` | Ubicación voluntaria cifrada | Expiración especialmente corta |
| `DESTINATION_HINT` | Pista de región/alcanzabilidad | Distinta del mensaje de usuario |
| `ROUTE_DISCOVERY` | Exploración restringida | Nunca flooding interminable |
| `ROUTE_OBSERVATION` | Información de ruta observada | No confiar sin validación |
| `CUSTODY_ACK` | Vecino aceptó guardar temporalmente | No implica entrega final |
| `DELIVERY_ACK` | Destino confirma recepción/procesamiento | Autenticado, minimiza metadatos |
| `CANCEL` / `EXPIRY` | Invalidación | Seguridad y alcance delimitados |

### 5.4 Estados de un mensaje

```text
DRAFT → QUEUED → OFFERED → HOP_ACCEPTED → FORWARDED → DELIVERED
                     │             │
                     ├── WAITING   ├── RETRY
                     └── EXPIRED / EVICTED / FAILED / CANCELLED
```

---

## 6. Routing híbrido: descubrimiento, corredores y entrega oportunista

**[DECISIÓN PROVISIONAL]** Motor híbrido con estos estados por mensaje:

1. **`KNOWN_ROUTE`**: ruta/vecino reciente y viable; enviar por un siguiente salto preferido y como máximo algunos backups.
2. **`KNOWN_CORRIDOR`**: zona o corredor probabilístico; propagar preferentemente hacia vecinos/ámbitos que muestran progreso o historial útil.
3. **`UNKNOWN_DESTINATION`**: descubrimiento limitado y exploración oportunista, no difusión nacional.
4. **`PARTITIONED`**: si no hay vecino útil, guardar copia cifrada cuando esté permitido y esperar nuevos encuentros.
5. **`RECOVERY`**: ruta caducada o fallo de ACK; degradar confianza y explorar ramas alternativas limitadas.
6. **`DELIVERED` / `EXPIRED`**: suprimir retransmisión y borrar según política.

### Puntaje heurístico inicial para simulación

$$
S(n,d) = 0.25P_{avance} + 0.25P_{entrega} + 0.20Q_{enlace} + 0.15A_{nodo} + 0.10C_{disponibilidad} + 0.05T_{confianza} - Penalizaciones
$$

---

## 7. Lifetime, antigüedad, prioridad y control anti-tormentas

**`messageLifetime = 6 h` significa «puede conservarse y entregarse durante hasta 6 horas», NO «transmitirlo ininterrumpidamente durante seis horas».**

| Clase | Propósito | Lifetime candidato *experimental* | Comportamiento |
|---|---|---|---|
| `REALTIME_LOCATION` | Posición compartida | 10–60 s | Caduca rápido, descartar versiones antiguas |
| `DISCOVERY` | Búsqueda de ruta | 10–30 s | Muy acotado; no store-carry largo |
| `ROUTE_HINT` | Alcanzabilidad | 15–60 min | Caduca separado de mensajes |
| `CHAT_EPHEMERAL` | Mensaje breve | 10–30 min | Latencia antes que persistencia |
| `CHAT_DELAYED` | Mensaje con espera aceptada | 6–24 h opt-in | Almacenamiento oportunista |
| `COMMUNITY_ALERT` | Aviso local | 15–60 min | Difusión geográfica acotada |
| `HELP_REQUEST` | Solicitud de ayuda | 15–120 min | Prioridad moderada/alta con cuotas |
| `SOS` | Emergencia activa | 1–6 h | Renovable solo por origen autorizado |
| `PROFILE_AD` | Presencia de voluntario | Minutos | Lista «visto hace...» |
| `PROFILE_DATA` | Perfil firmado | Horas/días con caducidad | No implica disponibilidad actual |
| `DELIVERY_ACK` | Confirmación | Corto y limitado | Limpieza progresiva |

---

## 8. Seguridad, E2EE, confianza y modelo de amenazas

- **E2EE entre endpoints:** los relays reciben únicamente **ciphertext** y los campos mínimos de forwarding; solo los endpoints autorizados descifran el contenido.
- **Primitivas candidatas:** **Noise XX** para sesiones interactivas, **HPKE (RFC 9180)** para primer mensaje asíncrono offline, **X25519** para acuerdo de claves, **HKDF**, **ChaCha20-Poly1305 / AES-GCM** como AEAD y **Ed25519** para firmas.
- **Asociación de contactos sin servidor:** intercambio presencial mediante código QR (`meshy://invite/v3/...`), huella verificable o perfil público opt-in.

---

## 9. Perfiles públicos de voluntarios y alertas de ayuda

Una persona puede mantener su dispositivo escuchando alertas y publicar voluntariamente un perfil público o un lugar seguro **sin crear una cuenta centralizada**. La propia red anuncia, transporta y cachea temporalmente ese perfil dentro del ámbito y límites definidos por su propietario (por ejemplo, caducidad de 15 minutos al retirarse y aviso explícito de que la información es autodeclarada).

---

## 10. Ubicación compartida casi en tiempo real

BLE transporta coordenadas obtenidas mediante el sistema de localización con consentimiento explícito del usuario y las transmite cifradas extremo a extremo (`LOCATION_UPDATE`) hacia el contacto elegido, distinguiendo entre **Ubicación actual** y **Ubicación en vivo**, e indicando siempre la antigüedad real de la última posición recibida.

---

## 11. Almacenamiento, cachés, retención y persistencia

| Categoría | Dónde | Caducidad/retención | Protección |
|---|---|---|---|
| Claves raíz | Keystore/Keychain seguro local | Hasta revocación/recuperación | Nunca transmitidas |
| Mensajes del usuario | BD local | Política del usuario | E2EE y cifrado local apropiado |
| Bundles de terceros | Cola de relay | Lifetime + cuota local | Cifrados, borrado automático |
| Dedupe IDs | LRU/BD de corta vida | Ventana calibrada | Pseudónimos; cuota |
| Perfiles públicos recibidos | Cache | Expiry del perfil/anuncio | Firma + consentimiento de difusión |
| Ubicaciones compartidas | Destino autorizado | Duración de sesión | E2EE; minimización |

---

## 12. Energía, optimización y gestión de recursos

| Perfil | Descubrimiento | Retransmisión | Store-carry | Cuándo |
|---|---|---|---|---|
| `OFF` | No | No | No | Usuario desactiva red |
| `MINIMAL` | Bajo demanda/OS | Mensajes propios | No | Ahorrar batería |
| `BALANCED` | Adaptativo | Cuota reducida | Poco/opt-in | Predeterminado |
| `HIGH` | Mayor disponibilidad posible | Más cuota | Sí con permiso | Usuario opta expresamente |
| `DEDICATED` | Según hardware/OS | Alto, pero acotado | Sí | Relay conectado a corriente |

---

## 13. Rendimiento, capacidad, pérdidas y métricas de calidad

Se evalúan de forma continua los indicadores operacionales: `PDR_T` (tasa de entrega dentro del plazo `T`), `DeliveryLatency`, `AckLatency`, `RelayOverhead`, `DuplicateRate`, `CopyAmplification`, `BatteryDrainDelta` y `CrashFreeSessions`.

---

## 14. Arquitectura de software y estrategia de repositorio

### 14.1 Decisión de repositorio inicial

**[DECISIÓN INICIAL]** En el comienzo se utiliza un **repositorio público** con implementación 100% propia desde cero. Esto permite desarrollar de forma abierta la interfaz multiplataforma en **Expo / React Native** y la especificación del protocolo, manteniendo trazabilidad clara de licencias permisivas en cada dependencia.

---

## 15. Interfaz de usuario y experiencia offline

La interfaz de usuario implementada en `Meshy` cubre todo el flujo offline sin requerir cuentas ni servidores:

- **Onboarding (5 pasos):** explicación visual de conexión directa Bluetooth, red en cadena, tipos de cuenta, lugares seguros y límites honestos de uso.
- **Inicio (Mapa):** visualización de señal BLE/ubicación, lugares seguros cercanos y botón principal **Pedir ayuda** con selector de situaciones (`Necesito hablar`, `Acompáñame`, `Me siento en peligro`, `Peligro inmediato`).
- **Contactos:** lista de contactos verificados por QR, hasta 3 contactos de confianza prioritarios y escáner QR integrado.
- **Mensajes:** conversaciones individuales, archivadas, envío de ubicación actual o en vivo, estados de entrega por BLE (`Enviando por BLE…`, `En espera de entrega`, `Entregado`) y alerta rápida por contacto.
- **Comunidad:** directorio temporal de perfiles públicos cercanos con indicador de proximidad y contacto directo.
- **Usuario y Acceso de Emergencia:** código QR de invitación, alias cercano, configuración de participación (`Solo uso personal`, `Apoyo en red`, `Ayuda pública` o `Personalizado`), perfil público, publicación de lugar seguro, batería, privacidad y acceso rápido de emergencia con cuenta regresiva.

---

## 16. Estrategia de pruebas: pirámide y laboratorio

1. **Pruebas unitarias y validación de esquemas (`zod`):** validación de paquetes, contactos, coordenadas, fragmentación, deduplicación y expiración.
2. **Simulaciones deterministas:** topologías lineales, anillos, clústeres aislados y movilidad (*mobile ferry*).
3. **Pruebas de integración en dispositivos físicos:** escenarios `A ↔ B` directo y `A ↔ R ↔ B` sin enlace directo entre `A` y `B`.

---

## 17. Pruebas de integración, E2E y escenarios físicos

Verificar aislamiento real entre nodos extremos (`A` y `C`) comprobando que sin el nodo intermedio (`B`) no hay detección ni entrega, y que al habilitar el modo puente en `B` los paquetes cifrados llegan íntegramente a `C` sin que `B` pueda leer su contenido.

---

## 18. Criterios de aceptación y hitos de desarrollo

- **UI Multiplataforma Base (Completado):** Interfaz completa en Expo / React Native con arquitectura modular por `feature`, Zustand, Zod y React Compiler.
- **V0 — Radio BLE real:** detección y negociación entre 2 dispositivos físicos.
- **V0.1 — Tres dispositivos y primera mesh:** `A → B → C` con `messageId`, dedupe, `maxHops`, `lifetime` y E2EE.
- **V0.2 — Red oportunista:** *store-and-forward* cifrado, expiración, colas y *copy budget*.
- **V0.3 — Georouting experimental en México:** macrozonas, hints opt-in y aprendizaje de corredores.
- **V0.4 — Casos comunitarios completos:** perfiles públicos firmados, alertas suscritas y ubicación compartida E2EE sobre radio real.

---

## 19. Modelo comercial, comunidad y licenciamiento

- **Comunidad:** mensajería básica offline, identidad local, relays voluntarios, alertas comunitarias y perfiles de apoyo sin suscripción ni cuenta central.
- **Entornos administrados / Enterprise:** nodos dedicados a corriente, gateways, consola de salud de red y credenciales firmadas por organizaciones.

---

## 20. Operación, observabilidad y privacidad regulatoria

Diagnóstico local primero mediante contadores agregados sin recolectar nombres reales, mensajes en claro ni coordenadas exactas. Todo uso de perfil público, lugar seguro o ubicación compartida es estrictamente *opt-in*, temporal y revocable.

---

## 21. Registro de decisiones pendientes (ADR backlog)

- **ADR-001:** Nombre y marca definitiva (`Meshy` / `MeshMX`).
- **ADR-002:** Formato binario canónico (`CBOR` vs `Protobuf`).
- **ADR-003 / ADR-004:** Cifrado E2EE asíncrono (`HPKE`) y sesiones interactivas (`Noise XX`).
- **ADR-006 / ADR-007:** Sistema de geoceldas para México (`H3` vs `Geohash`).

---

## 22. Matriz de trazabilidad de requisitos

Cada requisito funcional (mensajería sin registro, multi-hop BLE, *store-and-forward*, deduplicación, *lifetime* seguro, E2EE, perfiles públicos y ahorro de energía) se vincula directamente con su módulo en `src/feature/` y su suite de pruebas correspondiente.

---

## 23. Referencias técnicas para implementación y verificación

1. **IETF RFC 9171 — Bundle Protocol Version 7:** <https://www.rfc-editor.org/rfc/rfc9171.html>
2. **IETF RFC 9172 — Bundle Protocol Security (BPSec):** <https://www.rfc-editor.org/rfc/rfc9172.html>
3. **IETF RFC 9180 — Hybrid Public Key Encryption (HPKE):** <https://www.rfc-editor.org/rfc/rfc9180.html>
4. **Noise Protocol Framework:** <https://noiseprotocol.org/>
5. **Bluetooth SIG — Bluetooth Low Energy Primer:** <https://www.bluetooth.com/bluetooth-le-primer/>
6. **H3 Spatial Index:** <https://github.com/uber/h3>

---

## 24. Apéndice A — Ejemplos de ciclos completos

- **Chat de `A` a `B` en zona desconocida:** descubrimiento acotado → evidencia de alcanzabilidad → entrega E2EE → aprendizaje de corredor temporal.
- **SOS / Alerta con vigencia acotada:** difusión inicial controlada → custodia en nodos puente → reanuncio solo ante nuevos encuentros → cancelación autenticada o expiración por `lifetime`.
- **Perfil público sin cuenta central:** generación local de claves → activación temporal opt-in → anuncio compacto firmado → expiración automática.

---

## 25. Apéndice B — Checklist previa a la primera release pública

- [x] Arquitectura modular de interfaz y estado global (`zustand` + `zod` + React Compiler).
- [x] Explicación honesta en UI sobre límites de alcance, demora y disponibilidad sin Internet.
- [ ] Modelo de amenazas revisado y pruebas de captura de tramas BLE.
- [ ] Almacenamiento seguro de claves privadas en Keystore / Keychain.
- [ ] Prueba física reproducible de tres dispositivos (`A → B → C`) sin enlace directo `A–C`.
- [ ] Benchmarks de batería y tasa de entrega en distintos modelos Android e iOS.

---

## 26. Conclusión arquitectónica

**Meshy** no es un simple chat por Bluetooth, sino una **plataforma de transporte oportunista de objetos cifrados** pensada para operar sin Internet ni cuentas centrales. Comenzar en un **repositorio público** con una arquitectura multiplataforma limpia permite iterar con transparencia desde la experiencia de usuario hasta las capas de enrutamiento híbrido, seguridad E2EE y validación en campo.
