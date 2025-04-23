# Text to PDF Converter

A React app for converting text to PDF using an external API. Supports conversion history and PDF display.

## Technologies

- **React 18** — UI library.
- **TypeScript** — typing.
- **Tailwind CSS** — styling.
- **Vite** — builder.
- **Biome** — linting and formatting.
- **Axios** — API requests.
- **react-pdf-viewer** — PDF viewing.
- **Jest / React Testing Library** — testing.

## Project structure

- **src/components/**:
  - `Converter.tsx`: Component for text input and conversion.
  - `PdfViewer.tsx`: Component for PDF display.
  - `History.tsx`: Component for conversion history.
- **src/utils/**:
  - `api.ts`: Functions for working with API.
  - `storage.ts`: Working with local storage.
- **src/types/**:
  - `index.ts`: TypeScript types.
  - `env.d.ts`: Environment variable declarations.
- **src/App.tsx**: Main component.
- **src/main.tsx**: Entry point.

## Installation

1. Install Bun: `curl -fsSL https://bun.sh/install | bash`.
2. Clone the repository.
3. Install dependencies: `bun install`.
4. Run the project: `bun run dev`.

## Testing

- Run tests: `bun run test`.

## API

- **POST** `http://95.217.134.12:4010/create-pdf?apiKey={YOUR_API_KEY}`
- Body: `{ "text": "Your text" }`
- Response: "Base64 string"
