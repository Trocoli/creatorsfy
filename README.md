# creatorsfy-app

## Requirements

1. [ Node 22+](https://nodejs.org/en/download)

2. [Bun](https://bun.sh/docs/installation)

3. [Docker](https://docs.docker.com/engine/install/)

## Local Installation & Set Up

1. Ensure [npm](https://www.npmjs.com/) is installed globally

2. Install dependencies

   ```shell
   npm install
   ```

3. Run Docker container.

   ```shell
   docker run -d \
   --name mongodb-creators \
   -p 27017:27017 \
   mongo:latest
   ```

4. Start the application

   ```shell
   npm start
   ```

5. Clone the webhook service from [Creatorsfy-Webhook](https://github.com/Trocoli/creatorsfy-webhook#) and follow the instructions in the README.md

6. Go the Frontend Next.js Application running on <https://localhost:3000>
