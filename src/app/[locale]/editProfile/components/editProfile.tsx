import React from 'react';
import styles from '@/app/[locale]/editProfile/components/editProfileComp.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { User, updateUser } from '@/app/services/updateUserService';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { CameraFill } from 'react-bootstrap-icons';
import { Mortarboard } from 'react-bootstrap-icons';
import { Briefcase } from 'react-bootstrap-icons';
import { Globe2 } from 'react-bootstrap-icons';
import { GlobeEuropeAfrica } from 'react-bootstrap-icons';
import { GenderFemale } from 'react-bootstrap-icons';
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import { Heart } from 'react-bootstrap-icons';
import { Lightbulb } from 'react-bootstrap-icons';
import { Highlighter } from 'react-bootstrap-icons';
import { Book } from 'react-bootstrap-icons';
import { Clock } from 'react-bootstrap-icons';
import {  } from 'react-bootstrap-icons';
interface EditProfileProps {
  locale: string;
}
const EditProfile: React.FC<EditProfileProps> = ({ locale }) => {
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
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (loading === 'loading') {
        return;
      }

      
    }
    fetchUserDetails();
  }, [loading, session]);


  return (
    <div className={styles.container1}>
    <div className={styles.leftBlock1}>
      <div className={styles.circle1}>K</div>
      <button className={styles.button1}>
  <CameraFill />
  Добавить
</button>
    </div>
    <div className={styles.rightBlock1}>
    <div className={styles.profileHeader}>
    <h1>Профиль</h1>
    <p>Всё, что вы расскажете, поможет другим гостям и хозяевам узнать вас получше.</p>
  </div>
    <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Mortarboard /> Школьные годы
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Briefcase /> Моя работа
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <GlobeEuropeAfrica /> Где я живу
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Globe2 /> Языки, на которых я говорю
  </div>

  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <GenderFemale /> Из какого я поколения
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <MusicNoteBeamed /> Любимая песня в школе
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Heart /> Что я безумно люблю
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Lightbulb /> Интересный факт обо мне
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Highlighter /> Мой самый бесполезный навык
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Book /> История моей жизни
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
    <Clock /> Что я делаю часами
  </div>
  <div className={styles.cell1} onClick={() => alert('Clicked')}>
  <i className="fas fa-paw"></i> Питомцы
  </div>
    </div>
  </div>
  );
};

export default EditProfile;