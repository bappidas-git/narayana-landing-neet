# Narayana IIT-JEE Coaching - Guwahati

Landing page for Narayana Coaching Centers' IIT-JEE programme in Guwahati, Assam.

## Tech Stack

- **Frontend:** React 18, Material UI 5, Framer Motion
- **Styling:** CSS Modules, CSS Custom Properties
- **Backend API:** PHP (lead form submission with Gmail SMTP)
- **Icons:** Iconify (MDI icon set)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Production build
npm run build
```

The app runs at [http://localhost:3000](http://localhost:3000) in development.

## Project Structure

```
src/
├── components/       # Reusable UI components (Button, Card, Modal, etc.)
├── context/          # React Context providers (Theme)
├── data/             # Static data (highlights, courses, FAQs)
├── hooks/            # Custom hooks (useInView, useMediaQuery, useScrollPosition)
├── pages/            # Page components (ThankYou)
├── styles/           # Global styles, variables, animations, responsive
├── theme/            # MUI theme configuration
└── utils/            # Validators and utilities
api/
├── save-lead.php     # Lead form handler
└── config/           # Database and email configuration
public/
└── index.html        # HTML template with structured data (JSON-LD)
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `REACT_APP_SALES_PHONE` / `REACT_APP_WHATSAPP_NUMBER` - Contact numbers
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps key
- `REACT_APP_API_BASE_URL` - Backend API URL for lead submissions

## Lead Form API

The PHP backend requires [Composer](https://getcomposer.org/):

```bash
cd api && composer install
```

Configure SMTP credentials in `api/config/email.php`.
