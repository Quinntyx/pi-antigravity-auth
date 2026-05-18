# pi-antigravity-auth

Pi Coding Agent provider extension for Google Antigravity OAuth models, including Gemini CLI quota routing and multi-account rotation.

This package ports the useful parts of `opencode-antigravity-auth` into a native Pi extension/provider.

## Features

- Adds a `antigravity` provider to Pi.
- Uses Google OAuth refresh tokens from `~/.pi/agent/antigravity-accounts.json`.
- Imports existing `opencode-antigravity-auth` account pools.
- Rotates accounts per request/turn.
- Supports selection strategies: `round-robin`, `random`, `sticky`.
- Supports both Gemini quota families:
  - Antigravity quota
  - Gemini CLI quota (separate quota; Gemini models only)
- Can fallback between Gemini CLI and Antigravity quotas.
- Supports Antigravity Claude models observed in current logs:
  - `claude-sonnet-4-6`
  - `claude-opus-4-6-thinking`
- Supports Gemini 3 models and Gemini CLI preview names.
- Registers Pi slash commands for account/config management.

## Install

From GitHub:

```bash
pi install git:github.com/WindowsRefundDay/pi-antigravity-auth
```

Or test without installing:

```bash
pi --no-extensions -e git:github.com/WindowsRefundDay/pi-antigravity-auth --list-models antigravity
```

After installing, restart Pi or run:

```text
/reload
```

## Models

List models:

```bash
pi --list-models antigravity
```

Common models:

```bash
pi --provider antigravity --model claude-sonnet-4-6
pi --provider antigravity --model claude-opus-4-6-thinking-high
pi --provider antigravity --model gemini-3-flash
pi --provider antigravity --model gemini-3-pro
pi --provider antigravity --model gemini-3-flash-preview
pi --provider antigravity --model gemini-cli-3-flash-preview
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

The account file is gitignored automatically.

### Show accounts

```text
/antigravity-accounts
```

This prints emails only plus active rotation/config state.

### Login through Pi

The provider also appears in Pi's login flow:

```text
/login antigravity
```

Complete the browser OAuth flow, then paste the redirect URL or code when prompted.

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
| `geminiQuota` | `auto`, `gemini-cli`, `antigravity` | Preferred Gemini quota family. Claude always uses Antigravity. |
| `quotaFallback` | `true`, `false` | Try the other Gemini quota if the preferred quota fails/rate-limits. |
| `quiet` | `true`, `false` | Reserved for future UI verbosity controls. |

## Enable / disable

Use Pi's package config UI:

```bash
pi config
```

Or temporarily start Pi without extensions:

```bash
pi --no-extensions
```

Or test only this package:

```bash
pi --no-extensions -e git:github.com/WindowsRefundDay/pi-antigravity-auth
```

## Security notes

- This package reads/writes OAuth account data under `~/.pi/agent/`.
- Do **not** commit `antigravity-accounts.json` or `antigravity.json`.
- Pi extensions run with local user privileges. Review code before installing any Pi package.
- The Google OAuth client ID/secret used here are public desktop/installed-app credentials mirrored from the upstream Antigravity auth flow; user refresh tokens are the sensitive material and are stored only locally.

## Development

```bash
git clone https://github.com/WindowsRefundDay/pi-antigravity-auth
cd pi-antigravity-auth
npm install
npm run typecheck
npm run test:list-models
```

Smoke test with your local account file:

```bash
npm run test:smoke
```

## Credits

This extension depends on request/response transformation logic from [`opencode-antigravity-auth`](https://github.com/NoeFabris/opencode-antigravity-auth) and adapts it for Pi's provider API.

## License

MIT
