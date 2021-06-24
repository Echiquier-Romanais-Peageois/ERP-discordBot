import mongoose, { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  idDiscord: string;
  pseudoDiscord: string;
  pseudoLichess?: string;
  licenceFFE?: string;
  firstNameFFE?: string;
  lastNameFFE?: string;
}

const UserSchema: Schema = new Schema({
  idDiscord: { type: String, required: true },
  pseudoDiscord: { type: String, required: true },
  pseudoLichess: { type: String, required: false },
  licenceFFE: { type: String, required: false },
  firstNameFFE: { type: String, required: false },
  lastNameFFE: { type: String, required: false },
});

export const User: Model<IUser> = model("User", UserSchema);

export const connectToDatabase = (callback: () => void) => {
  // Connect to mongo
  mongoose.connect(process.env.MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("✅ Successfully connected to mongodb");
    callback();
  });

  db.on("error", function () {
    console.log("Failed to connect to database");
    process.exit(1);
  });
};
