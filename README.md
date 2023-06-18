# kick-nodejs

kick-nodejs is a Node.js library that provides methods for retrieving livestream data from the kick.com website. Behind the curtain, [Puppeteer](https://www.npmjs.com/package/puppeteer) is used to execute fetch requests to the unofficial API.

## Installation

To use KickNodeJS in your Node.js project, you can install it via npm. Run the following command:

```shell
npm install kick-nodejs
```

## Usage

Here's an example of how to use kick-nodejs:

```typescript
import { KickNodeJS } from 'kick-nodejs';

const kick = new KickNodeJS();

async function fetchLivestreams() {
    try {
        await kick.init();

        const livestreams = await kick.getLivestreams({
            page: 1,
            limit: 10,
            subcategory: 'sports',
            sort: 'desc',
        });

        console.log(livestreams);
    } catch (error) {
        console.error('Error fetching livestreams:', error);
    } finally {
        await kick.stop();
    }
}

fetchLivestreams();
```

## Contributing

Contributions are welcome! If you have any ideas, improvements, or bug fixes, please open an issue or submit a pull request.

To contribute to KickNodeJS, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code adheres to the existing code style. Also, make sure to update the documentation as needed.

Together, we can make kick-nodejs better!

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.