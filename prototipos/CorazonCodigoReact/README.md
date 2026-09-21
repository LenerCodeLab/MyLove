# Y&L — Nuestro Corazon en Codigo

Pagina romantica, responsive e interactiva para Yenni, creada por Lener.

## Instalar dependencias

Desde esta carpeta:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre la URL que muestre Vite, normalmente:

```text
http://127.0.0.1:5173
```

## Generar version final

```bash
npm run build
```

La salida se genera en `dist/`.

## Reemplazar fotografias

Las imagenes estan en:

```text
public/assets/images/
```

Puedes reemplazar estos archivos manteniendo los nombres:

- `yenni-01.jpg`
- `yenni-02.jpg`
- `nosotros-01.jpg`
- `nosotros-02.jpg`
- `flores-amarillas.png`

Tambien puedes agregar mas imagenes y registrarlas en:

```text
src/data/content.ts
```

## Cambiar la cancion

La musica esta en:

```text
public/assets/music/nuestra-cancion.mp3
```

Puedes reemplazar ese archivo por otra cancion con el mismo nombre, o cambiar la ruta en `src/data/content.ts`.

## Editar cartas, mensajes y fotos

Todo el contenido principal se edita en:

```text
src/data/content.ts
```

Alli puedes cambiar:

- Nombre de Yenni.
- Nombre de Lener.
- Frase principal.
- Cartas.
- Fotografias.
- Galeria.
- Linea del tiempo.
- Metas futuras.
- Fecha de relacion.
- Cancion.

## Configurar fecha de relacion

Edita esta constante:

```ts
export const relationshipStartDate = "AAAA-MM-DD";
```

## Agregar recuerdos

En `src/data/content.ts`, agrega elementos al arreglo `gallery` o `timeline`.

Ejemplo:

```ts
{ src: "/assets/images/nueva-foto.jpg", date: "Fecha", place: "Lugar", text: "Mensaje", emoji: "♥" }
```

## Guardado local

Se usa `localStorage` para guardar:

- Entrada ya desbloqueada.
- Preferencia de musica.
- Volumen.
- Cartas abiertas.
- Puzzle completado.
- Memoria completada.
- Secreto desbloqueado.

## Publicar gratis

### Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, crea un nuevo proyecto.
3. Selecciona esta carpeta como root si el repositorio contiene mas proyectos.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify

1. Sube el proyecto a GitHub.
2. En Netlify, crea un nuevo sitio desde Git.
3. Base directory: `prototipos/CorazonCodigo`.
4. Build command: `npm run build`.
5. Publish directory: `prototipos/CorazonCodigo/dist`.

## Estructura

```text
src/components/  Componentes reutilizables
src/sections/    Secciones principales de la experiencia
src/games/       Minijuegos
src/hooks/       Hooks reutilizables
src/utils/       Utilidades
src/data/        Contenido editable
src/styles/      Estilos globales
public/assets/   Imagenes y musica
```
