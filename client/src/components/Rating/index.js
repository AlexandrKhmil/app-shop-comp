import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { ratingNormalization } from '../../functions';

const Rating = ({ isAuth, rating, votesCount }) => {
  return (
    <div className="d-flex justify-content-between">
      <span>
        Рейтинг: 
      </span>
      <div className="d-flex">
        {rating
          ? <span className="mr-2">
              <span className="mr-1">{rating}</span>
              <span>({votesCount} голос{votesCount > 1 ? 'а' : ''})</span>
            </span>
          : <span className="mr-2">
              Нет голосов
            </span>
        }
        <div className="d-flex justify-content-center position-relative">
          <ul className={styles.starList}>
            { Array(5).fill(0).map((emptyStar, index) => 
              <li className={styles.star} key={index}>
                <img src={require('../../static/starGray.svg')} alt="Gray Star" />
              </li>
            )}
          </ul>

          { isAuth &&
            <ul className={`${styles.starList} ${styles.starListColored} ${styles.starListButtons}`}>
              { [5, 4, 3, 2, 1].map((rating, index) =>
                <li className={styles.star} key={index}>
                  <button 
                    className={styles.buttonVote}> 
                    <img src={require('../../static/star.svg')} alt="Star" />
                  </button>
                </li> 
              )}
            </ul>
          }

          <ul className={`${styles.starList} ${styles.starListColored}`}>
            {ratingNormalization(rating).map((rating, index) => 
              <li className={styles.star} key={index}>
                <img src={require('../../static/star.svg')} style={{ width: `${rating}%` }} alt="Star" />
              </li>
            )}
          </ul>  
        </div>
      </div> 
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.account.isAuth,
  rating: state.selected.data.rating || 0,
  votesCount: state.selected.data.votes,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Rating);