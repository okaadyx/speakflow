# Frequently Asked Questions (FAQ)

Common questions about SpeakFlow.

---

## General

### What is SpeakFlow?

SpeakFlow is an AI-powered teleprompter designed to help you practice public speaking, presentations, interviews, and storytelling. It combines AI script generation with a professional scrolling teleprompter in a beautiful, distraction-free interface.

### Is SpeakFlow free?

SpeakFlow is open source under the MIT License. You can self-host it for free. If using AI script generation, you will need your own API key from an AI provider (costs depend on the provider and usage).

### Do I need an account to use SpeakFlow?

No. Version 1.0 stores scripts and practice history locally in your browser. User accounts and cloud sync are planned for future releases.

### What browsers are supported?

Chrome 100+, Firefox 100+, Safari 15+, and Edge 100+. See [Browser Support](../README.md#browser-support) for details.

---

## AI Script Generation

### Which AI models are supported?

Any OpenAI-compatible API endpoint. This includes OpenAI (GPT-4o, GPT-4o-mini), Azure OpenAI, and compatible providers. Configure via `AI_ENDPOINT` and `AI_MODEL` environment variables.

### How much does AI generation cost?

Costs depend on your AI provider and model. GPT-4o-mini is typically very affordable for speech generation (a few cents per script). Check your provider's pricing page.

### Can I use SpeakFlow without AI?

Yes. You can write scripts manually using the editor or paste existing text. AI generation is optional.

### Why is my AI-generated script short or generic?

- Ensure your prompt is specific and detailed
- Try selecting a category pill for better prompt templates
- Check that your `AI_MODEL` supports longer outputs
- Verify the API key has sufficient quota

---

## Teleprompter

### How do I adjust scroll speed?

Open the **Prompter Config** settings drawer (gear icon) and use the scroll speed slider (0.5× – 4×).

### What is mirror mode?

Mirror mode horizontally flips the script text. Use it with a physical teleprompter mirror rig that reflects the screen.

### How does the reading guide work?

The line closest to the center of the screen is highlighted in accent color with full opacity. Surrounding lines fade progressively, helping you focus on the current line.

### Can I practice without auto-scroll?

Yes. Simply don't press Play. You can manually scroll through the script or click individual lines to jump to them.

### How is WPM calculated?

Words per minute = total word count ÷ practice duration in minutes. The pace rating compares your WPM against your configured target (default: 130 WPM).

---

## Data & Privacy

### Where is my data stored?

Scripts and practice logs are stored in your browser's `localStorage`. AI-generated scripts are also saved to the PostgreSQL database on the server.

### Is my data shared with third parties?

AI prompts are sent to your configured AI provider for script generation. No data is shared with other third parties. See the [Privacy Policy](../src/components/views/PrivacyPolicyView.tsx) for details.

### Can I export my scripts?

Currently, scripts are accessible in `localStorage`. You can copy content from the editor. Export functionality is planned for a future release.

### How do I clear my data?

Clear your browser's local storage for the SpeakFlow domain, or delete individual scripts and practice logs within the app.

---

## Development

### How do I run SpeakFlow locally?

See the [Getting Started Guide](getting-started.md) for step-by-step instructions.

### Can I contribute?

Absolutely! Read the [Contributing Guide](../CONTRIBUTING.md) and check the [Roadmap](../README.md#roadmap) for areas where help is needed.

### How do I report a bug?

Open a [GitHub Issue](https://github.com/okaadyx/speakflow/issues) with steps to reproduce, expected behavior, and your environment details.

### How do I report a security issue?

Email [security@speakflow.app](mailto:security@speakflow.app). Do not open public issues for security vulnerabilities. See [SECURITY.md](../SECURITY.md).

---

## Deployment

### Can I self-host SpeakFlow?

Yes. Deploy the frontend and API to any platform that supports Node.js and static hosting. See the [Deployment Guide](deployment.md).

### Do I need PostgreSQL?

PostgreSQL is required for the API (AI script persistence). The frontend works without a database for manual scripts stored in localStorage.

### Can I deploy without Vercel?

Yes. The frontend is a standard Vite SPA buildable to static files. The API is a standard Express server. See [Deployment Guide](deployment.md) for alternatives.

---

## Still have questions?

- [GitHub Discussions](https://github.com/okaadyx/speakflow/discussions)
- [GitHub Issues](https://github.com/okaadyx/speakflow/issues)
- Email: [support@speakflow.app](mailto:support@speakflow.app)
