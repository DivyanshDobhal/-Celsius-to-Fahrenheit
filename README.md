# Celsius Converter

A small Expo app that converts Celsius temperatures to Fahrenheit on Android and iOS.

## Run the app

Install dependencies with `npm install`, then start Expo:

```bash
npm start
```

Scan the QR code with Expo Go, or launch a simulator with:

```bash
npm run android
npm run ios
```

Enter a Celsius value and tap **Convert to Fahrenheit**. Negative and decimal
temperatures are supported.

## Deploy to Vercel

The web version is a static Expo export. `vercel.json` configures Vercel to run
`npm run build` and serve the generated `dist` directory.
