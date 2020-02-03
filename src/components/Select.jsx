import React from 'react';

import Form from 'react-bootstrap/Form';

const Select = (props) => {
  const {
    options,
    value,
    label,
    loading,
    onChangeValue,
    placeholder
  } = props;

  return(
    <Form>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as='select'
          value={loading ? '' : value}
          onChange={value => onChangeValue(value, true)}
          style={{width:'15%'}}
          disabled={loading ? true: false}
        >
          <option value='' disabled hidden>{placeholder}</option>
          {
            options.map((item, index) => 
              <option 
                value={item.id}
                key={`${item.name}-${index}`}
              >
                {item.name}
              </option>
            )
          }
        </Form.Control>
      </Form.Group>
    </Form>
    )
}

export default Select;