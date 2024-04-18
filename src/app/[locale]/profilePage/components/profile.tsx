import React from 'react';
import styles from './profile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { User, updateUser } from '@/app/services/updateUserService';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { getProfile } from '@/app/services/GetProfileService';
import Link from 'next/link';
import { CameraFill, Hr } from 'react-bootstrap-icons';
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
interface ProfileProps {
  locale: string;
}

const Profile: React.FC<ProfileProps> = ({ locale }) => {
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

  let profile;
  useEffect(() => {
    async function fetchProfile() {
      let token = session?.user?.name || "";
      profile = await getProfile(token);
      console.log('profile', profile);
      if (profile) {
        setSchoolYears(profile.schoolYears || "");
        setJob(profile.job || "");
        setLocation(profile.myLocation || "");
        setLanguages(profile.myLanguages || "");
        setGeneration(profile.generation || "");
        setFavoriteSong(profile.favoriteSchoolSong || "");
        setPassion(profile.passion || "");
        setFact(profile.interestingFact || "");
        setSkill(profile.uselessSkill || "");
        setBiography(profile.biographyTitle || "");
        setActivity(profile.dailyActivity || "");
        setAbout(profile.aboutMe || "");
        setPets(profile.pets || "");
      }
    }

    fetchProfile();
  }, []);

  const { t } = useTranslation();
  let currentUser: User = {
    Id: 0,
    Name: '',
    Password: '',
    Email: '',
    Address: '',
    PhoneNumber: '',
    DateOfBirth: new Date(),
    AirbnbRegistrationYear: new Date(),
    ProfilePicture: '',
    CurrentStatus: false,
    UserStatus: false,
    RefreshToken: '',
    Language: '',
    Country: '',
  };
  const [userDetails, setUserDetails] = useState({ name: '', email: '', yearsOnSite: '' });
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }

      const token = session?.user?.name;
      const details = decodeTokenAndGetUserDetails(token || '');
      console.log('details', details);
      let userDetails = { name: '', email: '', yearsOnSite: '' };

      if (details) {
        if (details.firstName && details.lastName) {
          userDetails = {
            name: `${details.firstName} ${details.lastName}`,
            email: details.email,
            yearsOnSite: userDetails.yearsOnSite
          };
        } else {
          userDetails = {
            name: '',
            email: details.email,
            yearsOnSite: userDetails.yearsOnSite
          };
        }
        const registrationDate = new Date(details.airbnbRegistrationYear);
        const now = new Date();
        // const years = differenceInYears(now, registrationDate);
        // const months = differenceInMonths(now, registrationDate) % 12;
        // const days = differenceInDays(now, registrationDate) % 365 % 30;

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
          userDetails.yearsOnSite = `${years} ${yearsText}`;
        } else if (months > 0) {
          userDetails.yearsOnSite = `${months} ${monthsText}`;
        } else if (days > 0) {
          userDetails.yearsOnSite = `${days} ${daysText}`;
        } else if (days === 0) {
          userDetails.yearsOnSite = `${1} ${'day'}`;
        }
      }
      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, [loading, session]);
  let token1 = session?.user?.name || "";
  const usDetails = decodeTokenAndGetUserDetails(token1);

  return (
    <div className={styles['grid-container']}>
      <div className={`${styles.card} ${styles.card1} ${styles.roundedShadow}`}>
        <div
        >
          {usDetails && usDetails.profilePicture && usDetails.profilePicture !== "no" ? (
             <div className={styles.circle}>
            <img src={`https://roombi.space/Avatar/${usDetails.profilePicture}`} alt="Profile" className={styles.circle}/>
            </div>
          ) : (
            <div className={styles.circle}>
              <h1 className={styles.centerAlign}>{userDetails && userDetails.name.charAt(0)}</h1>
            </div>
          )}
          <div className={styles.centerAlign}>{userDetails.name}</div>
          <p className={styles.centerAlign}>Гость</p>
        </div>
        <div className={`${styles.rightSide} ${styles.centerContent}`}>
          <div className={styles.rightAlign}>{userDetails.yearsOnSite}</div>
          <div className={styles.rightAlign}>на сайте RoomBi</div>
        </div>
      </div>
      {schoolYears !== "" || job !== "" || location !== "" || languages !== "" || generation !== "" || favoriteSong !== "" || passion !== "" 
      || fact !== "" || skill !== "" || biography !== "" || activity !== "" || about !== "" || pets !== "" ? (
        <>
          <div >
            <Link href="/editProfile">
              <button className="btn btn-outline-dark" style={{ alignSelf: 'flex-start' }}>Редактировать профиль</button>
            </Link>
            {schoolYears !== "" && (
              <div>
                <Mortarboard className={styles.icon} />
                  Где прошли мои школьные годы: {schoolYears}
              </div>
            )}
            {job !== "" && (
              <div>
                <Briefcase className={styles.icon} />
                <div className={styles.textContainer}>
                  Моя работа сейчас: {job}
                </div>
              </div>
            )}
            {location !== "" && (
              <div>
                <GlobeEuropeAfrica className={styles.icon} />
                <div className={styles.textContainer}>
                  Где я живу сейчас: {location}
                </div>
              </div>
            )}
            {languages !== "" && (
              <div>
                <Globe2 className={styles.icon} />
                <div className={styles.textContainer}>
                  Языки, на которых я говорю или понимаю: {languages}
                </div>
              </div>
            )}
            {generation !== "" && (
              <div>
                <GenderFemale className={styles.icon} />
                <div className={styles.textContainer}>
                  Из какого я поколения: {generation}
                </div>
              </div>
            )}
            {favoriteSong !== "" && (
              <div>
                <MusicNoteBeamed className={styles.icon} />
                <div className={styles.textContainer}>
                  Любимая песня в школе: {favoriteSong}
                </div>
              </div>
            )}
            {passion !== "" && (
              <div>
                <Heart className={styles.icon} />
                <div className={styles.textContainer}>
                  Что я безумно люблю: {passion}
                </div>
              </div>
            )}
            {fact !== "" && (
              <div>
                <Lightbulb className={styles.icon} />
                <div className={styles.textContainer}>
                  Интересный факт обо мне: {fact}
                </div>
              </div>
            )}
            {skill !== "" && (
              <div>
                <Magic className={styles.icon} />
                <div className={styles.textContainer}>
                  Мой самый бесполезный навык: {skill}
                </div>
              </div>
            )}
            {biography !== "" && (
              <div>
                <Book className={styles.icon} />
                <div className={styles.textContainer}>
                  История моей жизни: {biography}
                </div>
              </div>
            )}
            {activity !== "" && (
              <div>
                <Clock className={styles.icon} />
                <div className={styles.textContainer}>
                  Что я делаю часами: {activity}
                </div>
              </div>
            )}
            {pets !== "" && (
              <div>
                <img src="/icon/paw.png" alt="paws" />
                <div className={styles.textContainer}>
                  Мои питомцы: {pets}
                </div>
              </div>
            )}
            {about !== "" && (
              <div className={styles.textContainer}>
                Обо мне: {about}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={`${styles.card} ${styles.card2} ${styles.topMarginLine}`}>
        <h2>{t("timeToFillProfile")}</h2>
        <p>{t("profileOnRoombi")}</p>
        <Link href="/editProfile">
          <button className="btn btn-danger" style={{ alignSelf: 'flex-start' }}>{t("createProfile")}</button>
        </Link>
      </div>
      )}
    </div>
  );
};

export default Profile;