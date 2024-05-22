import React from 'react';
import styles from '@/app/[locale]/rentalHistory/components/rentalHistoryComp.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingDTOWithFoto, Picture, getBookings } from '@/app/services/getBookingHistoryService';
import { Card, Button, Modal, Carousel } from 'react-bootstrap';
import { postGuestComment, GuestComments } from '@/app/services/createCommentService';
import StarRatings from 'react-star-ratings';
import {decodeTokenAndGetUserDetails} from '@/app/services/jwtDecoder';
import Link from 'next/link';

interface RentalHistoryProps {
  locale: string;
}
const RentalHistory: React.FC<RentalHistoryProps> = ({ locale }) => {
  const { data: session, status: loading } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
  const [bookings, setBookings] = useState<BookingDTOWithFoto[]>([]);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = React.useState(0);
  const [ratingError, setRatingError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [apartmentId, setApartmentId] = useState<number | null>(null);

  const onStarClick = (nextValue: number, prevValue: number, name: string) => {
    setRating(nextValue);
  }
  const today = new Date();

const handleShow = (id: number) => {
  setApartmentId(id);
  setShowModal(true);
};
  const handleClose = () => {
    setShowModal(false);
    setRating(0); 
    setComment(''); 
    setRatingError('');
    setCommentError('');
  };
  const handleRatingChange = (newRating: number) => {
    setRating(newRating); 
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
  const handleAddComment = async (rating: number) => {
    let hasError = false;
    if (rating === 0) {
      setRatingError(t('errorFillRating'));
      hasError = true;
    } else {
      setRatingError('');
    }
    if (comment.trim() === '') {
      setCommentError(t('errorFillComment'));
      hasError = true;
    } else {
      setCommentError('');
    }
    if (hasError) {
      return;
    }
    const name = session?.user?.name;
    
    if (typeof name === 'string') {
      const user = decodeTokenAndGetUserDetails(name);
 
      if (!user) {
        console.error('User is not defined');
        return;
      }
      const guestComments = {
        id: 0, 
        guestIdUser: Number(user.id), 
        apartmentId: Number(apartmentId), 
        comment: comment,
        dateTime: new Date().toISOString(),
        rating: rating,
      };
      const token = session?.user?.name;
      if (typeof token === 'string') {
        await postGuestComment(guestComments, token);
        setShowModal(false); 
        fetchUserDetails(); 
      } else {
        console.error('Token is not defined or not a string');
      }
    }
  }
  const fetchUserDetails = async () => {
    if (loading === 'loading') {
      return;
    }
    if (session) {
      const username = session?.user?.name;
      if (!username) {
        console.error('Username is not defined');
        return;
      }
      const fetchedBookings = await getBookings(username);
      if (!fetchedBookings) {
        console.error('No bookings fetched');
        return;
      }
      setBookings(fetchedBookings);
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);
  if (!bookings) {
    return <div style={{ fontSize: '2em', textAlign: 'center' }}> {t('noRentalsFound')}</div>;
  }

  return (
    <div className={styles.container}>
      {bookings.map((booking, index) => {
        const checkInDate = booking.checkInDate ? new Date(booking.checkInDate) : null;
        const checkOutDate = booking.checkOutDate ? new Date(booking.checkOutDate) : null;

        return (
          <Card key={index} className={`${styles.card}`}>
          <Card.Body className={styles.cardBody}>
          <Link href={`/${booking.apartmentId}`}>
            <div className={styles.carouselContainer}>
              <Carousel>
                {booking.pictures?.map((picture: Picture, index: number) => (
                  picture.pictureUrl
                    ? <Carousel.Item key={index}>
                      <div className={styles.carouselImage}>
                    
                        <img
                          className="d-block w-100"
                          src={`https://roombi.space/Car/${picture.pictureUrl}`}
                          alt={picture.pictureName || 'Image'}
                        />
                      
                      </div>
                    </Carousel.Item>
                    : null
                ))}
              </Carousel>
              
            </div>
            </Link>
            <div className={styles.textContainer}>
              <Card.Title>{booking.titleApartment}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {t('checkIn')} {checkInDate ? checkInDate.toLocaleDateString() : ''}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {t('checkOut')} {checkOutDate ? checkOutDate.toLocaleDateString() : ''}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {t('country')} {booking.countryApartment || ''}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                {t('totalPrice')} {booking.totalPrice || ''} €
              </Card.Subtitle>
        
              {checkInDate && checkOutDate && checkInDate < today && checkOutDate < today && !booking.comment && (
                <Button variant="outline-dark" onClick={() => handleShow(booking.apartmentId)}>{t('leaveReview')}</Button>
              )}
            </div>
          </Card.Body>
        </Card>
        );
      })}

      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className={styles.center}>
              <Modal.Title>{t('leaveReview')}</Modal.Title>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '20px' }}>{t('rate')}</p>
            {ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}
            <StarRatings
              rating={rating}
              starSpacing="5px"
              starRatedColor="black"
              starHoverColor="gray"
              starEmptyColor="lightgray"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name='rating'
            />
     
            <p style={{ fontSize: '20px', marginBottom: '20px', marginTop: '20px' }}>{t('leaveReviews')}</p>
          </div>
          {commentError && <p style={{ color: 'red', textAlign: 'center' }}>{commentError}</p>}
          <textarea
            value={comment}
            onChange={handleCommentChange}
            maxLength={300}
            style={{ width: '100%', height: '100px', resize: 'vertical', maxHeight: '200px', minHeight: '100px' }}
          />
          <p style={{ textAlign: 'right', fontSize: '14px', fontWeight: 'bold', marginTop: '0' }}>
            {t('charactersLeft')}{300 - comment.length}
          </p>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button variant="outline-dark" onClick={() => handleAddComment(rating)}>
            {t('addReview')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RentalHistory;

