import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import FundProviderModel from "@/models/FundProvider";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { companyName, email, password, phone, industry, logo, description } = body;

    // Validate required fields
    if (!companyName || !email || !password || !phone || !industry || !logo || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if the email already exists
    const existingFundProvider = await FundProviderModel.findOne({ email });
    if (existingFundProvider) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Fund Provider
    const newFundProvider = new FundProviderModel({
      companyName,
      email,
      password: hashedPassword,
      phone,
      industry,
      logo,
      description,
      verificationStatus: "pending",
      totalInvestment: 0,
      accountStatus: "active",
      lastActive: new Date(),
    });

    await newFundProvider.save();
    return NextResponse.json({ message: "Fund provider created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Error creating fund provider:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
