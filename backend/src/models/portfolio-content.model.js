const mongoose = require("mongoose");

const portfolioContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PortfolioContent =
  mongoose.models.PortfolioContent ||
  mongoose.model("PortfolioContent", portfolioContentSchema);

module.exports = { PortfolioContent };
