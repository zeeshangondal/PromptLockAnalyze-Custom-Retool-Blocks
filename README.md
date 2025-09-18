# PromptLock – Retool Custom Component

## API Key

You can acquire the API key from [https://promptlock.io/](https://promptlock.io/).  
This key is required to authenticate with the `/v1/analyze` API and must be provided in the `API_Key` field when configuring the custom node.

## Overview

A Retool Custom Component that sends a prompt to the PromptLock `/v1/analyze` API and displays:

* **Redacted Prompt**
* **Risk Score**
* **Violations**

These values are also exposed to your Retool app, so you can reference them anywhere (e.g. `{{ myBlockId.redacted_prompt }}`).

---

## Features

* Drag-and-drop custom block in Retool
* Inputs: **API Key**, **Prompt**, **Compliance Frameworks**, **Action on High Risk**
* Outputs: **redacted\_prompt**, **risk\_score**, **violations**
* Easy dev & deploy via `retool-ccl`

---

## Prerequisites

* Retool org (Cloud or self-hosted) with permission to add custom components
* Your org **subdomain** (e.g. `myteam` in `myteam.retool.com`)
* **Retool API Key** (create in your Retool app → Settings)
* Node.js 18+ and npm

> You’ll provide subdomain + API key during `npx retool-ccl login`.

---

## Quick Start

1. **Clone the repo**

   ```bash
   git clone 
   cd PromptLock-custom-component
   ```

2. **Install packages**

   ```bash
   npm install
   ```

3. **Login to Retool**

   ```bash
   npx retool-ccl login
   ```

   * Enter your **subdomain**
   * Enter your **Retool API key**

4. **Initialize the library** (one-time)

   ```bash
   npx retool-ccl init
   ```

   * Provide a short **name** and **description**

5. **Run in dev**

   ```bash
   npx retool-ccl dev
   ```

   * Open your Retool app → **Custom components** → you’ll see **PromptLock**

6. **Deploy (publish)**

   ```bash
   npx retool-ccl deploy
   ```

---

## Using the Component in Retool

1. In the Retool App editor, open **Components → Custom components**.

2. Drag the **PromptLock** block onto the canvas.

3. Fill the inputs:

   * **API Key** – your PromptLock service key
   * **Prompt** – the text you want to analyze
   * **Compliance Frameworks** – see formats below
   * **Action on High Risk** – one of: `flag | redact | block | score`

4. Click **Analyze**. Results render inside the block, and are also available as Retool state.

### Referencing Outputs

Replace `myBlockId` with your block’s actual ID (select the component to see/rename it).

```handlebars
{{ myBlockId.redacted_prompt }}
{{ myBlockId.risk_score }}
{{ myBlockId.violations }}   // JSON string; JSON.parse(...) if needed
```

---

## Inputs & Options

### Compliance Frameworks

Accepts **either**:

* JSON array string (recommended):
  `["Prompt Injection"]`, `["PCI"]`, `["GDPR"]`, `["HIPAA"]`, `["PCI","GDPR"]`, `["PCI","GDPR","HIPAA"]`

Common presets:

* Prompt Injection → `Prompt Injection`
* PCI → `["PCI"]`
* GDPR → `["GDPR"]`
* HIPAA → `["HIPAA"]`
* PCI + GDPR → `["PCI","GDPR"]`
* All → `All`

### Action on High Risk

One of: `flag`, `redact`, `block`, `score`.

---

## Troubleshooting

**“Unused field … in component …” warnings**

* Safe to ignore. They’re lints from the manifest generator when a state isn’t bound to visible props.

**401/403 or CORS from the API**

* Verify the **API Key** and endpoint accessibility from Retool.
* Check org/network rules and any IP allowlists.

**Custom block not showing**

* Ensure `npx retool-ccl dev` is running (for dev) or you’ve run `npx retool-ccl deploy` (for a published version).
* Refresh the Retool editor and confirm you’re on the correct org/subdomain.

---

## Scripts

```bash
# Install dependencies
npm install

# Login to your Retool org
npx retool-ccl login

# One-time init (name/description)
npx retool-ccl init

# Start dev mode (hot reload)
npx retool-ccl dev

# Deploy a version
npx retool-ccl deploy
```

---

## Notes

* Outputs are shown inside the block **and** exposed as Retool state for use in queries, tables, text, etc.
* You can bind the component’s inputs to other Retool components or queries for a fully dynamic workflow.

---
