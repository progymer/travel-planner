import { auth } from "@/Auth";
import TripDetailsClient from "@/components/trip-details";
import { prisma } from "@/lib/prisma";


export default async function TripPage({ params }: { params: Promise<{ tripId: string }> }) {
    const {tripId} = await params;

    const session = await auth();

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                {" "}
                You need to be signed in to view this page.
            </div>
        );
    }

    const trip = await prisma.trip.findFirst({
        where: { id: tripId, userId: session.user?.id },
        include: { locations: true },
    });

    if (!trip) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
                {" "}
                Trip not found or you do not have access to view this trip.
            </div>
        );
    }

    return <TripDetailsClient trip={trip}/>
} 