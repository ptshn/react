		
import React from 'react';
import Select from 'react-select';
class SurveyBuilderSortDropDown extends React.Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }
    onSelect = dropdownItem => {
        console.log(dropdownItem)
        this.props.onChange(dropdownItem.value)
    }
    render() {
        const customStyles = {
            option: (base, state) => ({
                borderBottom: '1px dotted gray',
                padding: 8,
                ...base,
                color: state.isFocused ? 'blue' : 'black',
            }),
        }
        const sortOrderOptions = [
            { value: 0, label: 0 },
            { value: 1, label: 1 },
            { value: 2, label: 2, },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
        ]
        return (
            <Select
                styles={customStyles}
                options={sortOrderOptions}
                onChange={dropdownItem => this.onSelect(dropdownItem)}
            />
        )
    }
}
export default SurveyBuilderSortDropDown;
