import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import * as appointmentsService from '../services/appointmentsService';
import './AppointmentsCalendar.css';
import moment from 'moment';

class Calendar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            appointmentList: []
            , month: moment().format('MMMM YYYY')
            , monthNumber: moment().format('M')
        }
    }

    componentDidMount() {
        appointmentsService.readAll()
            .then(response => {
                const appointmentInfo = response.item.map((data) => {
                    return {
                        title: data.description
                        , start: data.appointmentDate
                    }
                })
                this.setState({
                    appointmentList: appointmentInfo
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="calendar card fc fc-unthemed fc-ltr">
                    <div className='fc-header-toolbar fc-toolbar' data-calendar-month={this.state.monthNumber - 1}>
                        <div className='fc-view-container'>
                            <FullCalendar
                                id="appointmentCalendar"
                                navLinks={true} // can click day/week names to navigate views
                                editable={true}
                                eventLimit={true} // allow "more" link when too many events
                                events={this.state.appointmentList}  // renders API appointment details
                                eventClick={function (calEvent, jsEvent, view, resourceObj) { alert(calEvent.title) }}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Calendar;
