# GeoJSON App

Fetches GeoJSON data from the OpenStreetMap API and displays it on the page. The app uses the `osmtogeojson` library to convert the data from OSM format to GeoJSON.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#Usage)
  - [Testing](#Testing)
- [Features](#features)
- [Dependencies Used](#dependencies-used)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**

```bash
    git clone git@github.com:MahranElmasri/geojson-app.git
```

2. **Navigate to the project directory:**

```bash
    cd geojson-app
```

3. **Install dependencies:**

```bash
    npm install
```

### Usage

- **Run the app locally:**

```bash
    npm start
```

Visit http://localhost:3000 in your browser to use the app.

### Testing

```bash
    npm test
```

### Features

Click the "Get GeoJSON" button to fetch GeoJSON data from the specified location.
The app displays a loading spinner during data fetching and shows any errors encountered.

### Dependencies Used

- React
- Axios for HTTP requests
- osmtogeojson for converting OSM data to GeoJSON
- Jest

### Screenshot

[![Screen Shot](./src/screen-shot.png)](https://recordit.co/sSp4PQdMUD)
