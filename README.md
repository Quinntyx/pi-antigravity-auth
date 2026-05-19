# pi-antigravity-auth

Pi Coding Agent provider extension for Google Antigravity OAuth models, plus Gemini CLI quota routing and multi-account rotation.

> **Warning**
>
> This project uses Google OAuth credentials and local account tokens. It may affect provider quotas, account standing, or ToS compliance. Use at your own risk.
>
> **Deprecation Notice**
>
> Following Google's official announcement transitioning from Gemini CLI to Antigravity CLI, the classic Gemini CLI and its separate quota are expected to be discontinued or restricted to enterprise customers via paid platform APIs. Consequently, the separate Gemini CLI quota models may become completely unsupported or cease to function in future releases. We highly recommend migrating your active workflows to the main Antigravity quota models.

## What you get

- **Google OAuth sign-in** with automatic token refresh
- **Dual quota system** (Antigravity quota and Gemini CLI fallback quota)
- **Auto Quota**: Intelligent automatic load balancing and fallback between Antigravity and Gemini CLI quota pools
- **Multi-account rotation**
- **Real-time SSE streaming** with tool calls and thinking blocks
- **Variant-style thinking control**
- **Automatic import** from `opencode-antigravity-auth`
- **Native Pi provider integration**

---

## Getting Started

### 1. Installation

#### Agent install

Copy and paste the text block below directly into your Pi chat. The Pi coding agent will automatically download and install the extension, then show you the commands to authenticate:

```text
Please install the `pi-antigravity-auth` extension. Run the following command in the terminal to download and install it:

pi install git:github.com/WindowsRefundDay/pi-antigravity-auth

After the installation command finishes successfully, tell me to run these commands in the chat to complete the authentication:
1. `/reload` (to reload the environment and load the new extension)
2. `/login antigravity` (to authenticate via Google OAuth)
```

<!--
🤖 AGENT INSTRUCTIONS:
You are an AI assistant helping the user install the `pi-antigravity-auth` extension for their Pi environment.
Follow these steps strictly:

1. **INSTALLATION**: Run the following terminal command to install the extension from GitHub:
   `pi install git:github.com/WindowsRefundDay/pi-antigravity-auth`

2. **USER HANDOFF**: Because you cannot execute interactive slash commands or complete browser OAuth flows yourself, you MUST stop here. In your final response, explicitly instruct the user to run the following two commands in their chat/terminal to complete setup:
   - Type `/reload` to restart the Pi environment.
   - Type `/login antigravity` to open the Google OAuth browser window and authenticate.

Do not attempt to run the slash commands yourself. Provide them as text for the user to run.
-->

#### Normal install
Run the installation command in your terminal:
```bash
pi install git:github.com/WindowsRefundDay/pi-antigravity-auth
```
Then restart your Pi environment:
```text
/reload
```

### 2. Authentication

Authenticate your Google account by typing this slash command in Pi:
```text
/login antigravity
```
*Note: If Google revokes a token, that account is automatically removed from your local storage.*

---

## Models & Variants

List registered models:
```bash
pi --list-models antigravity
```

### Available Models

| Model | Notes |
|---|---|
| `gemini-3.5-pro-high` | Antigravity quota |
| `gemini-3.5-pro-low` | Antigravity quota |
| `gemini-3.5-flash` | Antigravity quota |
| `claude-sonnet-4-6-thinking` | Antigravity quota |
| `claude-opus-4-6-thinking` | Antigravity quota |
| `gpt-oss-120b-medium` | Antigravity quota |
| `gemini-3.5-pro-preview` | Gemini CLI quota |
| `gemini-3.5-flash-preview` | Gemini CLI quota |
| `gemini-cli-3.5-pro-preview` | Gemini CLI quota |
| `gemini-cli-3.5-flash-preview` | Gemini CLI quota |

### Model Variants
Variants let you change thinking mode/level per model.
```bash
pi --provider antigravity --model gemini-3.5-pro-high
pi --provider antigravity --model gemini-3.5-pro-low
pi --provider antigravity --model claude-opus-4-6-thinking
```

---

## Configuration & Usage

All configuration settings are saved in:
```text
~/.pi/agent/antigravity.json
```

### Configuration Commands

- **Show Config**: Show active settings.
  ```text
  /antigravity-config
  ```
- **Set Options**: Set specific configuration parameters.
  ```text
  /antigravity-config accountSelectionStrategy=round-robin
  /antigravity-config accountSelectionStrategy=random
  /antigravity-config accountSelectionStrategy=sticky
  /antigravity-config rotateAccounts=true
  /antigravity-config geminiQuota=auto
  /antigravity-config geminiQuota=gemini-cli
  /antigravity-config geminiQuota=antigravity
  /antigravity-config quotaFallback=true
  ```

### Configuration Options

The extension supports fine-tuned control over account cycling and quota fallback behavior. Below is a detailed breakdown of all available settings:

| Option | Type / Values | Default | Description & Details |
| :--- | :--- | :--- | :--- |
| `accountSelectionStrategy` | `round-robin`, `random`, `sticky` | `round-robin` | Controls how the active account is selected from the authenticated pool.<br/><br/>**Behavior:**<br/>• `round-robin` *(Recommended)*: Cycles sequentially through all active accounts to evenly distribute load and help maximize overall token/request limits.<br/>• `random`: Dynamically chooses an account at random for each request.<br/>• `sticky`: Continues using the last successfully used account for consecutive requests, minimizing frequent account hops. |
| `rotateAccounts` | `true`, `false` | `true` | Controls whether the active account pointer advances after a successful operation.<br/><br/>**Behavior:**<br/>• `true`: Once a request succeeds, the active pointer shifts, ensuring the next request uses the next account according to the selection strategy.<br/>• `false`: The current account remains active indefinitely until it encounters a failure or rate limit, at which point rotation logic takes over. |
| `geminiQuota` | `auto`, `antigravity`, `gemini-cli` | `auto` | Specifies the preferred Google quota family to route requests through.<br/><br/>**Behavior:**<br/>• `auto`: Routes dynamically. Standard models default to the main `antigravity` enterprise quota pool, while models with `-preview` or `gemini-cli-` prefixes default to the legacy `gemini-cli` quota pool.<br/>• `antigravity`: Prioritizes the newer enterprise Google Antigravity quota pool.<br/>• `gemini-cli`: Prioritizes the legacy separate Gemini CLI quota pool. |
| `quotaFallback` | `true`, `false` | `true` | Enables intelligent high-availability failover across quota families.<br/><br/>**Behavior:**<br/>• `true`: If a request to the preferred quota family fails (e.g., rate limits, 429 status codes, server errors), the extension instantly retries using the secondary quota family before returning an error.<br/>• `false`: Disables cross-quota fallback; failures on the preferred family are returned immediately. |
| `quiet` | `true`, `false` | `false` | Controls CLI output and developer verbosity.<br/><br/>**Behavior:**<br/>• `true`: Silences additional status print statements and startup notices.<br/>• `false`: Displays real-time diagnostic prints and critical notices (such as the Gemini CLI deprecation warning). |


### Account Operations

- **Import from Opencode**: Copies `~/.config/opencode/antigravity-accounts.json` to `~/.pi/agent/antigravity-accounts.json` if you already use `opencode-antigravity-auth`.
  ```text
  /antigravity-import-opencode
  ```
- **Show Accounts**: List active imported accounts (emails only).
  ```text
  /antigravity-accounts
  ```

### Enable / Disable Extension
- **Via UI**: Use Pi's package configuration interface:
  ```bash
  pi config
  ```
- **Via Terminal (Disable)**: Rename the active extension folder:
  ```bash
  mv ~/.pi/agent/extensions/antigravity-auth ~/.pi/agent/extensions/antigravity-auth.disabled
  ```
- **Via Terminal (Enable)**: Rename back:
  ```bash
  mv ~/.pi/agent/extensions/antigravity-auth.disabled ~/.pi/agent/extensions/antigravity-auth
  ```

---

## Troubleshooting

- If `pi --list-models antigravity` fails, run `pi config` and ensure the package is enabled.
- If an account stops working, re-authenticate with `/login antigravity`.
- If you imported opencode accounts, use `/antigravity-import-opencode` again after updating the source file.

---

## Development

```bash
git clone https://github.com/WindowsRefundDay/pi-antigravity-auth
cd pi-antigravity-auth
npm install
npm run typecheck
npm run test:list-models
npm run test:smoke
```

---

## Credits & License

- **Credits**: This extension adapts request/response transformation logic from [`opencode-antigravity-auth`](https://github.com/NoeFabris/opencode-antigravity-auth) for Pi.
- **License**: MIT
