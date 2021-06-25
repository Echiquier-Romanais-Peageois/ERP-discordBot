import mongoose, { model, Schema, Model, Document } from "mongoose";

import normalizeForSearch from "bot/utils/normalize-for-search";

export interface IUser extends Document {
  idDiscord: string;
  pseudoDiscord: string;
  pseudoLichess?: string;
  licenceFFE?: string;
  firstNameFFE?: string;
  lastNameFFE?: string;

  search?: string;
  lastSignupRequest?: Date;
}

const userSchema: Schema<IUser> = new Schema({
  idDiscord: { type: String, required: true },
  pseudoDiscord: { type: String, required: true },
  pseudoLichess: { type: String, required: false },
  licenceFFE: { type: String, required: false },
  firstNameFFE: { type: String, required: false },
  lastNameFFE: { type: String, required: false },

  search: { type: String, required: false },
  lastSignupRequest: { type: Date, required: false },
});

// We use a pre-save hook to store a searchable form of the data

userSchema.pre("save", function (next) {
  // Store searchable forms of the data
  const pd = normalizeForSearch(this.pseudoDiscord);
  const pl = normalizeForSearch(this.pseudoLichess ?? "");
  const l = normalizeForSearch(this.licenceFFE ?? "");
  const fn = normalizeForSearch(this.firstNameFFE ?? "");
  const ln = normalizeForSearch(this.lastNameFFE ?? "");

  // Mentions are stored in the text in this form, so we can search them easily too
  const m = `<@!${this.idDiscord}>`; // Th

  this.search = `${m} ${pd} ${pl} ${l} ${fn} ${ln}`;
  next();
});

export const User: Model<IUser> = model("User", userSchema);

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
