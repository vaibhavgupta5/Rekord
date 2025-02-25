import { NextRequest, NextResponse } from "next/server";
import FundProviderModel from "@/models/FundProvider";
import AthleteModel from "@/models/Athlete";
import mongoose from "mongoose";
import { connectDB } from "@/utils/connectDB";

// ✅ Create a new sponsorship
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { fundProviderId, athleteId, amount, startDate, endDate, terms, paymentSchedule, deliverables, milestones } =
      await req.json();

    // Validate if FundProvider and Athlete exist
    const fundProvider = await FundProviderModel.findById(fundProviderId);
    const athlete = await AthleteModel.findById(athleteId);

    if (!fundProvider || !athlete) {
      return NextResponse.json({ error: "Invalid FundProvider or Athlete" }, { status: 400 });
    }

    // Create sponsorship object
    const newSponsorship = {
      athleteId,
      amount,
      startDate,
      endDate,
      status: "pending",
      terms,
      deliverables,
      paymentSchedule,
      milestones,
    };

    // Push sponsorship to fund provider
    fundProvider.sponsorships.push(newSponsorship);
    await fundProvider.save();

    return NextResponse.json({ message: "Sponsorship created", sponsorship: newSponsorship }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
  }
}

// ✅ Get all sponsorships (with filters)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const athleteId = url.searchParams.get("athleteId");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    const filter: any = {};

    if (status) filter["sponsorships.status"] = status;
    if (athleteId) filter["sponsorships.athleteId"] = new mongoose.Types.ObjectId(athleteId);
    if (startDate || endDate) {
      filter["sponsorships.startDate"] = { $gte: new Date(startDate as string) };
      if (endDate) {
        filter["sponsorships.endDate"] = { $lte: new Date(endDate as string) };
      }
    }

    const sponsorships = await FundProviderModel.find(filter, { sponsorships: 1 }).populate("sponsorships.athleteId");

    return NextResponse.json({ sponsorships }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
  }
}
