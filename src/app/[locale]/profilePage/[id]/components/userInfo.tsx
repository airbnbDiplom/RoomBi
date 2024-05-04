import React from 'react';
import styles from './userInfo.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { getProfile } from '@/app/services/GetProfileService';
import Link from 'next/link';
import { Mortarboard } from 'react-bootstrap-icons';
import { Briefcase } from 'react-bootstrap-icons';
import { Globe2 } from 'react-bootstrap-icons';
import { GlobeEuropeAfrica } from 'react-bootstrap-icons';
import { GenderFemale } from 'react-bootstrap-icons';
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import { Heart } from 'react-bootstrap-icons';
import { Lightbulb } from 'react-bootstrap-icons';
import { Magic } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';
import { Clock } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { User, getUser, CommentsAboutGuest, Picture, RentalApartment } from '@/app/services/getUserInfo';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { Button, Modal } from "react-bootstrap";
import { Carousel } from 'react-bootstrap';
interface UserInfoProps {
  locale: string;
  id: string
}
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      // className={styles.myClassRight}
      className={className}
      style={{ ...style, display: "block", background: "transparent", color: "black", borderRadius: "50%", fontSize: "20px" }}
      onClick={onClick}
    >
      &#9654;
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      // className={styles.myClassLeft}
      className={className}
      style={{ ...style, display: "block", background: "transparent", color: "black", borderRadius: "50%", fontSize: "20px" }}
      onClick={onClick}
    >
      &#9664;
    </div>
  );
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipe: true, // Enable or disable swiping to change slides
  touchMove: true, // Enable or disable slide motion with touch
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
const UserInfo: React.FC<UserInfoProps> = ({ locale, id }) => {
  const [schoolYears, setSchoolYears] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [generation, setGeneration] = useState("");
  const [favoriteSong, setFavoriteSong] = useState("");
  const [passion, setPassion] = useState("");
  const [fact, setFact] = useState("");
  const [skill, setSkill] = useState("");
  const [biography, setBiography] = useState("");
  const [activity, setActivity] = useState("");
  const [about, setAbout] = useState("");
  const [pets, setPets] = useState("");
  const [ava, setAva] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [yearsOnSite, setYearsOnSite] = useState("");
  const [userStatus, setUserStatus] = useState("false");
  // const [userDetails, setUserDetails] = useState({ name: '', email: '', yearsOnSite: '' });

  let profile;
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<CommentsAboutGuest[]>([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [RentalApartments, setRentalApartments] = useState<RentalApartment[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(parseInt(id));
      console.log('userData', userData);
      const comments = userData?.commentsAboutGuestDTO || [];
      console.log('comments', comments);
      const rentAp = userData?.rentalApartments || [];
      console.log('rentAp', rentAp);
      const pic = userData?.rentalApartments?.map((apartment) => apartment.Pictures).flat() || [];
      console.log('pic', pic);
      setPictures(pic);
      setRentalApartments(rentAp);
      setUser(userData || null);
      setComments(comments);
    };

    fetchUser();
  }, [id]);
  useEffect(() => {
    if (user) {
      console.log('user', user);
      setSchoolYears(user.schoolYears || "");
      console.log('schoolYears', user.schoolYears);
      setJob(user.job || "");
      setLocation(user.myLocation || "");
      setLanguages(user.myLanguages || "");
      setGeneration(user.generation || "");
      setFavoriteSong(user.favoriteSchoolSong || "");
      setPassion(user.passion || "");
      setFact(user.interestingFact || "");
      setSkill(user.uselessSkill || "");
      setBiography(user.biographyTitle || "");
      setActivity(user.dailyActivity || "");
      setAbout(user.aboutMe || "");
      setPets(user.pets || "");
      setAva(user.profilePicture || "");
      setPhone(user.phoneNumber || "");
      setName(user.name || "");
      setUserStatus(user.userStatus ? t("Arendator") : t("Guest"));
      const registrationDate = user.airbnbRegistrationYear ? new Date(user.airbnbRegistrationYear) : new Date();
      console.log('registrationDate', registrationDate);
      const now = new Date();

      const years = differenceInYears(now, registrationDate);
      const dateAfterYears = addYears(registrationDate, years);

      const months = differenceInMonths(now, dateAfterYears);
      const dateAfterMonths = addMonths(dateAfterYears, months);

      const days = differenceInDays(now, dateAfterMonths);

      let yearsText = years === 1 ? 'year' : 'years';
      let monthsText = months === 1 ? 'month' : 'months';
      let daysText = days === 1 ? 'day' : 'days';

      if (locale === 'ua') {
        let lastDigit, lastTwoDigits;

        lastDigit = years % 10;
        lastTwoDigits = years % 100;
        if (lastTwoDigits > 10 && lastTwoDigits < 20) {
          yearsText = 'років';
        } else if (lastDigit === 1) {
          yearsText = 'рік';
        } else if (lastDigit > 1 && lastDigit < 5) {
          yearsText = 'роки';
        } else {
          yearsText = 'років';
        }

        lastDigit = months % 10;
        lastTwoDigits = months % 100;
        if (lastTwoDigits > 10 && lastTwoDigits < 20) {
          monthsText = 'місяців';
        } else if (lastDigit === 1) {
          monthsText = 'місяць';
        } else if (lastDigit > 1 && lastDigit < 5) {
          monthsText = 'місяці';
        } else {
          monthsText = 'місяців';
        }

        lastDigit = days % 10;
        lastTwoDigits = days % 100;
        if (lastTwoDigits > 10 && lastTwoDigits < 20) {
          daysText = 'днів';
        } else if (lastDigit === 1) {
          daysText = 'день';
        } else if (lastDigit > 1 && lastDigit < 5) {
          daysText = 'дні';
        } else {
          daysText = 'днів';
        }
      }

      if (years > 0) {
        const yearsSite = `${years} ${yearsText}`;
        setYearsOnSite(yearsSite || "");
      } else if (months > 0) {
        const yearsSite = `${months} ${monthsText}`;
        setYearsOnSite(yearsSite || "");
      } else if (days > 0) {
        const yearsSite = `${days} ${daysText}`;
        setYearsOnSite(yearsSite || "");
      } else if (days === 0) {
        const yearsSite = `${1} ${'day'}`;
        setYearsOnSite(yearsSite || "");
      }
      console.log('yearsOnSite', yearsOnSite);
    }

  }, [user]);

  const { t } = useTranslation();

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles['grid-container']}>
      <div className={`${styles.card} ${styles.card1} ${styles.roundedShadow} ${styles.sticky}`}>
        <div
        >
          {ava && phone !== "no" ? (
            <div className={styles.circle}>
              <img src={`https://roombi.space/Avatar/${ava}`} alt="Profile" className={styles.circle} />
            </div>
          ) : (
            <div className={styles.circle}>
              <h1 className={styles.centerAlign}>{name ? name.charAt(0) : ""}</h1>
            </div>
          )}
          <div className={styles.centerAlign}>{name}</div>
          <p className={styles.centerAlign}>
            {userStatus}
          </p>
        </div>
        <div className={`${styles.rightSide} ${styles.centerContent}`}>
          <div className={styles.rightAlign}>{comments.length}</div>
          <div className={styles.rightAlign}>{t("reviews")}</div>
          <br />
          <div className={styles.rightAlign}>{yearsOnSite}</div>
          <div className={styles.rightAlign}>{t("onRoomBiSite")}</div>
        </div>
      </div>
      <>
        <div className={`${styles.card6}`}>
          <h3 className={styles.hbold2}>{t("aboutTheHost")} {name}</h3>
          {schoolYears !== "" && (
            <div className={styles.pad}>
              <Mortarboard className={styles.icon1} />
              {t("whereDidMySchoolYearsPass")} {schoolYears}
            </div>
          )}
          {job !== "" && (
            <div className={styles.pad}>
              <Briefcase className={styles.icon1} />
              {t("myJob1")} {job}
            </div>
          )}
          {location !== "" && (
            <div className={styles.pad}>
              <GlobeEuropeAfrica className={styles.icon1} />
              {t("myCity")} {location}
            </div>
          )}
          {languages !== "" && (
            <div className={styles.pad}>
              <Globe2 className={styles.icon1} />
              {t("languages")} {languages}
            </div>
          )}
          {generation !== "" && (
            <div className={styles.pad}>
              <GenderFemale className={styles.icon1} />
              {t("whichGeneration")} {generation}
            </div>
          )}
          {favoriteSong !== "" && (
            <div className={styles.pad}>
              <MusicNoteBeamed className={styles.icon1} />
              {t("favoriteSchoolSongLabel")} {favoriteSong}
            </div>
          )}
          {passion !== "" && (
            <div className={styles.pad}>
              <Heart className={styles.icon1} />
              {t("whatILove1")} {passion}
            </div>
          )}
          {fact !== "" && (
            <div className={styles.pad}>
              <Lightbulb className={styles.icon1} />
              {t("interestingFactAboutMe1")} {fact}
            </div>
          )}
          {skill !== "" && (
            <div className={styles.pad}>
              <Magic className={styles.icon1} />
              {t("myMostUselessSkill")} {skill}
            </div>
          )}
          {biography !== "" && (
            <div className={styles.pad}>
              <Book className={styles.icon1} />
              {t("storyOfMyLife1")} {biography}
            </div>
          )}
          {activity !== "" && (
            <div className={styles.pad}>
              <Clock className={styles.icon1} />
              {t("whatIDoForHours1")} {activity}
            </div>
          )}
          {pets !== "" && (
            <div className={styles.pad}>
              <img src="/icon/paw.png" alt="paws" className={styles.icon1} />
              {t("myPets1")} {pets}
            </div>
          )}
          {about !== "" && (
            <div className={styles.pad}>
              {t("aboutMe")}: {about}
            </div>
          )}
{comments && comments.length > 0 && (
  <>

          <h3 className={styles.hbold}>{name} : {t("whatHostsSay")}</h3>
          <br />
          <div>
          <Carousel>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.commentBox}>
                  <div className={styles.container}>
                    <div className={styles.blockLeft}>
                      <Link href={`/profilePage/${comment.masterIdUser}`}>
                        <Image
                          className={styles.mainImage}
                          src={`https://roombi.space/Avatar/${comment.masterAvatar}` || "/userInfo/userInf.svg"}
                          alt={"avatar"}
                          width={50}
                          height={50}
                          priority
                        />
                      </Link>
                    </div>
                    <div className={styles.blockRight}>
                      <p>{comment.masterName}</p>
                      <p>{new Date(comment.dateComments).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))}
          </Carousel>
          </div>
          <>
            <span className={styles.btn}>
              <Button variant="light" onClick={handleShow}>
                {t("btnsHowMoreCommentsStart")} {comments.length}{" "}
                {t("btnsHowMoreCommentsEnd")}
              </Button>
            </span>

            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Body>
                {comments.map((comment) => (
                  <div key={comment.id} className={styles.item}>
                    <div>

                      <div key={comment.id} className={styles.commentBox}>
                        <div className={styles.container}>
                          <div className={styles.blockLeft}>
                            <Link href={`/profilePage/${comment.masterIdUser}`}>
                              <Image
                                className={styles.mainImage}
                                src={`https://roombi.space/Avatar/${comment.masterAvatar}` || "/userInfo/userInf.svg"}
                                alt={"avatar"}
                                width={50}
                                height={50}
                                priority
                              />
                            </Link>
                          </div>
                          <div className={styles.blockRight}>
                            <p>{comment.masterName}</p>
                            <p>{new Date(comment.dateComments).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                    <span className={styles.br}></span>
                  </div>
                ))}
              </Modal.Body>
            </Modal>
          </>
          </>
)}
          {RentalApartments && RentalApartments.length > 0 && (
            <>
              <h3 className={styles.hbold}>{name} : {t("announcements")}</h3>

              <Slider {...settings}>
                {RentalApartments.map((apartment) => (
                  <div key={apartment.id} className={styles.cardAp}>
                    <Link href={`/${apartment.id}`}>
                      {/* <img src={apartment.Pictures?.[0]?.pictureName && `https://roombi.space/Car/${pictures[0].pictureName}`} alt={apartment.title} /> */}
                      <Image src={"https://roombi.space/Car/293.webp"} alt="title" width={150} height={150} />

                      <div>{apartment.title}</div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>
      </>

    </div>
  );
};

export default UserInfo;