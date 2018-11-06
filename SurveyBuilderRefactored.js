import React from 'react';
import * as surveyBuilderServices from "../../../services/surveyBuilderService";
import SurveyBuilderStatusDropdown from '../../components/SurveyBuilderStatusDropdown';
import SurveyBuilderSortDropdown from '../../components/SurveyBuilderSortDropdown';
import SurveyBuilderTypesDropdown from '../../components/SurveyBuilderTypesDropdown';

class SurveyBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...removing for brevity
            
        this.questionInput = this.questionInput.bind(this);
        this.questionDropdown = this.questionDropdown.bind(this);
        
        // ...removing for brevity
    }

    componentDidMount() {
        // ...removing for brevity
    }

    inputChange(event) {
        // ...removing for brevity
    }

    newSurveySection() {
        // ...removing for brevity
    }

    sectionTitleChange(event, sectionIndex) {
        // ...removing for brevity
    }

    sectionDescriptionChange(event, sectionIndex) {
        // ...removing for brevity
    }

    newSurveyQuestion(event, sectionIndex) {
        // ...removing for brevity
    }

    questionInput(event, sectionIndex, questionIndex) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const questionSection = event.target.name;

        const questionObj = JSON.parse(JSON.stringify(this.state.sections[sectionIndex].questions[questionIndex]))
        questionObj[questionSection] = value

        const newSectionsArray = JSON.parse(JSON.stringify(this.state.sections))
        newSectionsArray[sectionIndex].questions[questionIndex] = questionObj

        this.setState({
            ...this.state,
            sections: newSectionsArray
        })
    }

    questionDropdown(item, sectionIndex, questionIndex, questionType) {
        const questionObj = JSON.parse(JSON.stringify(this.state.sections[sectionIndex].questions[questionIndex]))
        questionObj[questionType] = item

        const newSectionsArray = JSON.parse(JSON.stringify(this.state.sections))

        newSectionsArray[sectionIndex].questions[questionIndex] = questionObj
        this.setState({
            ...this.state,
            sections: newSectionsArray
        })

    }

    newAnswerOption(event, sectionIndex, questionIndex) {
        const newAnswerArray = [...this.state.sections[sectionIndex].questions[questionIndex].answerOptions]
        newAnswerArray.push(
            {
                text: '',
                value: '',
                userId: 1,
                additionalInfo: 'none'
            }
        );
        const sectionsArrayCopy = JSON.parse(JSON.stringify(this.state.sections))
        sectionsArrayCopy[sectionIndex].questions[questionIndex].answerOptions = newAnswerArray;

        this.setState({
            ...this.state,
            sections: sectionsArrayCopy
        }
        );
    }

    answerChange(event, sectionIndex, questionIndex, answerIndex) {
        const answerObj = JSON.parse(JSON.stringify(this.state.sections[sectionIndex].questions[questionIndex].answerOptions[answerIndex]))
        answerObj.text = event.target.value

        const newSectionsArray = JSON.parse(JSON.stringify(this.state.sections))
        newSectionsArray[sectionIndex].questions[questionIndex].answerOptions[answerIndex] = answerObj

        this.setState({
            sections: newSectionsArray
        }
        );
    }

    saveSurvey() {
        // ...removing for brevity
    }

    render() {
        const map = this.state.sections && this.state.sections.map((sectionItem, sectionIndex) => {
            const mappedArr = sectionItem.questions.map((questionItem, questionIndex) => {
                const mappedInnerArr = questionItem.answerOptions.map((answerItem, answerIndex) => {
                    return (
                        <div>
                            <div>
                                <div className='row'>
                                    <div className="col-md-3"></div>
                                    <input type="text" className="form-control col-md-6" value={answerItem.text} onChange={(event) => this.answerChange(event, sectionIndex, questionIndex, answerIndex)} placeholder="Input Answer Here" />
                                    <i className="form-control__bar"></i></div>
                            </div>
                        </div>
                    )
                })
                return (
                    <div>
                        // ...removing for brevity
                        
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className="col-md-2"></div>
                                <span>Status Id</span>
                                <div className='col-md-2'>
                                    <SurveyBuilderStatusDropdown onChange={(dropdownItem) => this.questionDropdown(dropdownItem, sectionIndex, questionIndex, 'statusId')} /></div>
                                <span>Sort Order</span>
                                <div className='col-md-2'>
                                    <SurveyBuilderSortDropdown onChange={(dropdownItem) => this.questionDropdown(dropdownItem, sectionIndex, questionIndex, 'sortOrder')} /></div>
                                <span>Question Type</span>
                                <div className='col-md-2'>
                                    <SurveyBuilderTypesDropdown onChange={(dropdownItem) => this.questionDropdown(dropdownItem, sectionIndex, questionIndex, 'questionTypeId')} /></div>
                            </div>
                        </div>
                        <p></p>
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <form className='form-horizontal'>
                                <div className='form-group'>
                                    <label className='custom-control custom-checkbox'>
                                        <input type='checkbox' className='custom-control-input' name='isRequired' checked={questionItem.isRequired} onChange={(event) => this.questionInput(event, sectionIndex, questionIndex)} />
                                        <span className='custom-control-indicator'></span>
                                        <span className='custom-control-description'>Required</span>
                                    </label>
                                    <i className='form-control__bar'></i>
                                    <label className='custom-control custom-checkbox'>
                                        <input type='checkbox' className='custom-control-input' name='isMultipleAllowed' checked={questionItem.isMultipleAllowed} onChange={(event) => this.questionInput(event, sectionIndex, questionIndex)} />
                                        <span className='custom-control-indicator'></span>
                                        <span className='custom-control-description'>Allow Multiple Answers</span>
                                    </label>
                                    <i className='form-control__bar'></i>
                                    <label className='custom-control custom-checkbox'>
                                        <input type="text" className="form-control col-md-8" name='userId' value={questionItem.userId} onChange={(event) => this.questionInput(event, sectionIndex, questionIndex)} placeholder='Input User Id' />
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className='row'>
                            <div className="col-md-2"></div>
                            <button className="btn btn-light btn-small" onClick={(event) => this.newAnswerOption(event, sectionIndex, questionIndex)}>Add Answer</button></div>
                        <p></p>
                        {mappedInnerArr}
                    </div>
                )
            })
            return (
                <div className="card">
                    // ...removing for brevity
                </div>
            )
        })
        return (
            <React.Fragment>
           // ...removing for brevity
            </React.Fragment>
        )
    }
}


export default SurveyBuilder
