"use server";

import { auth } from "@/Auth";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {
    const session = await auth();
    if (!session) {
        throw new Error("Not authenticated");
    };

    await prisma.$transaction(newOrder.map((locationId: string, index: number) =>
        prisma.location.update({where : { id: locationId,}, data: { order: index },})
    )
    );
}