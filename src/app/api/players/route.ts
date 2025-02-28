import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Player } from "@/models/player";
import { checkAPIKey } from "@/util/checkAPIkey";

export async function GET(request: Request) {
    try {
        await connectDB();
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const players = await Player.find();
        return NextResponse.json({ success: true, data: players }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const body = await request.json();
        const player = new Player(body)
        await player.save()
        return NextResponse.json({ success: true, data: player }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
