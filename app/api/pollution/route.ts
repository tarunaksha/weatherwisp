import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 22.5697;
    const lon = 88.3697;
   const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
    } catch (error) {
        console.log("Error fetching forecast data");
        return new Response("Error fetching pollution data", { status: 500 });
    }
}