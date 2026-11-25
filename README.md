# Naksha — Map Quest (India & World)

An India map quiz game for competitive-exam map questions. It's a plain static site (HTML + JS) that needs no server, build step or API key.

## India and World

Switch between **India** and **World** on the start screen. The World map uses the Equal Earth projection with country borders, rivers and lakes; India is always drawn with the Survey of India outline.

World topics: **Countries of the World** (tap the country; 196 countries with capitals), Straits, Canals & Chokepoints; Seas, Gulfs & Lakes; Mountains, Volcanoes & Deserts; Rivers, Dams & Waterfalls; Islands & Archipelagos; and Places in the News. The Daily alternates India and World places.

Map details: coastline halos, state and country names that appear as you zoom in (hidden while a question is open), graticule with the Tropics, Equator and polar circles, and ocean labels.

## 3D globe

The whole game is played on a **3D globe** (orthographic projection with ocean shading and an atmosphere glow). The start screen shows the full Earth with India in the middle; starting a game flies in to India (states, detailed rivers and lakes, range and sea labels, the 82°30′E meridian) or anywhere in the world. Switching India ↔ World is a fly-over. Drag to spin, scroll or pinch to zoom, tap to answer; answer arcs follow great circles. The globe shows **NASA Blue Marble satellite imagery** (public domain, `earth-2k.jpg`, with `earth-4k.jpg` loaded when you zoom in) drawn with WebGL, on a dark space background, with thin white borders and white labels: 2-letter country codes when zoomed out, full names when zoomed in. Labels are placed so they never overlap. When you zoom in, sharp **Sentinel-2 cloudless** satellite tiles (10 m, © EOX, CC BY 4.0; contains modified Copernicus Sentinel data 2016) stream in for just the area on screen, and border lines fade away for a clean photo view (they stay for state/country questions). Tiles need the site to be served from its own domain (e.g. Vercel); embedded previews that block outside images keep the Blue Marble imagery. If WebGL isn't available, the globe falls back to colourful political shading. Spin has momentum, zoom follows your cursor or fingers, double-click zooms in, and tiny countries and UTs accept taps close to them. Zooming in loads full 1:50m borders (`globe-detail.js`). The 🌐 button switches to the flat maps if you prefer. The globe's libraries (`vendor/`) and data (`globe-data.js`) load just after the page opens.

## Daily 5

Every day at midnight IST there is a new set of five places, the same for everyone. One tap answers each; the last three are indirect clues. Places are worth 100, 150, 200, 250 and 300 points (1,000 for a perfect day). The result shows a row of coloured squares you can share, and the start screen keeps your daily streak.

## Sharing, challenges and the app

- **Share result card**: after the Daily (or any practice game) the game draws a 1080×1350 result image with your score, coloured squares and streak. On phones it opens the share menu (WhatsApp, Telegram, Instagram…); elsewhere it shows the image to download plus text to copy.
- **Challenge a friend**: after a practice game, *Challenge a friend* shares a link that replays exactly the same places with the same mode and level. When the friend finishes they see *You vs Friend* and can send a challenge back. Nothing is stored on a server; the places and score are in the link.
- **Install as an app**: the site is a PWA (`manifest.webmanifest`, `sw.js`, icons). *Install app* adds it to the home screen, and it works offline after the first visit.
- **Daily reminder**: *Daily reminder* adds a repeating calendar event at the time you pick. On Android Chrome, once installed, it can also show a daily notification (the browser chooses the exact time).

These need the game to be served from your own site (e.g. Vercel); inside an embedded preview, sharing and installing are blocked and the game falls back to showing the image and copy buttons.

## Sound and animation

After you tap, a dashed flight path draws from your pin to the real place with a running km counter, then the answer marker pops in and your points count up. Sound effects are generated in the browser (no audio files); use the 🔊 button in the header to mute them.

## Scoring

Points depend on how far off you are. Each round is worth 1,000, and you lose **1 point for every km** of error (2 per km on Tough, so 500 km off scores 0). Within 5 km you get full points. For a wrong state, the error is measured from your tap to the nearest edge of the right state; in Spot it, a wrong choice is scored by its distance from the answer. In the Daily the five rounds are worth 100–300, and the loss per km scales the same way (0.1 points per km on a 100-point round). The result card shows the working, e.g. *Error: 242 km. At 1 point per km: 1,000 − 242 = 758.*

## How a practice round works

The map fills the screen. A question card at the top shows the place and a countdown (30 s, 15 s or off). Drop a pin (or pick a state), adjust it if you like, then press **Confirm** (or Enter). The result sheet shows the line from your pin to the answer, the distance, a points bar and the key fact. After the last round a summary card shows your score, stars and a review of every place.

## Modes

- **Clue hunt**: indirect, exam-style questions. You get a clue (for example *"The world's only floating national park…"*) instead of the name, and pin the place it describes.
- **Level: Tough**: stricter distance scoring, no hints, and in Spot it the four choices are the nearest look-alike places from the same topic.

- **Pin it**: a place is named; tap where it is on India's map. Points fall with distance (1,000 within 15 km).
- **Spot it**: a place is marked (or a state shaded); choose its name from four options.
- **Revise**: every place in a topic shown on the map, with search and the key fact for each.

Topics (447 places + 34 States/UTs): national parks & tiger reserves; lakes, wetlands & Ramsar sites; mountain passes & peaks; rivers, dams & waterfalls; history, art & culture; ports, islands, straits & space; minerals, energy & industry; States & UTs.

Places you miss are saved in your browser under **My weak spots** and leave the list once you get them right. The Tropic of Cancer and the 82°30′E standard meridian are drawn as guide lines.

## Run it

Open `index.html` through any static server, for example:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Put it online with Vercel

1. Go to https://vercel.com/new and sign in with GitHub.
2. Import this repository and click **Deploy** (no settings needed).
3. Your game is live at the link Vercel shows, e.g. `https://naksha-map-quest.vercel.app` (Vercel names it after the repository).

## Files

- `places.js` — the question bank. Add a place as `[name, lat, lon, state, fact]`.
- `world-data.js` — world countries, rivers and lakes from [Natural Earth](https://www.naturalearthdata.com/) (public domain), projected to Equal Earth; India replaced by the DataMeet outline.
- `globe-data.js` — TopoJSON (lon/lat) for the globe: world countries (two detail levels: low while spinning, high when still), India's states, India's detailed rivers and lakes, world rivers and lakes.
- `earth-2k.jpg`, `earth-4k.jpg` — NASA Blue Marble satellite imagery (public domain; NASA Visible Earth).
- `vendor/` — d3-array, d3-geo and topojson-client (ISC licence).
- `world-places.js` — the world question bank and the capitals/facts for the countries quiz.
- `map-extra.js` — neighbouring countries, rivers and lakes from [Natural Earth](https://www.naturalearthdata.com/) (public domain), simplified.
- `map-data.js` — simplified state outlines from the [DataMeet India community maps](https://github.com/datameet/maps) (CC BY 4.0), following the Survey of India outline. Jammu & Kashmir and Ladakh are drawn as one shape (the source predates 2019).
- `index.html` — the game: map drawing, pan/zoom, scoring and all three modes.

Locations are approximate (accurate to a few km). Verify facts against standard sources before relying on them.
