# Tracktik Challenge Rubin Brovina

# Project Overview

This project is written in Vue.js v2 and class components. Typescript is used for this project. For API calls, Axios is used. For the component UI, Vuetify is used. For unit tests, Jest is used.

- **Vue.js v2**: [Vue.js Documentation](https://vuejs.org/v2/guide/)
- **Typescript**: [Typescript Documentation](https://www.typescriptlang.org/docs/)
- **Axios**: [Axios Documentation](https://axios-http.com/docs/intro)
- **Vuetify**: [Vuetify Documentation](https://vuetifyjs.com/en/getting-started/installation/)
- **Jest**: [Jest Documentation](https://jestjs.io/docs/en/getting-started)

# Structure

## Components

- **AppTable.vue**: This component is used to display data in a tabular format.
- **Profile.vue**: This component is used to display the current user's profile.

## Views

- **ClientsView**: This view displays a list of clients.
- **SitesView**: This view displays a list of sites.
- **ClientsDetailsView**: This view displays detailed information about a specific client, when a client is clicked from the ClientsView table.
- **SitesDetailsView**: This view displays detailed information about a specific site, when a site is clicked from the SitesView table.

These views are all located under the `views` folder.

### Features

- **Pagination**: Server-side pagination is implemented on both ClientsView and SitesView.
- **Global Search**: Both ClientsView and SitesView support global search functionality.
- **User Information Modal**: Clicking the user avatar in the header opens a modal displaying user information.
- **Filter Information**: When filtering is applied, 2 chips are being rendered on the UI. One for Clear Filter that clears the input that user has entered and the other for Filter Information, that when clicked opens a modal with the entered filter info.
- **Responsive UI**: The user interface is responsive on all screen sizes, including mobile.
- **Different UI on Details Pages**: The details pages for clients and sites have distinct user interfaces.
- **Loading Indicator**: A loading indicator is displayed on tables while data is being fetched.
- **Theme**: A switch on the header of the application is displayed to switch the themes of the app.
- **Notifications**: Toast notifications are displayed when the details page are rendered. Based on the API response Success/Failure notifications are fires.


## Routing

- The routing logic is handled in the `index.ts` file under the `router` folder.
- Navigation to the details pages is done dynamically with the ID of the client/site that is clicked on the table.


## DTOs

The `dto` folder contains the following TypeScript files that handle the interfaces for each attribute:
- **ApiData**
- **Client**
- **ClientDetails**
- **DataGridOptions**
- **Site**
- **SiteDetails**
- **User**

## Unit Tests

- The **AppTable** and **Profile** components are tested under `AppTable.spec.ts` and `Profile.spec.js` respectively.
- There are a total of 7 tests that are all running correctly and passing.
# Getting Started

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Run the project**:
    ```bash
    npm run serve
    ```

3. **Run unit tests**:
    ```bash
    npm run test:unit
    ```