import mongoose from "mongoose";
import { NextResponse } from "next/server";

type ResponseData = {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
};

type StatusCode =
  | 200 // OK
  | 201 // Created
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // exists data in db
  | 500 // Internal Server Error
  | 502 // Bad Gateway
  | 503; // Service Unavailable

export const responseData = (
  statusCode: StatusCode,
  success: boolean,
  message: string,
  data?: any,
  error?: any
) => {
  if (error) {
    if (
      error instanceof mongoose.Error.ValidationError ||
      mongoose.Error.CastError
    ) {
      let customFieldErrors;

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        customFieldErrors = [
          {
            field,
            message: `${field} is already exists!!!`,
          },
        ];
      } else if (error.name === "CastError") {
        customFieldErrors = [
          {
            field: error.path,
            message: error.message,
          },
        ];
      } else if (error.name === "ValidationError") {
        customFieldErrors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
      } else {
        customFieldErrors = error?.errors
          ? Object.keys(error.errors).map((field) => ({
              field,
              message: error.errors[field].message,
            }))
          : (error = error);
      }

      error = customFieldErrors;
    } else {
      error = error;
    }
  } else {
    error = [];
  }

  const response: ResponseData = {
    success,
    message,
    data,
    error,
  };

  return NextResponse.json(response, { status: statusCode });
};
