# pi-antigravity-auth

Pi Coding Agent provider extension for Google Antigravity OAuth models, plus Gemini CLI quota routing and multi-account rotation.

> **Warning**
>
> This project uses Google OAuth credentials and local account tokens. It may affect provider quotas, account standing, or ToS compliance. Use at your own risk.

## What you get

- Google OAuth sign-in with automatic token refresh
- Dual quota system:
  - Antigravity quota
  - Gemini CLI quota (Gemini-only)
- Multi-account rotation
- Real-time SSE streaming with tool calls and thinking blocks
- Variant-style thinking control
- Automatic import from `opencode-antigravity-auth`
- Native Pi provider integration

## Installation

### For humans

```bash
pi install git:github.com/WindowsRefundDay/pi-antigravity-auth
```

Then reload Pi:

```text
/reload
```

### For an AI agent

Paste this into an agent:

```text
Install pi-antigravity-auth from GitHub, enable the antigravity provider, and keep the existing README structure and config documentation consistent with the upstream Antigravity auth project.
```

## Models

List models:

```bash
pi --list-models antigravity
```

Common models matching the Antigravity picker:

```bash
pi --provider antigravity --model gemini-3.1-pro-high
pi --provider antigravity --model gemini-3.1-pro-low
pi --provider antigravity --model gemini-3-flash
pi --provider antigravity --model claude-sonnet-4-6-thinking
pi --provider antigravity --model claude-opus-4-6-thinking
pi --provider antigravity --model gpt-oss-120b-medium
```

Additional Gemini CLI preview models are also registered for the separate Gemini CLI quota.

### Available models

| Model | Notes |
|---|---|
| `gemini-3.1-pro-high` | Antigravity quota |
| `gemini-3.1-pro-low` | Antigravity quota |
| `gemini-3-flash` | Antigravity quota |
| `claude-sonnet-4-6-thinking` | Antigravity quota |
| `claude-opus-4-6-thinking` | Antigravity quota |
| `gpt-oss-120b-medium` | Antigravity quota |
| `gemini-3-pro-preview` | Gemini CLI quota |
| `gemini-3-flash-preview` | Gemini CLI quota |
| `gemini-cli-3-pro-preview` | Explicit Gemini CLI quota |
| `gemini-cli-3-flash-preview` | Explicit Gemini CLI quota |

## Model variants

Variants let you change thinking mode/level per model.

Examples:

```bash
pi --provider antigravity --model gemini-3.1-pro-high
pi --provider antigravity --model gemini-3.1-pro-low
pi --provider antigravity --model claude-opus-4-6-thinking
```

## Accounts

### Import from opencode

If you already use `opencode-antigravity-auth`:

```text
/antigravity-import-opencode
```

This copies:

```text
~/.config/opencode/antigravity-accounts.json
```

to:

```text
~/.pi/agent/antigravity-accounts.json
```

### Show accounts

```text
/antigravity-accounts
```

### Login through Pi

```text
/login antigravity
```

## Configuration

Config file:

```text
~/.pi/agent/antigravity.json
```

Default:

```json
{
  "accountSelectionStrategy": "round-robin",
  "rotateAccounts": true,
  "geminiQuota": "auto",
  "quotaFallback": true,
  "quiet": false
}
```

Show config:

```text
/antigravity-config
```

Set options:

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

### Config options

| Option | Values | Meaning |
|---|---|---|
| `accountSelectionStrategy` | `round-robin`, `random`, `sticky` | How to select accounts. |
| `rotateAccounts` | `true`, `false` | Advance the active account after a successful request. |
| `geminiQuota` | `auto`, `gemini-cli`, `antigravity` | Preferred Gemini quota family. |
| `quotaFallback` | `true`, `false` | Try the other Gemini quota if the preferred quota fails/rate-limits. |
| `quiet` | `true`, `false` | Reserved for future UI verbosity controls. |

## Enable / disable

Use Pi's package config UI:

```bash
pi config
```

Disable locally by renaming the folder:

```bash
mv ~/.pi/agent/extensions/antigravity-auth ~/.pi/agent/extensions/antigravity-auth.disabled
```

Re-enable:

```bash
mv ~/.pi/agent/extensions/antigravity-auth.disabled ~/.pi/agent/extensions/antigravity-auth
```

## Account storage

- Stored in `~/.pi/agent/antigravity-accounts.json`
- Contains OAuth refresh tokens - treat like a password
- If Google revokes a token, that account is automatically removed

## Security notes

- Do **not** commit `antigravity-accounts.json` or `antigravity.json`
- Pi extensions run with local user privileges
- Review code before installing any Pi package
- OAuth client values mirror the upstream Antigravity desktop auth flow; the sensitive part is your refresh tokens

## Troubleshoot

- If `pi --list-models antigravity` fails, run `pi config` and ensure the package is enabled.
- If an account stops working, re-auth with `/login antigravity`.
- If you imported opencode accounts, use `/antigravity-import-opencode` again after updating the source file.

## Development

```bash
git clone https://github.com/WindowsRefundDay/pi-antigravity-auth
cd pi-antigravity-auth
npm install
npm run typecheck
npm run test:list-models
npm run test:smoke
```

## Credits

This extension adapts request/response transformation logic from [`opencode-antigravity-auth`](https://github.com/NoeFabris/opencode-antigravity-auth) for Pi.

## License

MIT
