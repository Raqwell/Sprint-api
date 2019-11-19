import mongoose from "mongoose";

export type SprintDocument = mongoose.Document & {
    userEmail: string;
    length: number;
    status: number;
    createdAt: Date;
    finish: Date;
    description: string;
};

const sprintSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    length: { type: Number, required: true },
    status: Number,
    createdAt    : { type: Date, required: true, default: Date.now },
    finish: Date,
    description: { type: String, required: true }
});

export const Sprint = mongoose.model<SprintDocument>("Sprint", sprintSchema);