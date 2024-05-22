export interface User {
  id: number;
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  airbnbRegistrationYear?: Date;
  profilePicture?: string;
  currentStatus: boolean;
  userStatus: boolean;
  language?: string;
  country?: string;
  pf?: string;
  schoolYears?: string;
  pets?: string;
  job?: string;
  myLocation?: string;
  myLanguages?: string;
  generation?: string;
  favoriteSchoolSong?: string;
  passion?: string;
  interestingFact?: string;
  uselessSkill?: string;
  biographyTitle?: string;
  dailyActivity?: string;
  aboutMe?: string;
  commentsAboutGuestDTO?: CommentsAboutGuest[];
  rentalApartments?: RentalApartment[];
}

  export interface RentalApartment {
    pictures: Picture[];
    id: number;
    title?: string;
  }
  export interface Picture {
    id: number;
    pictureName?: string;
    pictureUrl?: string;
    rentalApartmentId: number;
  }

export interface CommentsAboutGuest {
  id: number;
  comment?: string;
  dateComments: Date;
  masterId: number;
  masterName: string // Имя пользователя
	masterAvatar: string // Аватар пользователя
}
  
  export const getUser = async (id: number) => {
    try {
        // const url = `https://roombiserver.azurewebsites.net/api/User/${id}`;
       const url = `https://rombiserv.azurewebsites.net/api/User/${id}`;
      const response = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) throw new Error("Unable to get user.");
      if (response.ok) {
        const responseData = await response.json();
        if (responseData && Object.keys(responseData).length > 0) {
          return responseData as User;
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