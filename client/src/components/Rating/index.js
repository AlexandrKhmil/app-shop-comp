import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { ratingNormalization } from '../../functions';
import { rateAdd } from '../../actions/rate';

const Rating = ({ isAuth, rating, votesCount, rateAdd, link, token }) => { 
  return (
    <div className="d-flex justify-content-between">
      <span>
        Рейтинг: 
      </span>
      <div className="d-flex">
        {rating
          ? <span className="mr-2">
              <span className="mr-1">{String(rating).slice(0, 4)}</span>
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
              { [5, 4, 3, 2, 1].map((item, index) =>
                <li className={styles.star} key={index}>
                  <button 
                    className={styles.buttonVote}
                    onClick={() => rateAdd({ token, link, value: item})}> 
                    <img src={require('../../static/star.svg')} alt="Star" />
                  </button>
                </li> 
              )}
            </ul>
          }

          <ul className={`${styles.starList} ${styles.starListColored}`}>
            {ratingNormalization(rating).map((item, index) => 
              <li className={styles.star} key={index}>
                <img src={require('../../static/star.svg')} style={{ width: `${item}%` }} alt="Star" />
              </li>
            )}
          </ul>  
        </div>
      </div> 
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  isAuth: state.account.isAuth,
  rating: state.selected.data.rate || 0,
  votesCount: state.selected.data.votes,
  link: props.link,
  token: state.account.token,
});

const mapDispatchToProps = (dispatch) => ({
  rateAdd: (value) => dispatch(rateAdd(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rating);