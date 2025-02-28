import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Player } from "@/models/player";
import { checkAPIKey } from "@/util/checkAPIkey";

export async function GET(request: Request, { params }: { params: {playerId: string} }) {
    await connectDB();
    const { playerId } = await params;
    try {
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const player = await Player.findById(playerId);
        if (!player) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: player }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}