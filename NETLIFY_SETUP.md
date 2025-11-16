# Netlify Analytics Setup

## Environment Variables Configuration

To enable real visitor statistics from Netlify Analytics, you need to set the following environment variables in your Netlify dashboard:

### Steps:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

   - **Variable name**: `NETLIFY_AUTH_TOKEN`
     - **Value**: `nfp_zgytc8FhKudgbeGeJK7CQZTQhzrWMqPH77c8`
     - **Scopes**: All scopes (Build, Deploy, Functions)

   - **Variable name**: `NETLIFY_SITE_ID`
     - **Value**: `0b59a2a9-3146-4a04-a8fb-011e8accbf8d`
     - **Scopes**: All scopes (Build, Deploy, Functions)

4. Save the variables
5. Redeploy your site for the changes to take effect

### Security Notes:

- ✅ These credentials are stored securely in Netlify's encrypted environment variable system
- ✅ They are never exposed in the client-side code
- ✅ They are only accessible in serverless functions
- ✅ The `.env` file is in `.gitignore` to prevent accidental commits

### Local Development:

For local development, create a `.env` file in the root directory (this file is gitignored):

```
NETLIFY_AUTH_TOKEN=nfp_zgytc8FhKudgbeGeJK7CQZTQhzrWMqPH77c8
NETLIFY_SITE_ID=0b59a2a9-3146-4a04-a8fb-011e8accbf8d
```

**Important**: Never commit the `.env` file to git!

