# Naksha — UPSC Map Quest

An India map quiz game for UPSC Prelims map questions. It's a plain static site (HTML + JS) that needs no server, build step or API key.

## Modes

- **Pin it**: a place is named; tap where it is on India's map. Points fall with distance (1,000 within 15 km).
- **Spot it**: a place is marked (or a state shaded); choose its name from four options.
- **Revise**: every place in a topic shown on the map, with search and the UPSC fact for each.

Topics (275 places + 34 States/UTs): national parks & tiger reserves; lakes, wetlands & Ramsar sites; mountain passes & peaks; rivers, dams & waterfalls; history, art & culture; ports, islands, straits & space; minerals, energy & industry; States & UTs.

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
3. Your game is live at the link Vercel shows, e.g. `https://naksha-upsc-map-quest.vercel.app`.

## Files

- `places.js` — the question bank. Add a place as `[name, lat, lon, state, fact]`.
- `map-data.js` — simplified state outlines from the [DataMeet India community maps](https://github.com/datameet/maps) (CC BY 4.0), following the Survey of India outline. Jammu & Kashmir and Ladakh are drawn as one shape (the source predates 2019).
- `index.html` — the game: map drawing, pan/zoom, scoring and all three modes.

Locations are approximate (accurate to a few km). Verify facts against standard sources before relying on them.
