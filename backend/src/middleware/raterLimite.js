import { rateLimit } from "express-rate-limit"
import { RedisStore } from "rate-limit-redis"
import redisClient from "../config/redis.js"

const createStore = (prefix) => new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix,
});

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: createStore("rl:global:"),
    message: {
        success: false,
        message: "Too many requests. Please try again later",
    }
});


export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: createStore("rl:login:"),
    message: {
        success: false,
        message: "Too many requests. Please try again later",
    }
});

export const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: createStore("rl:register:"),
    message: {
        success: false,
        message: "Too many requests. Please try again later",
    }
});

export const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: createStore("rl:otp:"),
    message: {
        success: false,
        message: "Too many requests. Please try again later",
    }
});

export const healthCheckLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    store: createStore("rl:health:"),
    message: {
        success: false,
        message: "Too many requests. Please try again later",
    }
});