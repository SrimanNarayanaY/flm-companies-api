# Sriman_Task — Companies API

## Overview

Companies CRUD + Filters API built with Node.js, TypeScript, Express, Mongoose.

## Prerequisites

- Node 18+
- MongoDB URI (Atlas or local)

## Setup

1. Copy `.env.example` to `.env` and fill `MONGO_CONNECTION_STRING` and `PORT`.
2. Install:
   npm install
3. Run in dev:
   npm run dev

## APIs

- POST /company/create — create company (body: JSON)
- GET /company/all — list with filters (query: name, code, industry, q, page, limit)
- GET /company/:id — get single
- PUT /company/:id — update
- DELETE /company/:id — delete

## Postman Documentation

Click the link below to view my API responses in Postman:  
[View API Documentation](https://documenter.getpostman.com/view/41813096/2sB3BEpWUQ)

# .env variables (sample)

MONGO_CONNECTION_STRING= mongodb+srv://Sriman:User12345@cluster0.h3bnaek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
