
import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errorMessage = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        return next(new ApiError(400, errorMessage));
    }

    req.body = result.data;
    next();
};
