import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { checkAPIKey } from "@/app/util/checkAPIkey";
import Coach from "@/models/coach";

export async function PUT(request: Request, { params }: { params: {coachId: string} }) {
    try {
        await connectDB();
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const { coachId } = params; 
        const updatedCoach = await Coach.findOneAndUpdate(
            { _id: coachId },
            { activated: true }
        );
        return NextResponse.json({ success: true, data: updatedCoach }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}