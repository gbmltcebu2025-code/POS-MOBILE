# SwiftPOS

A point-of-sale and inventory app: scan or search products, build a cart, check out, track stock, and review sales history. Runs entirely on-device — no backend, no account server, no internet connection required after install. All data (products, sales, your login) is stored locally in the app.

## Run it in a browser (development)

```bash
npm install
npm run dev
```

## Build the web app

```bash
npm run build
```
Output goes to `dist/`.

## Build an Android APK

This project is wired up for [Capacitor](https://capacitorjs.com), which wraps the built web app into a native Android shell.

### Option A — Let GitHub build it for you (no local installs)
1. Push this project to a new GitHub repository (you can drag-and-drop the files in the GitHub web UI — no `git` required).
2. GitHub Actions will automatically run `.github/workflows/build-apk.yml`, which builds the app and compiles a debug APK.
3. Once the workflow finishes (Actions tab → latest run), download the `SwiftPOS-debug-apk` artifact and install it on your Android device (enable "Install unknown apps" for your file manager/browser first).

### Option B — Build locally with Android Studio
```bash
npm install
npm run build
npx cap add android      # first time only
npx cap sync android
npx cap open android     # opens Android Studio
```
In Android Studio: **Build → Build Bundle(s)/APK(s) → Build APK(s)**. The APK will be under `android/app/build/outputs/apk/`.

To make a release (signed, installable outside developer mode) APK instead of a debug one, use Android Studio's **Build → Generate Signed Bundle / APK** flow, or add a signing config and run `./gradlew assembleRelease` inside `android/`.

## Notes on data & accounts

- The first account you register on a device becomes the admin.
- All products, sales, and accounts are stored in the app's local storage on that device only — nothing syncs between devices or to a server. If you clear app data/uninstall, that data is gone.
- There's no email service, so "forgot password" works entirely on-device (matches the account, then lets you set a new password) rather than emailing a link.
