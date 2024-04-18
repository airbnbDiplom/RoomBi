import React from 'react';
import styles from '@/app/[locale]/editProfile/components/editProfileComp.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { User, updateUser } from '@/app/services/updateUserService';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
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
import { } from 'react-bootstrap-icons';
import Modal from 'react-modal';
import { saveFoto } from "@/app/services/fotoServices";
import { createProfile } from '@/app/services/createProfileService';
import { getProfile } from '@/app/services/GetProfileService';
import { delAvatar } from '@/app/services/delPhotoService';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
class Profile {
  [key: string]: string | ((key: string, value: string) => void) | undefined;
  schoolYears?: string; // Где прошли мои школьные годы
  pets?: string; // Мои питомцы
  job?: string; // Моя работа
  myLocation?: string; // Где я живу
  myLanguages?: string; // Языки, на которых я говорю
  generation?: string; // Из какого я поколения
  favoriteSchoolSong?: string; // Любимая песня в школе
  passion?: string; // Что я безумно люблю
  interestingFact?: string; // Интересный факт обо мне
  uselessSkill?: string; // Мой самый бесполезный навык
  biographyTitle?: string; // Так можно было бы назвать мою биографию
  dailyActivity?: string; // Что я делаю часами
  aboutMe?: string; // Oбо мне
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async updateProfile(key: string, value: string) {
    this[key] = value;

    await createProfile(this, this.token);
  }
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    height: 'auto',
    borderRadius: '12px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
interface EditProfileProps {
  locale: string;
}
const EditProfile: React.FC<EditProfileProps> = ({ locale }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [maxLength, setMaxLength] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputLength, setInputLength] = useState(0);
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
  const [switchState, setSwitchState] = useState("Off");
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  const [fileData, setFileData] = useState(new FormData());

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const input = event.target;

    if (input.files != null && input.files.length > 0) {
      const selectedFile = input.files[0];
      console.log("selectedFile", selectedFile);
      if (selectedFile) {
        let updatedFileData = new FormData();
        updatedFileData.append("upload", selectedFile);
        updatedFileData.append("folder", "avatar");
        setFileData(updatedFileData);
        await sub(updatedFileData);
        input.value = '';
      }
    }
  };
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
  const sub = async (fileData: FormData) => {
    const saveFotoResponse = await saveFoto(fileData);
    if (saveFotoResponse && saveFotoResponse.file_name) {
      let token = session?.user?.name || "";
      const userDetails = decodeTokenAndGetUserDetails(token);
      const updatedUser: User = {
        ...currentUser,
        Email: userDetails?.email,
        ProfilePicture: saveFotoResponse.file_name,
      };
      console.log("updatedUser", updatedUser);

      try {
        const response = await updateUser(updatedUser, token);
        console.log(response);
        if (response?.token && response.refreshToken) {
          const { token, refreshToken } = response;
          await signIn(
            'credentials',
            {
              token: token,
              refreshToken: refreshToken,
              redirect: false,
            }
          )
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
    console.log("res 3", saveFotoResponse);
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }


    }
    fetchUserDetails();
  }, [loading, session]);
  let token = session?.user?.name || "";
  let profile = new Profile(token);
  function updateProfile(modalTitle: string, inputValue: string) {
    profile.updateProfile(modalTitle, inputValue);
  }
  useEffect(() => {
    async function fetchProfile() {
      const profile = await getProfile(token);

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
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    setInputLength(event.target.value.length);
    console.log('inputValue', inputValue);
  };
  const openModalWithContent = (title: string, message: string, inputLabel: string, maxLength: number, initialValue: string) => () => {
    setTitle(title);
    setMessage(message);
    setInputLabel(inputLabel);
    setMaxLength(maxLength);
    setInputValue(initialValue);
    setInputLength(initialValue.length);
    openModal();
  };
  function handleSwitchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSwitchState(event.target.checked ? "On" : "Off");
  }
  const { t } = useTranslation();
  function handleSave(event: React.MouseEvent<HTMLButtonElement>) {
    const value = inputValue;
    const value2 = switchState;
    console.log("inputValue", inputValue);
    console.log('value', value);
    console.log('value2', value2);

    switch (title) {
      case t('whereDidYouStudy'):
        setSchoolYears(value);
        console.log('schoolYears', value);
        profile.updateProfile('schoolYears', value);
        break;
      case t('whatDoYouDo'):
        setJob(value);
        profile.updateProfile('job', value);
        break;
      case t('whereDoYouLive'):
        setLocation(value);
        profile.updateProfile('myLocation', value);
        break;
      case t('whichLanguagesDoYouSpeak'):
        setLanguages(value);
        profile.updateProfile('myLanguages', value);
        break;
      case t('yourBirthTime'):
        setGeneration(value2);
        profile.updateProfile('generation', value2);
        break;
      case t('favoriteSchoolSong'):
        setFavoriteSong(value);
        profile.updateProfile('favoriteSchoolSong', value);
        break;
      case t('whatDoYouLike'):
        setPassion(value);
        profile.updateProfile('passion', value);
        break;
      case t('shareInterestingFact'):
        setFact(value);
        profile.updateProfile('interestingFact', value);
        break;
      case t('uselessSkill'):
        setSkill(value);
        profile.updateProfile('uselessSkill', value);
        break;
      case t('mottoOrBiography'):
        setBiography(value);
        profile.updateProfile('biographyTitle', value);
        break;
      case t('whatYouDoForHours'):
        setActivity(value);
        profile.updateProfile('dailyActivity', value);
        break;
      case t('aboutYou'):
        setAbout(value);
        profile.updateProfile('aboutMe', value);
        break;
      case t('doYouHavePets'):
        setPets(value);
        profile.updateProfile('pets', value);
        break;
      default:
        console.error(`${t('unknownTitle')}: ${title}`);
    }
    closeModal();
  }

  const deleteAvatar = async () => {
    if (!userDetails || !userDetails.profilePicture) {
      console.error('No avatar to delete');
      return;
    }

    try {
      const response = await delAvatar(userDetails.profilePicture);
      if (response.status === 'File deleted successfully') {
        try {
          let token = session?.user?.name || "";
          const userDetails = decodeTokenAndGetUserDetails(token);
          const updatedUser: User = {
            ...currentUser,
            Email: userDetails?.email,
            ProfilePicture: "no",
          };
          const response = await updateUser(updatedUser, token);
          console.log(response);
          if (response?.token && response.refreshToken) {
            const { token, refreshToken } = response;
            await signIn(
              'credentials',
              {
                token: token,
                refreshToken: refreshToken,
                redirect: false,
              }
            )
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      } else {
        console.error('Failed to delete avatar:', response.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [user, setUser] = useState<User>({
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
  });
  const userDetails = decodeTokenAndGetUserDetails(token);

  return (
    <div className={styles.container1}>
      <div className={styles.leftBlock1}>
        {userDetails && userDetails.profilePicture && userDetails.profilePicture !== "no"
          ? (
            <>
              <div>
                <img src={`https://roombi.space/Avatar/${userDetails.profilePicture}`} className={styles.circle1} />
              </div>
              <button onClick={deleteAvatar} className={styles.button1}>
                <CameraFill />
                {t('delete')}
              </button>
            </>
          )
          : (
            <>
              <div className={styles.circle1}>K</div>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                id="fileInput"
                onChange={onFileSelected}
                style={{ display: 'none' }}
              />
              <label htmlFor="fileInput" className={styles.button1}>
                <CameraFill />
                {t('add')}
              </label>
            </>
          )
        }
      </div>
      <div className={styles.rightBlock1}>
        <div className={styles.profileHeader}>
          <h1>{t('profile')}</h1>
          <p>{t('betterKnow')}</p>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whereDidYouStudy"),
  t("schoolOrCollege"),
  t("whereDidMySchoolYearsPass"),
  40,
  schoolYears)}>
          <Mortarboard className={styles.icon} />
          <div className={styles.textContainer}>
          {t('schoolYears')}{schoolYears !== "" && ":"}
            {schoolYears !== "" && <p>{schoolYears}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whatDoYouDo"),
  t("whatIsYourProfession"),
  t("myJob1"),
  40,
  job
)}>
          <Briefcase className={styles.icon} />
          <div className={styles.textContainer}>
          {t('myJob')}{job !== "" && ":"}
            {job !== "" && <p>{job}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whereDoYouLive"),
  t("writeYourCity"),
  t("myCity"),
  40,
  location
)}>
          <GlobeEuropeAfrica className={styles.icon} />
          <div className={styles.textContainer}>
          {t('whereILive')}{location !== "" && ":"}
            {location !== "" && <p>{location}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whichLanguagesDoYouSpeak"),
  t("listLanguages"),
  t("languages"),
  40,
  languages
)}>
          <Globe2 className={styles.icon} />
          <div className={styles.textContainer}>
          {t('languagesISpeak')}{languages !== "" && ":"}
            {languages !== "" && <p>{languages}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("yourBirthTime"),
  t("dontWorry"),
  t("whichGeneration"),
  40,
  generation
)}>
          <GenderFemale className={styles.icon} />
          <div className={styles.textContainer}>
          {t('myGeneration')}{generation !== "" && ":"}
            {generation !== "" && <p>{generation}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("favoriteSchoolSong"),
  t("dontBeShy"),
  t("favoriteSchoolSongLabel"),
  40,
  favoriteSong
)}>
          <MusicNoteBeamed className={styles.icon} />
          <div className={styles.textContainer}>
          {t('favoriteSongInSchool')}{favoriteSong !== "" && ":"}
            {favoriteSong !== "" && <p>{favoriteSong}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whatDoYouLike"),
  t("tellAboutYourPassion"),
  t("whatILove1"),
  40,
  passion
)}>
          <Heart className={styles.icon} />
          <div className={styles.textContainer}>
          {t('whatILove')}{passion !== "" && ":"}
            {passion !== "" && <p>{passion}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("shareInterestingFact"),
  t("rememberUniqueFact"),
  t("interestingFactAboutMe1"),
  40,
  fact
)}>
          <Lightbulb className={styles.icon} />
          <div className={styles.textContainer}>
          {t('interestingFactAboutMe')}{fact !== "" && ":"}
            {fact !== "" && <p>{fact}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("uselessSkill"),
  t("tellAboutUselessSkill"),
  t("myMostUselessSkill"),
  40,
  skill
)}>
          <Magic className={styles.icon} />
          <div className={styles.textContainer}>
          {t('myUselessSkill')}{skill !== "" && ":"}
            {skill !== "" && <p>{skill}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("mottoOrBiography"),
  t("imagineSomeoneWritingBook"),
  t("storyOfMyLife1"),
  40,
  biography
)}>
          <Book className={styles.icon} />
          <div className={styles.textContainer}>
          {t('storyOfMyLife')}{biography !== "" && ":"}
            {biography !== "" && <p>{biography}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("whatYouDoForHours"),
  t("tellAboutFavoriteActivities"),
  t("whatIDoForHours1"),
  40,
  activity
)}>
          <Clock className={styles.icon} />
          <div className={styles.textContainer}>
          {t('whatIDoForHours')}{activity !== "" && ":"}
            {activity !== "" && <p>{activity}</p>}
          </div>
        </div>
        <div className={styles.cell1} onClick={openModalWithContent(
  t("doYouHavePets"),
  t("ifYesTellAboutThem"),
  t("myPets1"),
  40,
  pets
)}>
          <img src="/icon/paw.png" alt="paws" />
          <div className={styles.textContainer}>
          {t('myPets')}{pets !== "" && ":"}
            {pets !== "" && <p>{pets}</p>}
          </div>
        </div>

        <div className={styles.aboutSection}>
          <h1>{t('aboutYou')}</h1>
          <div className={styles.dashedBorder}>
          <p>{t("writeSomethingInteresting")}</p>
<a href="#" style={{ color: 'black', fontWeight: 'bold' }} onClick={openModalWithContent(
  t("aboutYou"),
  t("guestsAndHostsWantToKnow"),
  t("aboutYouLabel"),
  450,
  about
)}>
              {t('addStoryAboutYou')}
            </a>
            {about !== "" && <p>{about}</p>}
          </div>
        </div>
        <div className={styles.readyBut}>
          <button className={styles.readyButton} onClick={() => window.location.href = '/profilePage'}>   {t('ready')}</button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          backgroundColor: 'white',
          border: 'none',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease'
        }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'lightgray'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >X</button>
        <h2 style={{ marginRight: '15px' }}>{title}</h2>
        <p style={{ color: '#707070' }}>{message}</p>
        {title === t('birthTime') ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>{t('showDecade')}</div>
              <div style={{ fontSize: '14px', color: 'gray' }}>{t('bornIn90s')}</div>
            </div>
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={handleSwitchChange}
              style={{
                fontSize: '1.4rem',
                color: 'red',
                transform: 'scale(1.2)',
                display: 'flex',
                flexDirection: 'column',
                marginRight: '20px',
              }}
            />
          </div>
        ) : title === t('aboutYou') ? (
          <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder={inputLabel}
                maxLength={maxLength}
                autoComplete="off"
                onChange={handleInputChange}
                style={{ maxHeight: '600px' }}
              />
            </Form.Group>
            <div className="text-end mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: 'gray', marginTop: '3px' }}>
            {t('characters')}: {inputLength} {t('outof')} {maxLength}
            </div>
          </div>
        ) : (
          <div>
            <Form.Floating>
              <Form.Control
                id="floatingInput"
                type="text"
                placeholder={inputLabel}
                maxLength={maxLength}
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInput">{inputLabel}</label>
            </Form.Floating>
            <div className="text-end mb-3" style={{ fontSize: '14px', fontWeight: 'bold', color: 'gray', marginTop: '3px' }}>
            {t('characters')}: {inputLength} {t('outof')} {maxLength}
            </div>
          </div>
        )}
        <hr />
        <div className="text-end">
          <Button variant="dark" onClick={handleSave}>{t('save')}</Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;

