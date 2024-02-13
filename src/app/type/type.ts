export interface HomeParams {
  locale: string;
}
export interface ImgBi {
  id: number;
  pictureName: string;
  pictureUrl: string;
  rentalApartmentId: string;
}
export interface CardBiProps {
  id: number;
  title: string;
  country: string;
  bookingFree: string;
  pictures: ImgBi[];
  pricePerNight: number;
  objectRating: number;
  choiceGuests: boolean;
  ingMap: string;
  latMap: string;
  house: string;
  sport: string;
  location: string;
}
export interface CarouselBiProps {
  pictures: ImgBi[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface FilterObj {
  id: number;
  label: string;
  name: string;
  src: string;
  type: string;
}
export interface FilterLngObj {
  id: number;
  label: string;
  nameUa: string;
  nameEn: string;
  src: string;
  type: string;
}
export interface ButtonOnBigDSearch {
  isWhereDropOn?: boolean;
  isWhenDropOn?: boolean;
  isWhoDropOn?: boolean;
  isWhenDDropOn?: boolean;

  setWhereDrop: (setWhereDrop: boolean) => void;
  setWhenDrop: (setWhenDrop: boolean) => void;
  setWhoDrop: (setWhoDrop: boolean) => void;
  setWhenDDrop?: (setWhenDDrop: boolean) => void;
}
export interface SearchKindSwitch {
  isSmallSearchOn: boolean;
  isBigSearchOn: boolean;
  isBigSearchOnBySmall: boolean;
  setSmallSearchOn: (setWhereDrop: boolean) => void;
  setBigSearchOn: (setWhenDrop: boolean) => void;
  setBigSearchOnBySmall: (setWhoDrop: boolean) => void;
}
export interface ThemProps {
  isTeamBlack: boolean;
}
export interface WhoState {
  gestsCount: number;
  childrenCount: number;
  babyCount: number;
  animalsCount: number;
}
export interface WhereState {
  // TODO: сделать объект по приходящим данным
  continent: string;
  country: string;
  city: string;
  district: string;
  street: string;
}
export interface SearchDataState {
  whoObj: WhoState;
  whereObj: WhereState;
}

export interface GuestCommentsForRentalItem {
  Id: number;
  guestIdUser: number;
  guestNameUser?: string;
  guestCountryUser?: string;
  guestAvatarUser?: string;
  comment?: string;
  dateTime: Date;
  rating: number;
}
export interface BookingForRentalItem {
  CheckInDate: Date;
  CheckOutDate: Date;
}
export interface OfferedAmenitiesForRentalItem {
  Id: number;
  // Basic amenities
  WiFi: boolean; // Вай-Фай
  TV: boolean; // Телевизор
  Kitchen: boolean; // Кухня
  WashingMachine: boolean; // Стиральная машина
  FreeParking: boolean; // Бесплатная парковка на территории
  PaidParking: boolean; // Платная парковка на территории
  AirConditioner: boolean; // Кондиционер
  Workspace: boolean; // Рабочая зона
  CashRegisterParticular: boolean; // Касовий апарат
  LargeKitchens: boolean; // Великі кухні

  // Special features
  specialFeatures?: string | null; // Есть ли у вас что-то особенное?

  // Outdoor amenities
  Pool: boolean; // Бассейн
  Jacuzzi: boolean; // Джакузи
  InnerYard: boolean; // Внутренний двор
  BBQArea: boolean; // Зона барбекю
  OutdoorDiningArea: boolean; // Обеденная зона на улице
  FirePit: boolean; // Костровище
  PoolTable: boolean; // Стол для игры в пул
  Fireplace: boolean; // Камин
  Piano: boolean; // Пианино
  GymEquipment: boolean; // Тренажеры
  LakeAccess: boolean; // Выход к озеру
  BeachAccess: boolean; // Выход на пляж
  SkiInOut: boolean; // Вход/выход на лыжах
  OutdoorShower: boolean; // Душ на улице

  // Safety features
  SmokeDetector: boolean; // Датчик дыма
  FirstAidKit: boolean; // Аптечка
  FireExtinguisher: boolean; // Огнетушитель
  CarbonMonoxideDetector: boolean; // Датчик угарного газа

  // Description
  description?: string; // Описание
}
export interface FullRentalItem {
  id: number;
  title?: string;
  address?: string | null;
  ingMap?: string;
  latMap?: string;
  numberOfGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  pricePerNight: number;
  objectRating: number;
  objectState?: string | null;
  typeApartment?: string | null;
  location?: string | null;
  house?: string | null;
  sport?: string | null;
  country?: string | null;
  offeredAmenitiesForRentalItem: OfferedAmenitiesForRentalItem;
  masterName?: string | null;
  airbnbRegistrationYear?: string | null;
  masterLanguage?: string | null;
  avatar?: string | null;
  bookingForRentalItem: BookingForRentalItem[];
  pictures: ImgBi[];
  guestCommentsForRentalItem: GuestCommentsForRentalItem[];
}

export interface MarkerBi {
  id: number;
  pricePerNight: number;
  ingMap: string;
  latMap: string;
}
