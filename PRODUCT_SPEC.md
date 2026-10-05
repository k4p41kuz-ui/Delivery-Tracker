# Drive & Deliver v2 — product specification

## Main workflow
1. Driver parks and taps Start Drive.
2. App records GPS in the background.
3. At each stop, driver taps Add Delivery.
4. App captures the current GPS position and reverse-geocodes it into an address.
5. Driver can mark the delivery complete.
6. Finish Drive stops tracking and saves the trip.
7. History shows daily/weekly/monthly mileage and delivery counts.
8. Export produces CSV for mileage records.

## Delivery record
- Delivery number
- Timestamp
- Latitude/longitude
- Reverse-geocoded address
- Distance from previous delivery
- Completed/skipped status

## Trip report
- Date
- Start/end time
- Total kilometres
- Total driving time
- Delivery count
- Average km per delivery
- Route points

## Safety/product rule
The driver should not be required to type while moving. Address editing and report actions should be done while parked.
