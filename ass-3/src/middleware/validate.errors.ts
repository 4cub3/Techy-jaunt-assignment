import { type Schema } from "joi";
import type { Request, Response, NextFunction } from "express";

export const validateBodySchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error && error._original && error.details) {
      res.status(400).json({
        error: error.details[0]!.message,
        path: error.details[0]!.path,
      });
      return;
    }
    req.body = value;
    next();
  };
};

export const validateParamsSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error && error._original && error.details) {
      res.status(400).json({
        error: error.details[0]!.message,
        path: error.details[0]!.path,
      });
      return;
    }
    req.params = value;
    next();
  };
};

export const validateQuerySchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);
    if (error && error._original && error.details) {
      res.status(400).json({
        error: error.details[0]!.message,
        path: error.details[0]!.path,
      });
      return;
    }
     // 1. Clear out old keys so unvalidated/extra keys are removed
    Object.keys(req.query).forEach((key) => delete req.query[key]);
    
    // 2. Safely copy the validated & cast values into the original object
    Object.assign(req.query, value);
    next();
  };
};
