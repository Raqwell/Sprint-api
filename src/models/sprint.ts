import mongoose from "mongoose";
import { Timestamp } from "bson";

export type SprintDocument = mongoose.Document & {
    description: string;
};

const sprintSchema = new mongoose.Schema({
    description: String
});

export const Sprint = mongoose.model<SprintDocument>("Sprint", sprintSchema);