# RuntimePad

## Inspiration
I wanted to build a single, elegant platform packed with the most useful tools developers constantly need—while prioritizing speed, privacy, and responsible software development. No ads, no data mining, just powerful tools that work.

## What it does
RuntimePad is an all-in-one developer toolbox with 11 high-utility tools built for speed, privacy, and collaboration. It empowers developers to streamline their workflow without switching tabs or compromising data privacy.

#### Tools built:
- **JSON Beautifier** – Format, validate, and beautify JSON with syntax highlighting.
- **Diff Checker** – Compare text/code files with side-by-side diffs.
- **Code Editor** – Real-time collaborative editor with syntax highlighting.
- **Base64 Encoder/Decoder** – Encode/decode Base64 with instant validation.
- **Markdown Previewer** – Live markdown-to-HTML preview with export options.
- **Regex Tester** – Test and visualize regular expressions.
- **UUID Generator** – Generate RFC 4122 UUID v4 strings (bulk supported).
- **Timestamp Converter** – Convert between UNIX timestamps and readable dates.
- **Case Converter** – Switch text between camelCase, snake_case, kebab-case, etc.
- **Color Picker** – Convert colors across HEX, RGB, HSL, HSV, and CMYK.
- **HTML Escape/Unescape** – Safely escape/unescape HTML entities.

## How I built it
- **Prototyping**: [bolt.new](https://bolt.new)
- **Hosting**: [Netlify](https://www.netlify.com/) for deployment, [IONOS](https://www.ionos.com/) for hosting.
- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) for a responsive UI. [Framer Motion](https://www.framer.com/motion/) for smooth, elegant animations.
- **Code Editing**: [Monaco Editor](https://github.com/microsoft/monaco-editor) (the same editor used in VS Code) powers all code-related interactions.
- **Realtime & Backend**: [Supabase](https://supabase.com/).


## Challenges I ran into
- 🔄 **Realtime Sync**: Managing efficient, debounced syncing of code in collaborative sessions required careful handling of Supabase’s realtime subscriptions.
- 🧱 **Editor State Management**: Monaco doesn’t offer a simple API for diffing or history, so integrating it cleanly with React was a challenge.
- 🧪 **Diff Accuracy**: Making the diff tool both accurate and visually simple required several UI/UX iterations.
- 🌐 **Tool Isolation vs Unified Design**: Striking the balance between focused UIs for each tool and a cohesive RuntimePad experience took thoughtful design.

## Accomplishments that I am proud of
- ✅ Built a beautiful, intuitive landing page introducing all tools.
- ✅ Implemented a collaborative code editor with real-time sync via Supabase.
- ✅ Successfully integrated Monaco Editor across 11 different dev tools.
- ✅ Designed a modular architecture for easily adding future tools.

## What I learned
- 🚀 How rapid prototyping with bolt.new can turn an idea into a fully working platform.
- 📡 Leveraged Supabase’s real-time database to build live collaborative features.
- ⚙️ Learned the quirks of Monaco Editor and how to work with it in a React/Next.js stack.
- 🎨 Developed best practices for designing multipurpose dev tools with clean UX.
- 🌍 Built a platform that’s powerful for experienced devs yet friendly for beginners.

## What's next for RuntimePad
- 🧠 **AI Assistance** – Embed AI to explain diffs, suggest improvements, and auto-fix bugs.
- 🧑‍💻 **User Accounts** – Allow users to save sessions and tools on personalized dashboards.
- 📁 **More Tools** – Add utilities like CSV to JSON and beyond.
- 🤝 **Team Collaboration** – Enable chat, inline comments, and user presence in shared pads.