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
          <p className={styles.centerAlign}>{t("Guest")}</p>
        </div>
        <div className={`${styles.rightSide} ${styles.centerContent}`}>
          <div className={styles.rightAlign}>{userDetails.yearsOnSite}</div>
          <div className={styles.rightAlign}>{t("onRoomBiSite")}</div>
        </div>
      </div>
      {schoolYears !== "" || job !== "" || location !== "" || languages !== "" || generation !== "" || favoriteSong !== "" || passion !== "" 
      || fact !== "" || skill !== "" || biography !== "" || activity !== "" || about !== "" || pets !== "" ? (
        <>
          <div className={`${styles.card6}`}>
            <Link href="/editProfile">
              <button className="btn btn-outline-dark" style={{ alignSelf: 'flex-start' , width: '100%'}}>{t("editProfile")}</button>
            </Link>
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
                <img src="/icon/paw.png" alt="paws" className={styles.icon1}/>
                {t("myPets1")} {pets}
              </div>
            )}
            {about !== "" && (
              <div className={styles.pad}>
               {t("aboutMe")}: {about}
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