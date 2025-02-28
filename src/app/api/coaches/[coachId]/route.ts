import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { checkAPIKey } from "@/util/checkAPIkey";
import { Coach, CoachType } from "@/models/coach";
import { sendDecisionEmail } from "@/lib/sendEmails";

export async function PUT(request: Request, { params }: { params: {coachId: string} }) {
    try {
        await connectDB();
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const { coachId } = await params;
        const url = new URL(request.url);
        const status = url.searchParams.get("status");
        const updatedCoach: CoachType | null = await Coach.findOneAndUpdate(
            { _id: coachId },
            { activated: true },
            { new: true, lean: true }
        );
        if (!updatedCoach) {
            return NextResponse.json({ success: false, message: 'Coach not found' }, { status: 404 });
        }
        if (!(status === "approved" || status === "denied")) {
            return NextResponse.json({ success: false, message: 'Invalid or missing parameters' }, { status: 400 });
        }
        sendDecisionEmail(updatedCoach, status)
        return NextResponse.json({ success: true, data: updatedCoach }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}