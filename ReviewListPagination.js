import React, { Component } from 'react'
import * as reviewsService from '../../../services/reviewsService.js';
import swal from 'sweetalert2';
import moment from 'moment';

class ReviewList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewArray: []
            , pageIndex: ''
            , totalPages: ''
            , totalCount: ''
        }

        this.pageSize = 6;
        this.pageIndex = 0;
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.pagination = this.pagination.bind(this);
    }

    componentDidMount() {
        this.readAll(this.pageIndex)  // 'this.pageIndex' default is set to page 0 
        console.log(this.response)
    }

    readAll = (page) => {
        reviewsService.readAll(page, this.pageSize)
            .then(response => {
                this.setState({
                    reviewArray: response.item.pagedItems
                    , pageIndex: page
                    , totalPages: response.item.totalPages
                })
            })
            .catch(console.log);
    }

    onEdit(id, e) {
        console.log(id)
        this.props.history.push('/review/edit/' + id);
    }

    onAdd() {
        this.props.history.push('/review/edit')
    }

    pagination(event) {
        let eventButton = event.target.id;
        console.log(eventButton);
        let page = this.state.pageIndex;

        if (eventButton === 'firstButton') {
            page = this.pageIndex  // default set at 0
            this.setState({
                pageIndex: page
            })
        } else if (eventButton === 'nextButton') {
            this.setState({
                pageIndex: page++
            })
        } else if (eventButton === 'prevButton') {
            this.setState({
                pageIndex: page--
            })
        } else if (eventButton === 'lastButton') {
            page = (this.state.totalPages) - 1
        }

        this.readAll(page)
    }

    onDelete(id, e) {
        swal({  // sweetalert2 modal popup when Delete button is clicked
            title: 'Delete Review?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            allowOutsideClick: true
        }).then((result) => {
            if (result.value) {
                swal(
                    'Review has been deleted',
                    console.log(id),
                    reviewsService.deleteById(id)  // crud DELETE axios function
                        .then(() => { this.readAll(this.state.pageIndex) })
                        .catch(console.error),
                )
            }
        })
    }

    render() {
        const array = this.state.reviewArray.map((item) => (
            <tbody key={item.id}>
                <tr>
                    <td>{item.userId}</td>
                    <td>{item.reviewerId}</td>
                    <td>{item.comments}</td>
                    <td>{item.starRating}</td>
                    <td>{moment(item.dateofInteraction).format('MM-DD-YYYY hh:mmA')}</td>
                    <td>{item.interactionTypeId}</td>
                    <td>{String(item.isVisibleByMentor)}</td>
                    <td><button className='btn btn-light btn--icon' onClick={e => this.onEdit(item.id, e)}><i className='zmdi zmdi-edit'></i></button>
                        <button className='btn btn-light btn--icon' onClick={e => this.onDelete(item.id, e)}><i className='zmdi zmdi-delete'></i></button></td>
                </tr>
            </tbody>
        ));

        return (
            <React.Fragment>
                <header className="content__title">
                    <h1>Review Database</h1>
                    <div className="actions">
                        <a className='actions__item zmdi zmdi-plus zmdi-hc-fw' onClick={this.onAdd}></a>
                        <a href="" className="actions__item zmdi zmdi-trending-up"></a>
                        <a href="" className="actions__item zmdi zmdi-check-all"></a>
                        <div className="dropdown actions__item">
                            <i data-toggle="dropdown" className="zmdi zmdi-more-vert"></i>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="" className="dropdown-item">Refresh</a>
                                <a href="" className="dropdown-item">Manage Widgets</a>
                                <a href="" className="dropdown-item">Settings</a>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="card">
                    <div className="card-body">
                        <table className='table table-inverse mb-0'>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Reviewer ID</th>
                                    <th>Comments</th>
                                    <th>Star Rating</th>
                                    <th>Date of Interaction</th>
                                    <th>Interaction Type</th>
                                    <th>Is Visible By Mentor</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {array}
                        </table>
                    </div>
                    <ul className='pagination justify-content-center'>
                        <li className='page-item pagination-first'>
                            <a className='page-link' id='firstButton' onClick={this.pagination}></a>
                        </li>
                        <li className='page-item pagination-prev'>
                            <a className='page-link' id='prevButton' onClick={this.pagination}></a>
                        </li>
                        <li className='page-item pagination-next'>
                            <a className='page-link' id='nextButton' onClick={this.pagination}></a>
                        </li>
                        <li className='page-item pagination-last'>
                            <a className='page-link' id='lastButton' onClick={this.pagination}></a>
                        </li>
                    </ul>
                </div>

            </React.Fragment>
        )
    }
}

export default ReviewList;
