"use server";

import {
  Booking,
  ChatForApartmentPageDTO,
  ChatForApartmentPageDTORedax,
  DateBi,
  MessageObj,
  MessageStart,
  Payment,
} from "../type/type";
import { decodeTokenGetUserId } from "./jwtDecoder";

function convertDate(dateString: string): DateBi {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return { day, month, year };
}

export const getAllChat = async (token: string) => {
  console.log("getAllChat 1");
  try {
    const url = process.env.NEXT_GET_ALL_CHAT;

    if (url) {
      const res = await fetch(url, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await res.json();
      let result: MessageObj[] = [];
      for (let i = 0; i < responseData.length; i++) {
        const checkInDate = convertDate(responseData[i].booking.checkInDate);
        const checkOutDate = convertDate(responseData[i].booking.checkOutDate);
        const tempBooking: Booking = {
          apartmentId: responseData[i].booking.checkInDate,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          totalPrice: responseData[i].booking.totalPrice,
          payment: responseData[i].booking.payment,
        };
        const temp: MessageObj = {
          fotoMaster: responseData[i].fotoMaster,
          fotoApartment: responseData[i].fotoApartment,
          nameApartment: responseData[i].nameApartment,
          nameMaster: responseData[i].nameMaster,
          booking: tempBooking,
          message: responseData[i].message,
        };
        result.push(temp);
      }
      return result;
    }
  } catch (e) {
    const error: MessageObj[] = [];
    return error;
  }
};

export const sendMessageFetch = async (
  mg: ChatForApartmentPageDTO,
  token: string
) => {
  try {
    const url = process.env.NEXT_MESSAGE_ONLY;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: mg.comment,
          rentalApartmentId: mg.rentalApartmentId,
          masterIdUser: mg.masterIdUser,
          dateTime: mg.dateTime,
          guestIdUser: mg.guestIdUser,
        }),
      });

      if (!res.ok) {
        return res.status;
      }

      return res.status;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};

export const messageStart = async (
  messageStart: MessageStart,
  token: string
) => {
  console.log("messageStart - ", messageStart);
  try {
    const url = process.env.NEXT_MESSAGE_START;
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatForApartmentPageDTO: messageStart.message,
          bookingDTO: messageStart.booking,
        }),
      });

      if (!res.ok) {
        res.status;
      }
      return res.status;
    }
  } catch (e) {
    console.log("error", e);
    return null;
  }
};
