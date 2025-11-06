Vaultchat is a privacy-first AI chat vault that integrates secure data storage and conversational intelligence using Node.js and MongoDB. I focused on building encrypted message handling, authentication, and LLM-based summarization. It demonstrates my ability to design full-stack systems that prioritize both usability and data protection.

| Layer              | Tech Stack                                     | Responsibilities                                                  |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------- |
| **Frontend**       | React + Vite + TailwindCSS + TypeScript        | Chat interface, message rendering, AES encryption/decryption      |
| **Backend (BaaS)** | Supabase (PostgreSQL, Auth, Realtime Channels) | Authentication, message persistence, realtime updates             |
| **AI Layer**       | OpenAI / HuggingFace APIs                      | Smart summarization and contextual replies                        |
| **Security**       | AES-256 message encryption                     | Data encrypted before writing to Supabase, decrypted only locally |


⚙️ Core Features :

🔐 Secure Authentication – Implemented Supabase Auth with session handling.

💬 Realtime Messaging – Supabase Channels for low-latency, event-driven chat.

🧩 AI Summarizer – LLM API integration for message summarization.

🧱 Client-Side Encryption – AES encryption for privacy-first data storage.




What Makes VaultChat Different :

While many chat apps use generic templates, VaultChat focuses on data autonomy and privacy — users control their data, and LLM features only operate on locally decrypted text. This mirrors the “consent-driven AI” foundation that Hushh promotes.
