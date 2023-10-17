import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bedrooms: { type: Number, required: true, min: 1, max: 10 },
    bathrooms: { type: Number, required: true, min: 1, max: 10 },
    year: { type: Number, required: true, min: 1890, max: 2024 },
    price: { type: Number, required: true, min: 0, max: 1000000000 },
    imgUrl: { type: String, required: true, default: '//placehold.it/300x300', minLength: 1, maxLength: 500 },
    description: { type: String, minLength: 3, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'account' }
},
    {
        timestamps: true, toJSON: { virtuals: true }
    });