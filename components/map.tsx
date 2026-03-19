"use client";

import type { Location } from "@/app/generated/prisma";
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';

interface MapProps {
    itineraries: Location[];
}

export default function Map({itineraries}: MapProps){
    
    const {isLoaded, loadError}= useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if(loadError) return <div>Error loading maps</div>;
    if(!isLoaded) return <div>Loading...</div>;


    const center = itineraries.length > 0 ? {
        lat: itineraries[0].lat,
        lng: itineraries[0].lng,
    } : {
        lat: 0,
        lng: 0,
    }

    return (
        <GoogleMap
            mapContainerStyle={{width: '100%', height: '400px'} }
            zoom={8}
            center={center}
        >
            {itineraries.map((location, index) => (
                <Marker 
                   key={index} 
                   position={{lat: location.lat, lng: location.lng,}}
                   title={location.locationName}
                />
            ))}
        </GoogleMap>
    )
}