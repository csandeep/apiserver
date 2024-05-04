## Getting Started

- install the dependencies:

  ```bash
  npm ci
  ```

- replace the `results.json` file with your primary election results json file
- Next, run the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
  ```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note**:

- in case the `results.json` is invalid the server will halt.

### API Documentation

You can find the [api documentation here](http://localhost:3000/api-doc)

### ToDO

- Add unit tests to api end points
- rewrite `getResults` using higher order functions.
