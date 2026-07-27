# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.0] - 2026-07-27

### Added
* **User Authentication System:** Introduced complete user account workflows including registration, login, logout, and session-based identity management.
* **Secure Password Handling:** Integrated Argon2 password hashing for protected user credentials and improved authentication security.
* **Authorization Middleware Layer:** Added dedicated authorization controls through `requireAuth.js` and `isAuthor.js` middleware, enforcing authenticated access and ownership-based permissions.
* **Resource Ownership Model:** Expanded motel documents with author relationships, allowing users to manage only resources they own.
* **User Seed Integration:** Extended the database seed engine with generated demo users and relational mappings between users, motel listings, and reviews.
* **Demo Environment Improvements:** Updated the application landing page with project information, feature status, fictional data disclosure, and demo account access instructions.

### Changed
* **Authentication Architecture:** Expanded the middleware pipeline with session handling, authentication state tracking, and flash message integration.
* **Database Relationships:** Updated motel schema structure to support author references and ownership validation workflows.
* **Application Routing:** Added dedicated authentication routes and protected resource workflows.
* **Documentation Overhaul:** Updated README documentation to reflect current architecture, authentication features, development workflow, and v2.2.0 release state.

### Security
* Added route-level authentication enforcement to prevent unauthorized access to protected workflows.
* Added ownership verification to prevent users from modifying or deleting resources belonging to other users.
* Improved credential security through Argon2-based password hashing.

### Fixed
* Resolved authorization workflow gaps where resource ownership was not enforced.
* Improved application behavior for unauthenticated users attempting protected actions.
* Corrected seed generation workflow to support user relationships and author-linked resources.

---

## [2.1.0] - 2026-06-25

### Added
* **Multi-Layer Validation Pipeline:** Implemented dual-guardrail security with Bootstrap 5 client-side validation and isolated backend Joi schema integration.
* **Strict Parameter Interception:** Added custom Joi validation (`models/idValidation.js`) to catch malformed MongoDB ObjectIds before they hit query execution, preventing database crashes (`CastError`).
* **Relational Cascade Closures:** Integrated pre-compiled Mongoose lifecycle post-hooks (`findOneAndDelete`) to clean up and automatically delete child reviews when a parent motel is removed.
* **Telemetry Engines:** Developed standalone network request tracker (`eventLogger.js`) and database transaction benchmark script (`dbLogger.js`) for deep terminal diagnostic tracing.
* **API Test Suite:** Shipped an exportable Insomnia configuration matrix (`insomnia_test_suite.yaml`) for automated routing and validation validation checks.

### Changed
* **MVC Decoupling:** Refactored business engine into explicit controller endpoints (`controllers/`) and clean URI-to-method router mapping matrices (`routes/`).
* **Seeding Optimization:** Re-engineered the database seed engine to clear the cache and dynamically seed 50 geo-located retro records coupled with randomized relational review layers.
* **Documentation Redesign:** Overhauled system README to reflect correct project workspace layouts, removing obsolete configuration directory footprints.

### Fixed
* Fixed a severe uncaught exception vulnerability where malformed URL parameters caused application failure via unhandled database casting errors.
* Resolved a database optimization flaw causing orphaned review documents to persist in memory after parent resource deletion.

---

[2.2.0]: https://github.com/Mattsmind/camp_review/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/Mattsmind/camp_review/compare/v2.0.0...v2.1.0