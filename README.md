# Vedar MCP examples — Kamchatka travel for AI agents

**Vedar (Ведар, [vedarai.ru](https://vedarai.ru))** is a travel platform for Kamchatka, Russia. It exposes a public MCP server at `https://vedarai.ru/api/mcp` (Streamable HTTP, no auth, IP rate-limited) and an A2A interface: operator tours with live availability, safety status of places and routes (volcanoes, earthquakes, weather and MChS alerts), stays, gear, transfers, car rental, weather and trip plans. Write tools only create requests that a human confirms; there are no online payments.

**Ведар** — туристическая платформа Камчатки. Открытый MCP-сервер `https://vedarai.ru/api/mcp` (без авторизации) и интерфейс A2A: туры местных операторов с реальной занятостью, безопасность мест и маршрутов, жильё, снаряжение, трансферы, прокат машин, погода, план поездки. Инструменты записи только создают заявки, которые подтверждает человек. Экстренный номер на Камчатке: 112.

Manifest: [/.well-known/mcp.json](https://vedarai.ru/.well-known/mcp.json) · Docs: [vedarai.ru/mcp](https://vedarai.ru/mcp)

## Connect / Подключение

| Client | How |
|---|---|
| Cursor | [One-click install](cursor://anysphere.cursor-deeplink/mcp/install?name=vedar&config=eyJ1cmwiOiJodHRwczovL3ZlZGFyYWkucnUvYXBpL21jcCJ9) |
| VS Code | [One-click install](vscode:mcp/install?%7B%22name%22%3A%22vedar%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fvedarai.ru%2Fapi%2Fmcp%22%7D) (`code --add-mcp '{"name":"vedar","type":"http","url":"https://vedarai.ru/api/mcp"}'`) |
| Claude.ai | Customize → Connectors → Add custom connector → URL `https://vedarai.ru/api/mcp` → No sign-in |
| Claude Code | `claude mcp add --transport http vedar https://vedarai.ru/api/mcp` |
| ChatGPT | Plugins → + → Add custom MCP server → `https://vedarai.ru/api/mcp` → No authentication (legacy: Settings → Apps → Create) |
| Smithery | `npx -y smithery mcp add tourhabk/vedar` |

Generic JSON config: see [`mcp.json`](mcp.json).

## Tools (live `tools/list`, 25 tools)

| Tool | Kind | What it does |
|---|---|---|
| `get_tours` | read | Use when the user asks about Kamchatka (Russia) tours: operator tours with prices and dates; live availability via get_t |
| `get_tour_details` | read | One Kamchatka tour in depth: program, what is included, what to bring, safety notes |
| `get_guardian_context` | read | Kamchatka safety context for a place or route: hazards, active alerts, advice |
| `get_place_info` | read | Kamchatka place facts only: what it is, type, coordinates |
| `get_weather` | read | Daily weather forecast (Open-Meteo) for a Kamchatka place by name, or for any point by latitude/longitude |
| `get_volcano_status` | read | Use when the user asks about Kamchatka volcano activity: KVERT aviation code and KB GS RAS seismicity |
| `search_accommodations` | read | Use when the user asks about hotels or accommodation in Kamchatka, Russia: stays from platform partners |
| `search_transfers` | read | Use when the user asks about Kamchatka transfers: whole-vehicle charters (vakhtovka, minibus, jeep), price per vehicle b |
| `search_car_rental` | read | Use when the user wants to rent a car, SUV, 4x4 or minibus in Kamchatka (car rental, car hire): self-drive, price per da |
| `search_gear` | read | Gear rental in Kamchatka from platform partners |
| `safety_status` | read | Kamchatka regional safety status: active alerts (seismic, volcanic, weather, MChS) with their source and dates, plus ele |
| `make_trip_plan` | read | Day-by-day Kamchatka trip plan with live availability and season warnings; returns a plan ID for edit_trip_plan; no forecast, use get_weather |
| `edit_trip_plan` | edits own plan | Edit a Kamchatka trip plan from make_trip_plan by its ID: add, remove or move a day, change lodging level, or apply a fl |
| `get_tour_availability` | read | Use when the user asks if a Kamchatka tour has free seats: live availability by date, free seats and nearest open dates |
| `compare_tours` | read | Side-by-side facts for 2-4 Kamchatka tours on what the user cares about: price or group total, duration, dates, inclusions, cancellation, pickup, operator; no ranking |
| `search` | read | Keyword search across Vedar Kamchatka: operator tours, places, stays, routes; returns up to 10 results with id for fetch |
| `fetch` | read | Full text of one Vedar Kamchatka record by id from search (tour, place, stay, route): description, price, program, safet |
| `get_request_status` | read | Kamchatka request status by key from create_lead, create_booking_request, create_stay_request, request_charter, create_car_rental_request, create_trip_request; no client name or phone |
| `change_request` | cancels or moves a request | Cancel a Kamchatka tour request or move it to another date by its status key, only when the person asks: done at once before the operator answers, sent to the operator as a request after |
| `create_lead` | write (human-confirmed) | Tour-selection request for Kamchatka when no tour or date is chosen yet; human-confirmed by a manager, no payment |
| `create_booking_request` | write (human-confirmed) | Use when the user wants to book a Kamchatka tour on a date: live availability checked first, human-confirmed by the oper |
| `create_stay_request` | write (human-confirmed) | Kamchatka stay request: dates and guests go to the owner, human-confirmed by the owner, no payment |
| `request_charter` | write (human-confirmed) | Whole-vehicle (vakhtovka, minibus) request to a Kamchatka charter carrier: destination, dates, group size; human-confirm |
| `create_car_rental_request` | write (human-confirmed) | Two-step Kamchatka self-drive car rental request: step 1 returns a draft and confirmation code; step 2 only after the person explicitly agrees |
| `create_trip_request` | write (human-confirmed) | Whole Kamchatka trip in one request: tour + stay + charter vehicle under one trip id; each partner sees the rest; human-confirmed, no payment |

## Examples (read-only tools)

- [`examples/curl.sh`](examples/curl.sh) — raw JSON-RPC
- [`examples/client.ts`](examples/client.ts) — TypeScript, official MCP SDK
- [`examples/client.py`](examples/client.py) — Python, official MCP SDK

## License
MIT
