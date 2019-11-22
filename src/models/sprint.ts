import mongoose from "mongoose";

enum SprintStatus {
    IN_PROGRESS,
    PAUSED,
    CANCELLED,
    COMPLETED
}

enum DurationUnit {
    SECOND,
    MINUTE,
    HOUR
}

export type SprintType = {
    name: string;
    duration: number;
    unit: DurationUnit;
    status: SprintStatus;
}

export const sprintTypeSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    unit: Number,
    status: Number
});

export type SprintDocument = mongoose.Document & {
    sprintType: SprintType;
    progress: number;
    description: string;
    user: string;
    notify: boolean;
    createdAt: Date;
    started: Date;
    finishedAt: Date;
};

const sprintSchema = new mongoose.Schema({
    sprintType: { type: sprintTypeSchema, required: true },
    progress: { type: Number, required: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    notify: Boolean,
    createdAt : { type: Date, required: true, default: Date.now },
    startedAt : { type: Date, required: true, default: Date.now },
    finishedAt: Date,
});

export const Sprint = mongoose.model<SprintDocument>("Sprint", sprintSchema);