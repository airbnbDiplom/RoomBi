export interface BookingDTOWithFoto {
    apartmentId: number;
    titleApartment?: string | null;
    checkInDate?: Date | null;
    checkOutDate?: Date | null;
    pictures?: Picture[] | null;
    comment?: boolean | null;
    countryApartment?: string | null; 
    totalPrice?: number; 
}

export interface Picture {
    id: number;
    pictureName?: string | null;
    pictureUrl?: string | null;
    rentalApartmentId: number;
}

export const getBookings = async (token: string) => {
    try {
        const url = `https://roombiserver.azurewebsites.net/api/Bookings`;
        
        const response = await fetch(url, {
            cache: "no-store",
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Unable to get bookings.");
        if (response.ok) {
            const responseData = await response.json();
            console.log('responseData', responseData);
            if (responseData && Object.keys(responseData).length > 0) {
                return responseData as BookingDTOWithFoto[];
            } else {
                console.error("Empty response from server");
            }
        } else {
            console.error("HTTP error:", response.status);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};