import { NextRequest, NextResponse } from "next/server";
import AthleteModel from "@/models/Athlete";
import { connectDB } from "@/utils/connectDB";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB is connected

    const body = await req.json();
    const { athleteId, type, documentUrl, issuedBy, issuedDate, expiryDate } = body;

    // Validate required fields
    if (!athleteId || !type || !documentUrl || !issuedBy || !issuedDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if any of the required fields are empty strings
    if (type === "" || documentUrl === "" || issuedBy === "" || issuedDate === "") {
      return NextResponse.json({ error: "Required fields cannot be empty" }, { status: 400 });
    }

    // Find athlete
    const athlete = await AthleteModel.findById(athleteId);
    if (!athlete) {
      return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
    }

    // Ensure 'certifications' array exists
    if (!Array.isArray(athlete.certifications)) {
      athlete.certifications = [];
    }

    // Log the date values for debugging
    console.log("Issued date:", issuedDate);
    console.log("Expiry date:", expiryDate);

    // Create certification object in the correct format
    const newCertificate = {
      type,
      documentUrl,
      issuedBy,
      issuedDate: new Date(issuedDate),
      verificationStatus: "pending",
    };

    // Only add expiryDate if it exists and is valid
    if (expiryDate && expiryDate !== "") {
      newCertificate.expiryDate = new Date(expiryDate);
    }

    // Log the entire certificate object
    console.log("New certificate:", newCertificate);

    // Add certification and save
    athlete.certifications.push(newCertificate);
    await athlete.save();

    return NextResponse.json({ 
      message: "Certificate added successfully",
      certificate: newCertificate 
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding certificate:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message 
    }, { status: 500 });
  }
}