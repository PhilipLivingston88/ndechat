# NDE Q&A Website

A static website dedicated to Near-Death Experience (NDE) research and insights, featuring an AI chat assistant that can answer questions about consciousness, spirituality, and the nature of existence from a science-based perspective.

## Features

- **Multilingual Support**: Content available in English, Simplified Chinese, Traditional Chinese, Spanish, French, and Russian
- **AI Chat Assistant**: Interactive chat interface to discuss near-death experiences and related topics
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **GitHub Pages Ready**: Easy deployment to GitHub Pages
- **OpenAI Integration**: Leverages OpenAI's API for intelligent responses

## Project Structure

```
ndechat/
├── index.html          # Main HTML file
├── styles.css          # Main CSS styles
├── js/
│   ├── translations.js    # Multilingual content
│   ├── language-switcher.js  # Language switching functionality
│   ├── chat.js          # AI chat implementation
│   └── main.js          # General site functionality
├── README.md          # This file
└── .gitignore        # Git ignore file
```

## Getting Started

### Local Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/ndechat.git
   cd ndechat
   ```

2. Open `index.html` in your browser or use a local server:
   ```
   python -m http.server
   ```

3. Access at `http://localhost:8000`

### Adding OpenAI API Integration

The AI chat functionality is designed to work with OpenAI's API. To implement it:

1. Sign up for an [OpenAI API key](https://platform.openai.com/)

2. Create a configuration file (not included in the public repository):
   ```javascript
   // js/config.js
   const CONFIG = {
     OPENAI_API_KEY: 'your-api-key-here'
   };
   ```

3. Modify the `chat.js` file to use your API key:
   ```javascript
   // Uncomment and use the actual API call
   this.apiKey = CONFIG.OPENAI_API_KEY;
   ```

4. For security in production, use environment variables or a server-side proxy instead of exposing your API key in client-side code.

### Deployment to GitHub Pages

1. Create a GitHub repository for your project

2. Push your code to the repository:
   ```
   git remote add origin https://github.com/yourusername/ndechat.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select branch "main" and folder "/" (root)
   - Save

4. Your site will be published at `https://yourusername.github.io/ndechat/`

## Customization

### Adding More Languages

To add support for additional languages:

1. Add the language entry to `translations.js`
2. Add the language option to the dropdown in `index.html`

### Modifying AI Behavior

The AI assistant's behavior can be customized by:

1. Editing the system prompt in `formatMessagesForAPI()` function in `chat.js`
2. Adjusting the OpenAI API parameters (temperature, max_tokens, etc.)

## Security Considerations

- Do not include API keys in client-side code for production
- Use a server-side proxy or serverless functions to secure API calls
- Consider implementing rate limiting for the chat feature

## License

[MIT License](LICENSE)

## Acknowledgements

- OpenAI for the ChatGPT API
- Font Awesome for icons
- Google Fonts for typography "# ndechat" 
