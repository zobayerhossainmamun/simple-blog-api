import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        uri: process.env.MONGODB_URI
    };
});