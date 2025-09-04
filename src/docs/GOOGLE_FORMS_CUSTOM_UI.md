# Custom Google Forms Integration

This document explains how we've implemented a custom UI for Google Forms integration.

## Overview

Instead of embedding Google Forms directly as iframes, we're now using custom HTML form fields that match the Google Form fields. This gives us:

1. Better control over styling and user experience
2. Consistent branding with the rest of the application
3. Improved performance (no iframe loading)
4. Better mobile experience

## How It Works

### 1. Setting Up Google Form Fields

When adding a Google Form in the admin panel, you need to connect your Google Form fields to our custom form fields.

#### Step 1: Create Your Google Form

-  Create a Google Form with the fields you need
-  Get the shareable link for your form

#### Step 2: Add the Form in Admin Panel

-  Add the Google Form URL in the Admin Event Details Control
-  Specify a title and description for the form
-  Set the form as active

#### Step 3: Configure Field Mappings

For each field in your Google Form, you'll need to identify the field IDs:

1. Open your Google Form
2. View the page source (right-click > View Page Source)
3. Look for `entry.XXXXXXXX` patterns in the form HTML (these are the field IDs)
4. Match these IDs with our preset field types

For example:

```
Google Form Field: "Full Name" (entry.123456789)
Our Custom Field: fullName
```

**Note:** In a production environment, you would store these field mappings in your database.

### 2. Current Implementation

Our current implementation uses predefined form fields for demonstration purposes. In a full implementation, you would:

1. Create a form field mapping interface in the admin panel
2. Store the Google Form field IDs in your database
3. Dynamically generate the form fields based on these mappings

## Technical Details

### Form Submission Process

1. User fills out the custom form in our UI
2. Form data is collected and organized according to Google Form field IDs
3. Our backend proxy would submit this data to Google Forms
4. The form responses are still collected in your Google Form responses sheet

### Security Considerations

-  Direct form submission to Google Forms from the frontend may not work due to CORS restrictions
-  In a production environment, you should use a server-side proxy to handle form submissions
-  This approach keeps your form submission process secure

## Next Steps for Implementation

1. Build a field mapping interface in the admin panel
2. Create a server-side proxy for form submissions
3. Add analytics tracking for form completions
4. Add validation rules that match Google Form validation
