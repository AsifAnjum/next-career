import dbConnect from "./db/dbConnect";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await dbConnect();
  }
}
