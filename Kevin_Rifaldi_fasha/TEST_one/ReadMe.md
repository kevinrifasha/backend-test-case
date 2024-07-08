To create a `documentation.md` file that provides detailed instructions for running your application, you can outline steps including prerequisites, installation, configuration, and starting the application. Here’s a template you can use:

### Application Documentation

#### Prerequisites
Before running the application, ensure you have the following installed:
- Node.js (version X.X.X or higher)
- PostgreSQL (version X.X.X or higher)
- Git

#### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Ensure PostgreSQL is running.
   - Create a new database named `mini_library` (or any preferred name).
   - Update database configuration in `src/db.js` if necessary.

4. **Run Database Migrations**
   ```bash
   npm run migrate
   ```

5. **Seed Initial Data**
   ```bash
   npm run seed
   ```
   - This command will seed initial data for members and books from JSON files.

#### Configuration

- Update any configuration settings in `src/config` files as needed, such as database connection details.

#### Running the Application

1. **Start the Server**
   ```bash
   npm start
   ```
   - This will start the server at `http://localhost:3000`.

2. **Access API Documentation**
   - Open your web browser and go to `http://localhost:3000/api-docs` to view Swagger API documentation.

#### Testing

- To run tests using Jest:
  ```bash
  npm test
  ```

#### Troubleshooting

- If encountering issues, check:
  - Database connectivity and configuration.
  - Correct Node.js and npm versions.

#### Additional Notes

- please turn off or terminate running while testing