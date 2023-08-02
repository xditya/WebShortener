# WebShortener
A simple web shortener made with [oak](https://deno.land/x/oak) and [mongo](https://mongodb.com).

# Live Version
You can find a live version of this project [here](https://short.xditya.me).

# API
The API endpoint is `/shorten`, it takes `url` as a query parameter and returns the shortened URL.
Example usage can be found [here](./public/script.js).

# Deploying
You can easily deploy this project to [deno deploy](https://deno.com/deploy).
1. Fork the repository (and give it a star too!)
2. Head on to [deno deploy](https://deno.com/deploy) and login with your GitHub account.
3. Select "WebShortener" from the list of repositories.
4. Choose "main" as the branch, and "api/main.ts" as the entrypoint.
5. Head on to the settings of your app and add your `MONGO_URL`
6. Vist the deployed app and enjoy!

# License
This project is licensed under the [MIT License](./LICENSE).

# Credits
Made with ❤️ by [Aditya](https://xditya.me).