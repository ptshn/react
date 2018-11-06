import React from 'react';
import * as reviewsService from '../services/reviewsService';
import StarRatings from 'react-star-ratings';

class Ratings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ratingsArray: []
        }
        this.onProfileSelect = this.onProfileSelect.bind(this);
    }

    componentDidMount() {
        reviewsService.readAllAvgRating()
        .then(response => {
            this.setState({
                ratingsArray: response.items
            })
        })
        .catch(console.error)
    }

    onProfileSelect(id) {
        this.props.history.push(`/user-profile/${id}/?tab=ratings`)
    }

    render() {
        const overflowSettings = {
            maxHeight: '350x',
            overflow: 'hidden'
        }

        const ratingsList = this.state.ratingsArray.map((user) => {
            return (
                <div style={overflowSettings} className='col-sm-4 col-md-3 notes__item'>
                    <div className='card' align='center'>
                        <div className='card-body body-profile body-hover' onClick={e => { this.onProfileSelect(user.reviewerId, e) }}>
                            <img className='card-img-bottom' src={user.imageUrl} style={{ width: '200px', height: '200px' }} />
                            <div style={{ padding: '20px 0px 0px 0px' }}>
                                <h6>{user.firstName} {user.lastName}</h6>
                                <StarRatings rating={user.avgRating} starRatedColor='#FFD700' numberOfStars={5} name='rating' starDimension='20px' />
                                <p><b>{user.avgRating} stars</b></p>
                                <br />
                                <p><a target='_blank'>View Profile</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        
        return (
            <React.Fragment>
                <header className='content__title'>
                    <h1>Ratings For Coaches and Mentors</h1>
                </header>
                <div className='row notes'>
                {ratingsList}
                </div>
            </React.Fragment>
        )

    }
}

export default Ratings
