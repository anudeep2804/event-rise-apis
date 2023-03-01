const express = require("express");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    event_id: { type: String, index: true},
    title: String,
    created_by: String,
    description: String,
    location: String,
    event_date: Date,
    ticket_price: Number,
    event_category: {
        type: String,
        enum: [
            'music',
            'health',
            'business',
            'hobbies',
            'sports',
            'food'
        ]
    },
    tickets_booked: Number,
    status: {
        type: String,
        enum: ['pending', 'approved']
    },
    image_path: String,
    image_name: String,
    hosted_by: String,
    event_date_timezone: String
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;