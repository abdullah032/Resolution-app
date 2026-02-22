import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1", //The IP address
  port: 6379, // The PORT
});

export default redis;
