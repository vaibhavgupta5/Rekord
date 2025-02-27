import mongoose from "mongoose";

// This file ensures models are registered only once
export function registerModels() {
  // Only register models if they haven't been registered yet
  if (!mongoose.models.Athlete) {
    require("@/models/Athlete");
  }
  if (!mongoose.models.Post) {
    require("@/models/Post");
  }
  // Add other models here
}