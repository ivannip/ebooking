import {Document, Schema, model } from "mongoose";

export interface IPlace extends Document {
    name: String,
    address: String,
    open: Boolean
};

const placeSchema = new Schema<IPlace> ({
    name: String,
    address: String,
    open: Boolean
});

export const Place = model<IPlace> ("place", placeSchema);