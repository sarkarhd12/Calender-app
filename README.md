﻿# Calender-app
Calendar API

This is a backend system for managing calendar events, including metadata and event details. It provides RESTful APIs for creating, updating, retrieving, and deleting events and their metadata.

Technologies Used

Spring Boot (Backend API)

Java (Programming Language)

Jakarta Transaction API (For transactional support)

Spring Web (For building REST APIs)

Spring Data JPA (For database interactions)

MySQL or PostgreSQL (Database)

React.js (Frontend UI)

Axios (For API calls)

Day.js (For date/time handling)

API Endpoints

Event Metadata Controller

Create Event Metadata

Endpoint: POST /events/create-metadata

Request Body: JSON object containing event metadata

Response: Created metadata object

Get Event Metadata by ID

Endpoint: GET /events/metadata/{id}

Response: Metadata object if found, else 404

Get All Event Metadata

Endpoint: GET /events/getAll-metaData

Response: List of metadata objects

Update Event Metadata

Endpoint: PUT /events/update-metadata/{id}

Request Body: JSON object with updated fields

Response: Updated metadata object

Delete Event Metadata

Endpoint: DELETE /events/delete-metadata/{id}

Response: Success message or 404 if not found

Events Controller

Create Events

Endpoint: POST /events/create

Request Body: List of event objects

Response: Created event list

Get Event by ID

Endpoint: GET /events/getEventById/{id}

Response: Event object if found, else 404

Update Event

Endpoint: PUT /events/updateEvent/{id}

Request Body: JSON object with updated event details

Response: Updated event object

Delete Event

Endpoint: DELETE /events/deleteEvent/{id}

Response: Success message

Get Events by Date

Endpoint: GET /events/by-date?date=YYYY-MM-DD

Response: List of events for the given date

Get Event Times by Date

Endpoint: GET /events/by-date/times?date=YYYY-MM-DD

Response: List of event times formatted in local timezone

Frontend Integration

A custom React Hook useEvents() is provided for interacting with the backend.

Features

Fetch all event metadata (fetchEvents)

Retrieve metadata by ID (getEventMetadataById)

Fetch events by date (getEventsByDate)

Create a new event metadata (createEvent)

Update an event (updateEvent)

Delete an event (deleteEventById)

Update event metadata (updateEventMetadata)

API Calls Using Axios

The frontend uses Axios for API requests and Day.js for date handling.

Setup Instructions

Backend Setup

Clone the repository.

Configure the database in application.properties.

Run the Spring Boot application.

Frontend Setup

Install dependencies: npm install

Start the frontend: npm start

Notes

Ensure the backend is running before using the frontend.

API URLs should be adjusted as per deployment configurations.

The system supports local timezone conversions using Day.js.

Future Enhancements

Implement authentication for event creation and management.

Support recurring events.

Add notification/reminder functionalities.

Improve UI/UX in the frontend.


