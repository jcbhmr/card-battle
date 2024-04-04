<p align=center>
  <b>You're probably looking for <a href="https://jcbhmr.me/card-battle/">jcbhmr.me/card-battle</a></b>
</p>

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)
![React](https://img.shields.io/static/v1?style=for-the-badge&message=React&color=222222&logo=React&logoColor=61DAFB&label=)
![Tailwind CSS](https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=)

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/https://github.com/jcbhmr/card-battle)

<p align=center><a href="https://upload.snakesandlattes.com/rules/a/AdventureTimeCardWarsFinnvsJake.pdf">Adventure Time Card Wars rulebook PDF</a>
  | <a href="https://uwwtw.instructure.com/courses/629539">UWW Canvas course</a>
  | <a href="https://uwwtw.instructure.com/groups/589727">UWW Canvas group</a>
  | <a href="https://discord.com/channels/1210270012871548968/1210270013316141087">Team Discord</a>
</p>

This app is currently entirely client-side. There is no server-side component. You can get started easily using ⚡StackBlitz by clicking the <kbd>Open in Codeflow</kbd> button above. All of the API data model stuff should go in [`src/model.ts`](src/model.ts). If it ever overflows a single file, make a `src/model/` folder and put the files in there with a `src/model/index.ts` exporting the important bits. The UI actual _on the screen_ bits can start out all in [`src/App.tsx`](src/App.tsx) as one big file. If that gets too big the code can be split out into multiple files in `src/*.tsx`.

- **`npm run dev`:** Runs the Vite dev server so you can see a live reloading preview of your code as you edit it.
- **`npm run format`:** Formats all the code using Prettier. Run this every so often.
- **`npm run build`:** Compiles everything into an `index.html` and associated JavaScript and CSS files. This is what GitHub Actions will run before deploying this site to GitHub Pages.

### Cool tools

This is Jacob's list of cool tech tools that were shown off at some point in team meetings.

- **[StackBlitz](https://stackblitz.com/):** No-configuration Node.js dev env for frontend & light backend.
- **[Excalidraw](https://excalidraw.com/):** Great for low pressure crude sketches and diagrams when you need digital pen & paper.
- **[XState](https://github.com/statelyai/xstate):** Makes diagrams, simulations, and more out of your state machine code!
- **[Vite](https://vitejs.dev/):** The current best frontend build system.
- **[TypeScript](https://www.typescriptlang.org/):** The best way to write JavaScript with type declarations.
- **[v0](https://v0.dev/):** AI code generator focused on React & Tailwind CSS
- **[ChatGPT](https://chat.openai.com/):** General purpose AI chatbot that can generate code.
- **[Gemini](https://gemini.google.com/):** Alternative to ChatGPT that supports image inputs on the free tier.
- **[DALLE2](https://labs.openai.com/):** OpenAI's image generator AI. Free credits until April 1st.
- **[Craiyon](https://www.craiyon.com/):** Completely free no signup image generator AI. Inferior to DALLE2.
- **[Tailwind CSS](https://tailwindcss.com/):** Put your CSS in your HTML instead of fragile linking to another file.
- **[React](https://react.dev/):** The biggest JavaScript UI framework right now.
- **[Prettier](https://prettier.io/):** The most popular JavaScript ecosystem code formatter.
- **[Vitest](https://vitest.dev/):** Vite-based testing framework. Supports TypeScript out of the box.
- **[shadcn/ui](https://ui.shadcn.com/):** Premade components to copy-paste into your React+TailwindCSS project.
