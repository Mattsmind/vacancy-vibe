# 🦩 VacancyVibe

A full-stack vintage roadside motel discovery and review platform built with modern JavaScript technologies.

Vacancy Vibe is engineered around a modular Model-View-Controller (MVC) architecture with an emphasis on clean separation of concerns, secure user workflows, structured data validation, and maintainable backend design.

Users can explore fictional retro roadside destinations, create motel listings, submit reviews, and manage their own content through a complete authentication and authorization system.

This project is developed as part of the **Mattsmind** portfolio ecosystem and demonstrates full-stack application architecture, database modeling, secure authentication, authorization workflows, and production-oriented development practices.

**Current Release:** `v2.2.0`

---

# ✨ Current Features

## User Authentication

Vacancy Vibe includes a complete session-based authentication system.

Features:

- User registration
- Secure password hashing using Argon2
- Login and logout workflows
- Session management
- Authentication state tracking
- Flash message feedback

---

## Authorization & Ownership

The application implements resource-level authorization controls.

Features:

- Protected routes requiring authentication
- User ownership tracking
- Author-based edit permissions
- Author-based delete permissions
- Prevention of unauthorized resource modification

Users may only modify motel listings they own.

---

## Motel Management

Authenticated users can manage motel listings.

Features:

- Browse motel directory
- View detailed motel information
- Create new motel listings
- Edit owned listings
- Delete owned listings

---

## Reviews

Reviews maintain relational integrity with motel records.

Features:

- Create motel reviews
- Associate reviews with motel documents
- Automatic cleanup of related reviews when parent motel records are removed

---

## Developer Features

Vacancy Vibe includes several custom development tools and systems:

- MVC architecture
- Centralized error handling
- Multi-layer validation
- Database telemetry
- Custom seed engine
- API testing suite

---

# ⚠️ Demo Data Notice

Vacancy Vibe currently uses generated seed data for demonstration purposes.

The motel names, locations, descriptions, and reviews are fictional and created through the application's custom seed engine. They do not represent real businesses or actual lodging locations.

Demo accounts are provided so visitors can explore authentication and authorization features without creating an account.

---

# 🛠️ Tech Stack & Architecture

## Backend

- Node.js
- Express.js 5
- CommonJS architecture

## Database

- MongoDB
- Mongoose ODM

## Authentication & Security

- Argon2 password hashing
- Express Session
- Connect Flash
- Custom authentication middleware
- Custom authorization middleware

## Data Validation

- Joi schema validation
- Bootstrap client-side validation
- Server-side request validation middleware

## View Layer

- EJS templating engine
- ejs-mate layouts and partials
- Bootstrap 5 styling framework

---

# 🧠 Software Engineering Practices

Vacancy Vibe is structured around maintainable software engineering principles with a focus on separation of concerns, predictable application behavior, and secure data handling.

---

## 1. Model-View-Controller Architecture

The application follows a modular MVC structure.

### Routes

The `routes/` directory maps HTTP endpoints to application actions.

Routes remain lightweight and delegate business logic to controllers.

### Controllers

The `controllers/` directory contains application workflows including:

- Database operations
- Business logic
- Request processing
- View rendering

### Models

The `models/` directory defines:

- MongoDB schemas
- Data relationships
- Validation constraints
- Database integrity rules

---

## 2. Authentication & Authorization Pipeline

Authentication and authorization are handled through separate middleware layers.

### Authentication

Determines whether a user is logged into the application.

Implemented through:

- Session-based authentication
- User lookup middleware
- Protected route enforcement

### Authorization

Determines whether an authenticated user has permission to modify a resource.

Implemented through:

- `requireAuth.js`
- `isAuthor.js`

Example:

A user may edit or delete only motel listings they own.

---

## 3. Relational Data Modeling

Vacancy Vibe maintains structured relationships between users, motels, and reviews.

```text
User
 |
 └── Motel
       |
       └── Reviews
```

Relationships:

- Users create motel listings
- Motel documents store author references
- Reviews belong to motel records
- Cascade deletion prevents orphaned review documents

---

## 4. Multi-Layer Validation Pipeline

The application protects data integrity through multiple validation layers.

### Client-Side Validation

Bootstrap-powered validation provides immediate feedback before requests reach the server.

### Server-Side Validation

Joi schemas validate incoming payloads before database operations occur.

This protects against:

- Invalid form submissions
- Malformed requests
- Direct API manipulation attempts

---

## 5. Strict Parameter Validation

MongoDB ObjectId validation occurs before database execution.

Invalid parameters are intercepted before they can trigger database casting errors.

This provides controlled error handling instead of unexpected application failures.

---

## 6. Centralized Error Handling

Application failures are routed through a centralized error pipeline.

Features:

- Custom `AppError` class
- Async error forwarding
- Global Express error middleware
- Dedicated error display views

---

## 7. Custom Database Seed Engine

The seed system provides a complete development and demonstration environment.

Features:

- Automated database population
- Generated fictional motel records
- User account generation
- Relationship mapping between users, motels, and reviews
- Repeatable development environments

---

## 8. Developer Telemetry

Custom diagnostic tools assist development and debugging.

### Request Logging

`eventLogger.js`

Tracks incoming application requests and middleware activity.

### Database Monitoring

`dbLogger.js`

Provides database operation timing and terminal diagnostics through Mongoose hooks.

---

# 📂 Directory Layout

```text
VacancyVibe/
├── app.js                      # Middleware pipeline setup and application configuration
├── server.js                   # Server bootstrap and network listener
├── CHANGELOG.md                # Release history
├── LICENSE                    # Project license
├── README.md                  # Project documentation
├── package.json               # Application metadata and dependencies
├── insomnia_test_suite.yaml   # API testing collection
│
├── controllers/               # Application business logic
│   ├── authenticationController.js
│   ├── motels.js
│   └── reviews.js
│
├── middleware/                # Application middleware pipeline
│   ├── authenticationMiddleware.js
│   ├── errorMiddleware.js
│   ├── eventLogger.js
│   ├── flashMessages.js
│   ├── isAuthor.js
│   ├── requireAuth.js
│   ├── sessions.js
│   └── validateForm.js
│
├── models/                    # Database schemas and validation models
│   ├── idValidation.js
│   ├── loginValidation.js
│   ├── motel.js
│   ├── motelValidation.js
│   ├── review.js
│   ├── reviewsValidation.js
│   ├── user.js
│   └── userValidation.js
│
├── routes/                    # Express route definitions
│   ├── authentication.js
│   ├── motels.js
│   └── reviews.js
│
├── seeds/                     # Database seed generation system
│   ├── cities.js
│   ├── descriptions.js
│   ├── index.js
│   ├── nameData.js
│   ├── sampleReviews.js
│   └── userSeeds.js
│
├── utils/                     # Shared utility modules
│   ├── AppError.js
│   ├── dbLogger.js
│   └── logStyles.js
│
├── public/                    # Static client assets
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── formValidation.js
│
└── views/                     # EJS templates
    ├── auth/
    │   ├── login.ejs
    │   └── register.ejs
    ├── error.ejs
    ├── home.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── motels/
    │   ├── details.ejs
    │   ├── index.ejs
    │   ├── new.ejs
    │   └── update.ejs
    └── partials/
        ├── flashViews.ejs
        ├── footer.ejs
        └── navbar.ejs
```
---

# 🚀 Getting Started

## Prerequisites

Before running Vacancy Vibe locally, ensure the following software is installed:

- Node.js (LTS recommended)
- MongoDB
- Git

Verify your installations:

```bash
node -v
npm -v
mongod --version
```

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Mattsmind/camp_review.git
```

Navigate into the project directory:

```bash
cd vacancy-vibe
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ Environment Configuration

Create a `.env` file in the project root:

```bash
touch .env
```

Configure the required environment variables:

```env
PORT=3000
DATABASE_URL=mongodb://127.0.0.1:27017/vacancy-vibe
SESSION_SECRET=your_session_secret_here
```

The application uses environment variables to isolate configuration details from source code.

---

# 🌱 Database Seeding

Vacancy Vibe includes a custom database seed engine for generating demonstration data.

The seed process creates:

- Fictional retro motel listings
- Generated user accounts
- Author relationships
- Sample reviews

Run the seed process:

```bash
node seeds/index.js
```

The database will be populated with a complete demonstration environment.

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will start on the configured port.

Open your browser:

```
http://localhost:3000
```

---

# 🔐 Demo Accounts

The deployed demo environment includes seeded user accounts for exploring authentication and authorization features.

Example:

| Role | Username | Password |
|---|---|---|
| Demo User | `demo` | `Demo123!` |

Demo accounts allow visitors to:

- Log in
- Create motel listings
- Edit owned listings
- Delete owned listings
- Explore protected workflows

---

# 🧪 API Testing

An Insomnia API test collection is included:

```
insomnia_test_suite.yaml
```

Import this file into Insomnia to test:

- Route behavior
- Validation responses
- Error handling
- API workflows

---

# 🗺️ Development Roadmap

Vacancy Vibe continues to evolve as a full-stack application.

## Completed

✅ MVC architecture  
✅ MongoDB database integration  
✅ Motel and review relationships  
✅ Multi-layer validation system  
✅ Centralized error handling  
✅ Database telemetry  
✅ User authentication  
✅ Session management  
✅ Authorization middleware  
✅ Ownership-based permissions  
✅ Demo-ready seed environment  

---

## Next Features

### 📸 Cloudinary Image Management

Planned image functionality:

- Cloud-based image storage
- Motel image uploads
- Multiple images per listing
- Image deletion handling
- User-selected featured images (`VibePic`)

---

### Future Improvements

Potential future development:

- User profiles
- Favorites system
- Advanced search
- Location filtering
- Improved UI components
- Additional API functionality

---

# 📖 Release History

All release information is maintained in:

```
CHANGELOG.md
```

Current release:

```
v2.2.0 - Authentication & Authorization Release
```

For detailed changes between versions, see the project changelog.

---

# 📄 License

This project is distributed under the MIT License.

See:

```
LICENSE
```

for additional information.