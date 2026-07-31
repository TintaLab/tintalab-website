# TintaLab Website V1

## Quick preview
Double-click `index.html`. It opens in Chrome or any browser.

## Edit business details
Open `site-data.js` with Notepad.
Change:
- address
- phone
- email
- Facebook link
- Messenger link
- Google Maps link
- business hours
- announcement
- services and descriptions

Save the file, then refresh `index.html`.

## Replace sample images
Put your actual JPG/PNG files inside the `assets` folder.

You can either:
1. Keep the existing filenames and replace the SVG files; or
2. Change each `image:` path in the `gallery` section of `site-data.js`.

Example:
`image: "assets/my-sintra-sample.jpg"`

## Change brand colors
Open `styles.css`.
At the top, edit:
- `--orange`
- `--blue`
- `--blue-2`

## Publish free with Cloudflare Pages
1. Create a free GitHub account and repository.
2. Upload every file and the assets folder.
3. Log in to Cloudflare, open Workers & Pages, then Create Application.
4. Connect the GitHub repository.
5. Framework preset: None.
6. Build command: leave blank.
7. Output directory: `/`
8. Deploy.

You will receive a free address similar to:
`tintalab-print-hub.pages.dev`

## Important before public launch
Replace placeholder phone, email, social links, map link, prices, gallery samples, and final business hours.
