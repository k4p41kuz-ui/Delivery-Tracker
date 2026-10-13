# DriveTrack

Phone-friendly web app for customer records, destination coordinates and driving trip logging.

## Files
- `index.html` — app screens
- `styles.css` — phone-friendly layout
- `app.js` — customer management, CSV import/export, GPS tracking, destination matching, distance/time and trip history
- `manifest.json`, `sw.js` — installable/offline shell support

## Run / deploy
Deploy these files as a static site using HTTPS (for example, GitHub Pages or a static hosting service). GPS geolocation requires HTTPS (localhost is also allowed for local development). Open the deployed HTTPS address on your phone and allow location access.

## CSV import format
Required columns: `Name`, `Address`
Optional columns: `Phone`, `Notes`, `Latitude`, `Longitude`

Example:
`Name,Address,Phone,Notes,Latitude,Longitude`

## Important limitations
- Customer and trip data are stored in browser local storage on this device/browser. They are not synced to other devices. Export CSV regularly for backup.
- GPS tracking is designed for while the page remains open. Mobile browsers may pause location updates in the background or when the screen locks.
- Distance is estimated by summing accepted GPS point-to-point distances and may differ from odometer or road distance.
- Destination matching requires latitude/longitude to be saved for the customer. It flags the nearest customer within about 100 m as a possible arrival; confirm stops manually.
- Route history stores GPS points; the simple route viewer opens a map at a recorded point rather than drawing the complete route line.
