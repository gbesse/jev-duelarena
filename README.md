# jev-duelarena

**Pit two pieces of your own text against visible criteria, or watch a whole bracket resolve in real request order.**

[![Tests](https://github.com/gbesse/jev-duelarena/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-duelarena/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · Zero runtime dependencies · Public alpha

This is not a model benchmark. It judges user-submitted names, headlines or taglines. Every criterion is visible; code owns the weighted tally. Progressive bracket updates correspond to completed requests, never simulated delay.

## Try it in 30 seconds

```sh
git clone https://github.com/gbesse/jev-duelarena.git && cd jev-duelarena
npm run demo
node bin/jev-duelarena.mjs duel "Ship faster" "Release calmly" --fake
```

Synthetic fixture probabilities are not Jev measurements.

## Call real Jev

```sh
export TYPESAFE_API_KEY=... # paid requests go to https://api.typesafe.ai/v1/systemone
node bin/jev-duelarena.mjs duel "Headline A" "Headline B" --pack headline
node bin/jev-duelarena.mjs estimate options.txt --pack product-name
node bin/jev-duelarena.mjs bracket options.txt --pack product-name
```

`serve --port 8793` binds on the local network and appends submissions to `local-data/duels.jsonl`; `/history` replays them. Put your own authenticated TLS tunnel in front if you expose it. Library users can import duel, bracket and history primitives. See [bracket semantics](docs/brackets.md).

## How it decides

Each match sends one `choice` question per declared criterion over `{a,b}`. The chosen side receives that criterion's visible weight; equal totals are ties. Brackets support 3–64 entries, use explicit byes without calls, bound concurrent matches, and record every breakdown. On a match tie the first entrant advances deterministically and the recorded result remains `tie`.

## Boundaries

Declared criteria are not universal quality. Defaults are illustrative, not calibrated. Jev can be affected by injected text and is weak at counting, arithmetic and indirect instructions; code handles tournament structure and totals. History is local JSONL, not a multi-user database. The server has no built-in authentication.

## Validation

`npm run check`, `npm run typecheck`, `npm test`, and `npm run demo` run in CI on Node 22 and 24. Live smoke is opt-in and capped at two paid calls.

## Related projects

[DecisionPacks](https://github.com/gbesse/decisionpacks) · [Question Forge](https://github.com/gbesse/question-forge) · [jev-rerank-server](https://github.com/gbesse/jev-rerank-server)

Independent project; not affiliated with TypeSafe AI. [TypeSafe API](https://docs.typesafe.ai/api) · [known model limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
