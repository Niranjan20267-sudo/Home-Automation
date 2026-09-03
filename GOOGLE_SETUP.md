# Google Sign-In Setup Guide

The Google Sign-In button has been integrated into your Smart Home login form. Follow these steps to enable it:

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "SmartHome")
3. Enable the "Google+ API"

## Step 2: Create OAuth 2.0 Credentials

1. Go to **Credentials** in the left menu
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Select **Web application**
4. Add authorized origins:
   - `http://localhost:5173` (for local development)
   - `http://localhost:3000` (if using different port)
   - Your production domain (e.g., `https://yourdomain.com`)

5. Add authorized redirect URIs:
   - `http://localhost:5173` (for local development)
   - Your production domain redirect URL

6. Copy the **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

## Step 3: Configure Your App

1. Open `.env` file in the root directory:

   ```
   VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
   ```

2. Replace `YOUR_CLIENT_ID_HERE` with your actual Google Client ID

3. Save the file

## Step 4: Restart Your App

```bash
npm run dev
```

## Features

✅ **Google Sign-In Button** - Beautiful, official Google button on login form
✅ **Automatic Login** - Clicking the button redirects to Google's authentication
✅ **User Data** - Automatically captures user email, name, and profile picture
✅ **JWT Decode** - Decodes the Google JWT to extract user information
✅ **Auto-Login** - On successful authentication, user is automatically logged into the dashboard

## How It Works

1. User clicks "Sign in with Google" button
2. They are redirected to Google's login page
3. After authentication, Google returns a JWT token
4. The token is decoded to get user information
5. User is automatically logged into the dashboard
6. User data (email, name, picture) is stored in the session

## Testing Without Real Google Setup

For testing purposes, you can use the regular email/password login:

- Email: `test@example.com`
- Password: `password123` (any password)

## Demo Google Client ID (Limited Use)

For quick testing, you can use this demo Client ID (limited to 1,000 requests/day):

```
YOUR_DEMO_CLIENT_ID
```

Add it to `.env`:

```
VITE_GOOGLE_CLIENT_ID=YOUR_DEMO_CLIENT_ID
```

## Troubleshooting

### "The given client ID is not found"

- Verify your Client ID is correct
- Make sure your localhost is in the authorized origins
- Check that you're using `VITE_` prefix for environment variables

### Button not appearing

- Clear browser cache and reload
- Check browser console for errors (F12)
- Verify `.env` file is saved

### Login not working

- Ensure you're using HTTPS in production (Google requires it)
- Check that the client ID matches your current domain
- Verify the callback URL is configured correctly

## Security Notes

✅ Never commit your actual Google Client ID to version control
✅ Always use environment variables for sensitive data
✅ For production, use HTTPS only
✅ Store `.env` files in `.gitignore`

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Google Login Library](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
