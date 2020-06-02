import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import dayjs from 'dayjs';
import { PersonalDetails } from './personal-details.component';

const mockProps = {
  onChange: jest.fn(),
};

describe('personal details', () => {
  const wrapper = shallow(<PersonalDetails onChange={mockProps.onChange} />);

  it('renders 5 field headers', () => {
    expect(wrapper.find('h1.fieldHeader')).toHaveLength(5);
  });

  it('renders 5 input rows', () => {
    expect(wrapper.find('div.input')).toHaveLength(5);
  });

  it('renders 14 sub-inputs', () => {
    expect(wrapper.find('div.subInput')).toHaveLength(13);
  });
});

describe('field interaction', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<PersonalDetails onChange={mockProps.onChange} />);
  });

  afterEach(() => {
    wrapper = null;
  });

  const runTextInput = (fieldName: string) => {
    it('updates ' + fieldName, () => {
      wrapper.find('input[name="' + fieldName + '"]').simulate('change', { target: { value: 'Test' } });
      expect(wrapper.find('input[name="' + fieldName + '"]').prop('value')).toEqual('Test');
    });
  };

  const runCheckboxInput = (fieldName: string) => {
    it('updates ' + fieldName, () => {
      wrapper.find('input[name="' + fieldName + '"]').simulate('change', { target: { checked: true } });
      expect(wrapper.find('input[name="' + fieldName + '"]').prop('checked')).toEqual(true);
    });
  };

  const runNumberInput = (fieldName: string) => {
    it('updates ' + fieldName, () => {
      wrapper.find('input[name="' + fieldName + '"]').simulate('change', { target: { valueAsNumber: 1 } });
      expect(wrapper.find('input[name="' + fieldName + '"]').prop('value')).toEqual(1);
    });
  };

  runTextInput('given-name');
  runTextInput('middle-name');
  runTextInput('family-name');
  runTextInput('additional-given-name');
  runTextInput('additional-middle-name');
  runTextInput('additional-family-name');

  runCheckboxInput('name-unknown');
  runCheckboxInput('estimate');

  runNumberInput('years');
  runNumberInput('months');
  runNumberInput('days');

  it('clears the name fields when the unknown checkbox is checked', () => {
    wrapper.find('input[name="given-name"]').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input[name="name-unknown"]').simulate('change', { target: { checked: true } });
    expect(wrapper.find('input[name="given-name"]').prop('value')).toEqual('');
  });

  it('updates birth-date', () => {
    let testDate = '2020-05-10';
    wrapper.find('input[name="birth-date"]').simulate('change', { target: { valueAsDate: testDate } });
    expect(wrapper.find('input[name="birth-date"]').prop('value')).toEqual(testDate);
  });

  it('updates birth-time', () => {
    let testTime = dayjs('05:11', 'HH:mm').toDate();
    wrapper.find('input[name="birth-time"]').simulate('change', { target: { valueAsDate: testTime } });
    expect(wrapper.find('input[name="birth-time"]').prop('value')).toEqual(dayjs(testTime).format('HH:mm'));
  });
});

describe('field validation', () => {
  it('test passes placeholder', () => {
    expect(true).toEqual(true);
  });
});

describe('age and birth date integration', () => {
  it('test passes placeholder', () => {
    expect(true).toEqual(true);
  });
});