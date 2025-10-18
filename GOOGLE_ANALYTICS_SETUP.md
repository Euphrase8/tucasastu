# Google Analytics Integration Setup Guide

This guide will help you set up Google Analytics integration for the TUCASA STU admin dashboard.

## Prerequisites

- Google Account with access to Google Analytics
- Google Cloud Platform account
- Admin access to your Google Analytics 4 property

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "TUCASA Analytics")
4. Note down your Project ID

## Step 2: Enable Google Analytics Reporting API

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Analytics Reporting API"
3. Click on it and press "Enable"
4. Also enable "Google Analytics Data API" for GA4 support

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `analytics-service`
   - Description: `Service account for TUCASA analytics integration`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Choose "JSON" format
6. Download the JSON file and keep it secure

## Step 5: Share Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to "Admin" (gear icon in bottom left)
4. Under "Property", click "Property Access Management"
5. Click the "+" button to add a user
6. Enter the service account email from your JSON file
7. Give it "Viewer" permissions
8. Click "Add"

## Step 6: Get Your Property ID

1. In Google Analytics, go to "Admin"
2. Under "Property", click "Property Settings"
3. Copy your "Property ID" (format: 123456789)

## Step 7: Configure Environment Variables

Open your `.env` file and add the following values from your service account JSON file:

```env
# Your Google Analytics 4 Property ID
VITE_GA_PROPERTY_ID=123456789

# Service Account Email (from JSON file)
VITE_GA_CLIENT_EMAIL=analytics-service@your-project.iam.gserviceaccount.com

# Service Account Private Key (from JSON file - keep the quotes and newlines)
VITE_GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Google Cloud Project ID (from JSON file)
VITE_GA_PROJECT_ID=your-google-cloud-project-id
```

### Important Notes:

- **Private Key**: Copy the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines
- **Newlines**: Keep the `\n` characters in the private key
- **Quotes**: Wrap the private key in double quotes
- **Security**: Never commit your `.env` file to version control

## Step 8: Restart Your Application

After configuring the environment variables:

1. Stop your development server
2. Run `npm run dev` to restart
3. Navigate to the admin dashboard
4. You should now see analytics data

## Features Available

Once configured, you'll have access to:

### Main Dashboard
- Real-time active users
- 30-day page views, users, and sessions
- Quick analytics overview

### Analytics Dashboard (`/admin/analytics`)
- **Overview**: Page views over time with area charts
- **Top Pages**: Most popular pages with view counts
- **Audience**: Geographic distribution and top countries
- **Devices**: Device categories, operating systems, and browsers
- **Traffic Sources**: Where your visitors come from

### Real-time Data
- Current active users
- Live visitor locations
- Device breakdown of active users

### Historical Data
- Customizable date ranges (7, 30, 90 days, 1 year)
- Page view trends
- User engagement metrics
- Session duration and bounce rates

## Troubleshooting

### Common Issues

1. **"Analytics not configured" message**
   - Check that all environment variables are set correctly
   - Ensure the service account has access to your GA property

2. **"Failed to fetch analytics data" error**
   - Verify your Property ID is correct
   - Check that the Google Analytics Data API is enabled
   - Ensure your service account has "Viewer" permissions

3. **Private key errors**
   - Make sure the private key includes the full header and footer
   - Check that newlines (`\n`) are preserved
   - Verify the key is wrapped in double quotes

4. **No data showing**
   - Ensure your website has Google Analytics tracking code installed
   - Check that your GA4 property is receiving data
   - Verify the Property ID matches your active property

### Testing the Integration

1. Go to `/admin/analytics` in your application
2. If configured correctly, you should see:
   - Summary cards with your website metrics
   - Charts showing data trends
   - Real-time user count

### Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **Service Account**: Use minimal permissions (Viewer only)
3. **Key Rotation**: Regularly rotate your service account keys
4. **Access Control**: Limit who has access to the service account JSON file

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify all environment variables are correctly set
3. Ensure your Google Analytics property is active and receiving data
4. Test the service account permissions in Google Analytics

The analytics integration provides comprehensive insights into your website performance, helping you make data-driven decisions for the TUCASA STU platform.
