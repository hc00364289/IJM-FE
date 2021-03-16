import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';

//import messages from './messages';
import { FormSubmitButton, Button } from '../button';
import { Dropdown } from '../dropdown';
import { UserCountrySelect } from '../formInputs';
import { LocaleSelector } from '../localeSelect';
import { SwitchToggle, RadioField } from '../formInputs';
import { pushUserDetails } from '../../store/actions/auth';
import { fetchLocalJSONAPI, pushToLocalJSONAPI } from '../../network/genericJSONRequest';
import { getEditors } from '../../utils/editorsList';
import { CheckIcon, CloseIcon } from '../svgIcons';
//import { Document, Page } from 'react-pdf';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
export function getOccupations() {
  let occupations = [
    {
      label: 'Information Technology',
      value: 'IT',
    },
    {
      label: 'GovernmentSector',
      value: 'Govt',
    },
    {
      label: 'Manufacturing',
      value: 'Manufacturing',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ];

  return occupations;
}
export function getPopertyEnquiryByList() {
  let getPopertyEnquiryForList = [
    {
      label: 'Self',
      value: 'Self',
    },
    {
      label: 'Agent',
      value: 'Agent',
    },
    {
      label: 'Acting On behalf of Purchaser',
      value: 'Acting On behalf of Purchaser',
    },
  ];

  return getPopertyEnquiryForList;
}

export function getIncomeLevels() {
  let incomelevels = [
    {
      label: '5 to 10 Lakhs',
      value: '5 to 10 Lakhs',
    },
    {
      label: '10 to 25 Lakhs',
      value: '10 to 25 Lakhs',
    },
    {
      label: '25 to 50 Lakhs',
      value: '20 to 50 Lakhs',
    },
    {
      label: 'Above 50 Lakhs',
      value: 'Above 50 Lakhs',
    },
  ];

  return incomelevels;
}
export function heardAboutList() {
  let heardAboutList = [
    {
      label: 'Freinds/Relatives',
      value: 'Freinds/Relatives',
    },
    {
      label: 'Agents',
      value: 'Agents',
    },
    {
      label: 'Visual Media',
      value: 'Visual Media',
    },
    {
      label: 'Website',
      value: 'Website',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ];

  return heardAboutList;
}
export function propertyTypes() {
  let propertyTypes = [
    {
      label: 'Residentials',
      value: 'Residentials',
    },
    {
      label: 'Commercials',
      value: 'Commercials',
    },
  ];

  return propertyTypes;
}
export function interestedPropertySizeList() {
  let interestedPropertySizeList = [
    {
      label: '1 BHK',
      value: '1 BHK',
    },
    {
      label: '2 BHK',
      value: '2 BHK',
    },
    {
      label: '2.5 BHK',
      value: '2.5 BHK',
    },
    {
      label: '3 BHK',
      value: '3 BHK',
    },
    {
      label: '4 BHK',
      value: '4 BHK',
    },
    {
      label: '5 BHK',
      value: '5 BHK',
    },
    {
      label: '3 BHK Duplex',
      value: '3 BHK Duplex',
    },
    {
      label: '4 BHK Duplex',
      value: '4 BHK Duplex',
    },
  ];

  return interestedPropertySizeList;
}

export function bankLoanType() {
  let bankLoanTypeList = [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
    {
      label: 'Not Sure',
      value: 'Not Sure',
    },
  ];

  return bankLoanTypeList;
}
export function propertyConstructionTimeLine() {
  let propertyConstructionTimeLineList = [
    {
      label: 'Immedialtely',
      value: 'Immedialtely',
    },
    {
      label: 'Next 3 Months',
      value: 'Next 3 Months',
    },
    {
      label: 'Next 6 Months',
      value: 'Next 6 Months',
    },
    {
      label: 'Not Sure',
      value: 'Not Sure',
    },
  ];

  return propertyConstructionTimeLineList;
}

export function propertyBudgetTypes() {
  let propertyBudgetTypeList = [
    {
      label: 'Below 50 Lakhs',
      value: 'Below 50 Lakhs',
    },
    {
      label: '50 to 75 Lakhs',
      value: '50 to 75 Lakhs',
    },
    {
      label: '75 Lakhs to 1 Crore',
      value: '75 Lakhs to 1 Crore',
    },
    {
      label: 'Above 1 Crore',
      value: 'Above 1 Crore',
    },
  ];

  return propertyBudgetTypeList;
}

export function propertySizes() {
  let propertySizesList = [
    {
      label: 'Below 1000 Sft',
      value: 'Below 1000 Sft',
    },
    {
      label: '1000-1500 Sft',
      value: '1000-1500 Sft',
    },
    {
      label: '1500-2000 Sft',
      value: '1500-2000 Sft',
    },
    {
      label: 'Above 2000 Sft',
      value: 'Above 2000 Sft',
    },
  ];

  return propertySizesList;
}

export function propertyPurposeofUse() {
  let propertyPurposeofUseList = [
    {
      label: 'Own Use',
      value: 'Own Use',
    },
    {
      label: 'Investment',
      value: 'Investment',
    },
    {
      label: 'Addl.Investment',
      value: 'Addl.Investment',
    },
  ];

  return propertyPurposeofUseList;
}

const PROFILE_RELEVANT_FIELDS = [
  'name',
  'emailAddress',
  'city',
  'country',
  'twitterId',
  'facebookId',
  'linkedinId',
  'slackId',
  'gender',
];

const mapStateToProps = (state) => ({
  userDetails: state.auth.get('userDetails'),
  token: state.auth.get('token'),
});

function _UserInformationForm(props) {
  const labelClasses = 'db pt3 pb2';
  const fieldClasses = 'blue-grey w-100 pv3 ph2 input-reset ba b--grey-light bg-transparent';
  const formFields = PROFILE_RELEVANT_FIELDS.concat(['selfDescriptionGender']);
  const prepareUserDetailsToPush = (values, fields) => {
    let data = { id: props.userDetails.id };
    fields.filter((key) => values.hasOwnProperty(key)).forEach((key) => (data[key] = values[key]));
    return JSON.stringify(data);
  };

  const [resendStatus, setResend] = useState(null);

  const ResendEmail = () => {
    fetchLocalJSONAPI('users/me/actions/verify-email/', props.token, 'PATCH')
      .then(() => setResend(true))
      .catch(() => setResend(false));
  };

  const RequiredIndicator = () => {
    return <span className="ml1 b red">*</span>;
  };

  function getOccupations() {
    let occupations = [
      {
        label: 'Information Technology',
        value: 'IT',
      },
      {
        label: 'GovernmentSector',
        value: 'Govt',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
      },
      {
        label: 'Others',
        value: 'Others',
      },
    ];

    return occupations;
  }
  function getPopertyEnquiryByList() {
    let getPopertyEnquiryForList = [
      {
        label: 'Self',
        value: 'Self',
      },
      {
        label: 'Agent',
        value: 'Agent',
      },
      {
        label: 'Acting On behalf of Purchaser',
        value: 'Acting On behalf of Purchaser',
      },
    ];

    return getPopertyEnquiryForList;
  }

  function getIncomeLevels() {
    let incomelevels = [
      {
        label: '5 to 10 Lakhs',
        value: '5 to 10 Lakhs',
      },
      {
        label: '10 to 25 Lakhs',
        value: '10 to 25 Lakhs',
      },
      {
        label: '25 to 50 Lakhs',
        value: '20 to 50 Lakhs',
      },
      {
        label: 'Above 50 Lakhs',
        value: 'Above 50 Lakhs',
      },
    ];

    return incomelevels;
  }
  function heardAboutList() {
    let heardAboutList = [
      {
        label: 'Freinds/Relatives',
        value: 'Freinds/Relatives',
      },
      {
        label: 'Agents',
        value: 'Agents',
      },
      {
        label: 'Visual Media',
        value: 'Visual Media',
      },
      {
        label: 'Website',
        value: 'Website',
      },
      {
        label: 'Others',
        value: 'Others',
      },
    ];

    return heardAboutList;
  }
  function propertyTypes() {
    let propertyTypes = [
      {
        label: 'Residentials',
        value: 'Residentials',
      },
      {
        label: 'Commercials',
        value: 'Commercials',
      },
    ];

    return propertyTypes;
  }
  function interestedPropertySizeList() {
    let interestedPropertySizeList = [
      {
        label: '1 BHK',
        value: '1 BHK',
      },
      {
        label: '2 BHK',
        value: '2 BHK',
      },
      {
        label: '2.5 BHK',
        value: '2.5 BHK',
      },
      {
        label: '3 BHK',
        value: '3 BHK',
      },
      {
        label: '4 BHK',
        value: '4 BHK',
      },
      {
        label: '5 BHK',
        value: '5 BHK',
      },
      {
        label: '3 BHK Duplex',
        value: '3 BHK Duplex',
      },
      {
        label: '4 BHK Duplex',
        value: '4 BHK Duplex',
      },
    ];

    return interestedPropertySizeList;
  }

  function bankLoanType() {
    let bankLoanTypeList = [
      {
        label: 'Yes',
        value: 'Yes',
      },
      {
        label: 'No',
        value: 'No',
      },
      {
        label: 'Not Sure',
        value: 'Not Sure',
      },
    ];

    return bankLoanTypeList;
  }
  function propertyConstructionTimeLine() {
    let propertyConstructionTimeLineList = [
      {
        label: 'Immedialtely',
        value: 'Immedialtely',
      },
      {
        label: 'Next 3 Months',
        value: 'Next 3 Months',
      },
      {
        label: 'Next 6 Months',
        value: 'Next 6 Months',
      },
      {
        label: 'Not Sure',
        value: 'Not Sure',
      },
    ];

    return propertyConstructionTimeLineList;
  }

  function propertyBudgetTypes() {
    let propertyBudgetTypeList = [
      {
        label: 'Below 50 Lakhs',
        value: 'Below 50 Lakhs',
      },
      {
        label: '50 to 75 Lakhs',
        value: '50 to 75 Lakhs',
      },
      {
        label: '75 Lakhs to 1 Crore',
        value: '75 Lakhs to 1 Crore',
      },
      {
        label: 'Above 1 Crore',
        value: 'Above 1 Crore',
      },
    ];

    return propertyBudgetTypeList;
  }

  function propertySizes() {
    let propertySizesList = [
      {
        label: 'Below 1000 Sft',
        value: 'Below 1000 Sft',
      },
      {
        label: '1000-1500 Sft',
        value: '1000-1500 Sft',
      },
      {
        label: '1500-2000 Sft',
        value: '1500-2000 Sft',
      },
      {
        label: 'Above 2000 Sft',
        value: 'Above 2000 Sft',
      },
    ];

    return propertySizesList;
  }

  function propertyPurposeofUse() {
    let propertyPurposeofUseList = [
      {
        label: 'Own Use',
        value: 'Own Use',
      },
      {
        label: 'Investment',
        value: 'Investment',
      },
      {
        label: 'Addl.Investment',
        value: 'Addl.Investment',
      },
    ];

    return propertyPurposeofUseList;
  }

  return (
    <div className="bg-white shadow-4 pa4 mb3">
      <h3 className="f3 blue-dark mt0 fw6">Personal information :</h3>
      <Form
        onSubmit={(values) =>
          props.pushUserDetails(prepareUserDetailsToPush(values, formFields), props.token, true)
        }
        initialValues={props.userDetails}
        render={({ handleSubmit, pristine, form, submitting, values }) => (
          <form onSubmit={handleSubmit} className="blue-grey">
            <fieldset className="bn ph0" disabled={submitting || !props.userDetails.username}>
              <div className="cf">
                <label className={labelClasses}>
                  Name of the Applicatnt(s) <strong> 1) </strong>
                  <RequiredIndicator />
                </label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  className={fieldClasses}
                  autoComplete="name"
                />
              </div>
              <div className="cf">
                <label className={labelClasses}>
                  Name of the Applicatnt(s) <strong> 2) </strong>
                </label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  className={fieldClasses}
                  autoComplete="name"
                />
              </div>
              <div className="cf">
                <label className={labelClasses}>
                  email
                  <RequiredIndicator />
                </label>
                <Field
                  name="emailAddress"
                  type="email"
                  component="input"
                  required
                  autoComplete="email"
                  className={fieldClasses}
                ></Field>
                <p className="f6 mv2">
                  <span className="red b">* </span>
                  Required fields
                </p>
              </div>
              <div className="cf">
                <div className="w-100 w-100-ns fl pr3-ns">
                  <label className={labelClasses}>Address</label>
                  <Field
                    name="city"
                    component="input"
                    type="text"
                    className={fieldClasses}
                    autoComplete="address-level2"
                  />
                </div>
                {/* <div className="w-100 w-50-ns fl pl3-ns">
                  <label className={labelClasses}>
                    <FormattedMessage {...messages.country} />
                  </label>
                  <UserCountrySelect className={fieldClasses} />
                </div> */}
              </div>
              <div className="cf pt3">
                <div className="w-100 w-50-ns fl pr3-ns">
                  <label className={labelClasses}>Occupation</label>
                  <Dropdown
                    options={getOccupations()}
                    display=" Choose Occupation"
                    className={fieldClasses}
                  />
                </div>
                <div className="w-100 w-50-ns fl pl3-ns">
                  <label className={labelClasses}>Designation</label>
                  <Field name="twitterId" component="input" type="text" className={fieldClasses} />
                </div>
              </div>

              <div className="cf">
                <div className="w-100 w-50-ns fl pr3-ns">
                  <label className={labelClasses}>Company Name</label>
                  <Field name="facebookId" component="input" type="text" className={fieldClasses} />
                </div>
                <div className="w-100 w-50-ns fl pl3-ns">
                  <label className={labelClasses}>Mobile Number</label>
                  <Field name="linkedinId" component="input" type="text" className={fieldClasses} />
                </div>
              </div>

              <div className="cf pt3">
                <div className="w-100 w-50-ns fl pr3-ns">
                  <label className={labelClasses}>Annual Income</label>
                  <Dropdown
                    options={getIncomeLevels()}
                    display="  Income Level  "
                    className={fieldClasses}
                  />
                </div>
                <div className="w-100 w-50-ns fl pl3-ns">
                  <label className={labelClasses}>Type of Property Looking </label>
                  <Dropdown
                    options={propertyTypes()}
                    display=" Choose property type"
                    className={fieldClasses}
                  />
                </div>
              </div>

              {/* <div className="cf">
                <div className="w-100 w-100-ns fl pr3-ns">
                  <label className={labelClasses}>
                    How did you heard about <b>First City Project</b>
                  </label>
                  <Dropdown
                    options={heardAboutList()}
                    display=" How did you heard about"
                    className={fieldClasses}
                  />
                </div>
              </div> */}

              {/* <div className="cf w-100 w-50-ns">
                <div>
                  <label className={labelClasses}>
                    <FormattedMessage {...messages.gender} />
                  </label>
                  <div className="pv2">
                    <RadioField name="gender" value="FEMALE" />
                    <FormattedMessage {...messages.female} />
                  </div>
                  <div className="pv2">
                    <RadioField name="gender" value="MALE" />
                    <FormattedMessage {...messages.male} />
                  </div>
                  <div className="pv2">
                    <RadioField name="gender" value="PREFER_NOT" />
                    <FormattedMessage {...messages.preferNotToSay} />
                  </div>
                  <div className="pv2">
                    <RadioField name="gender" value="SELF_DESCRIBE" />
                    <FormattedMessage {...messages.selfDescribe} />
                  </div>
                  <Field name="gender" subscription={{ value: true }}>
                    {({ input: { value } }) =>
                      value === 'SELF_DESCRIBE' ? (
                        <Field
                          name="selfDescriptionGender"
                          component="input"
                          type="text"
                          className={fieldClasses}
                          required
                        />
                      ) : null
                    }
                  </Field>
                </div>
              </div> */}
              <div className="pt2">
                <FormSubmitButton
                  disabled={submitting || pristine}
                  className="bg-blue-dark white mh1 mv2"
                  disabledClassName="bg-grey-light white mh1 mv2"
                >
                  Save
                </FormSubmitButton>

                <br />
                <br />
              </div>
            </fieldset>
          </form>
        )}
      ></Form>
    </div>
  );
}

// const CustomField = (props) => {
//   const labelClasses = 'db blue-dark f4 fw6';
//   const leftColClasses = 'w-100 w-60-m w-70-l fl';
//   const rightColClasses = 'w-100 w-40-m w-30-l pb4 pb0-ns fl tr-ns';
//   return (
//     <div className="cf pb3">
//       <div className={leftColClasses}>
//         <label className={labelClasses}>
//           <FormattedMessage {...messages[props.labelId]} />
//         </label>
//         <p>
//           <FormattedMessage {...messages[props.descriptionId]} />
//         </p>
//       </div>
//       <div className={rightColClasses}>{props.children}</div>
//     </div>
//   );
// };

// function _SwitchToggleField(props) {
//   const [value, setValue] = useState(null);
//   useEffect(() => {
//     if (value === null && props.userDetails.hasOwnProperty(props.fieldName)) {
//       setValue(props.userDetails[props.fieldName]);
//     }
//   }, [value, props.userDetails, props.fieldName]);

//   const onSwitchChange = () => {
//     let payload = { id: props.userDetails.id };
//     payload[props.fieldName] = !value;
//     props.pushUserDetails(JSON.stringify(payload), props.token, true);
//     setValue(!value);
//   };

//   return (
//     <div className="fr pv2 dib">
//       <SwitchToggle onChange={(e) => onSwitchChange()} isChecked={value} />
//     </div>
//   );
// }

//const SwitchToggleField = connect(mapStateToProps, { pushUserDetails })(_SwitchToggleField);

// function _EditorDropdown(props) {
//   const [value, setValue] = useState(null);
//   useEffect(() => {
//     if (value === null && props.userDetails.hasOwnProperty('defaultEditor')) {
//       setValue(props.userDetails.defaultEditor);
//     }
//   }, [value, props.userDetails]);

//   const onEditorSelect = (arr) => {
//     if (arr.length === 1) {
//       setValue(arr[0].value);
//       props.pushUserDetails(
//         JSON.stringify({ defaultEditor: arr[0].value, id: props.userDetails.id }),
//         props.token,
//         true,
//       );
//     } else if (arr.length > 1) {
//       throw new Error('filter select array is big');
//     }
//   };

//   return (
//     <Dropdown
//       onAdd={() => {}}
//       onRemove={() => {}}
//       onChange={onEditorSelect}
//       value={value}
//       options={getEditors()}
//       display={<FormattedMessage {...messages.selectDefaultEditor} />}
//       className="blue-dark bg-white ba b--grey-light v-mid pv2 pl4"
//     />
//   );
// }

//const EditorDropdown = connect(mapStateToProps, { pushUserDetails })(_EditorDropdown);

function _UserSettingsForm(props) {
  const labelClasses = 'db pt3 pb2';
  const fieldClasses = 'blue-grey w-100 pv3 ph2 input-reset ba b--grey-light bg-transparent';
  function getOccupations() {
    let occupations = [
      {
        label: 'Information Technology',
        value: 'IT',
      },
      {
        label: 'GovernmentSector',
        value: 'Govt',
      },
      {
        label: 'Manufacturing',
        value: 'Manufacturing',
      },
      {
        label: 'Others',
        value: 'Others',
      },
    ];

    return occupations;
  }
  function getPopertyEnquiryByList() {
    let getPopertyEnquiryForList = [
      {
        label: 'Self',
        value: 'Self',
      },
      {
        label: 'Agent',
        value: 'Agent',
      },
      {
        label: 'Acting On behalf of Purchaser',
        value: 'Acting On behalf of Purchaser',
      },
    ];

    return getPopertyEnquiryForList;
  }
  function interestedPropertySizeList() {
    let interestedPropertySizeList = [
      {
        label: '1 BHK',
        value: '1 BHK',
      },
      {
        label: '2 BHK',
        value: '2 BHK',
      },
      {
        label: '2.5 BHK',
        value: '2.5 BHK',
      },
      {
        label: '3 BHK',
        value: '3 BHK',
      },
      {
        label: '4 BHK',
        value: '4 BHK',
      },
      {
        label: '5 BHK',
        value: '5 BHK',
      },
      {
        label: '3 BHK Duplex',
        value: '3 BHK Duplex',
      },
      {
        label: '4 BHK Duplex',
        value: '4 BHK Duplex',
      },
    ];

    return interestedPropertySizeList;
  }
  function propertyPurposeofUse() {
    let propertyPurposeofUseList = [
      {
        label: 'Own Use',
        value: 'Own Use',
      },
      {
        label: 'Investment',
        value: 'Investment',
      },
      {
        label: 'Addl.Investment',
        value: 'Addl.Investment',
      },
    ];

    return propertyPurposeofUseList;
  }

  function propertyConstructionTimeLine() {
    let propertyConstructionTimeLineList = [
      {
        label: 'Immedialtely',
        value: 'Immedialtely',
      },
      {
        label: 'Next 3 Months',
        value: 'Next 3 Months',
      },
      {
        label: 'Next 6 Months',
        value: 'Next 6 Months',
      },
      {
        label: 'Not Sure',
        value: 'Not Sure',
      },
    ];

    return propertyConstructionTimeLineList;
  }

  function bankLoanType() {
    let bankLoanTypeList = [
      {
        label: 'Yes',
        value: 'Yes',
      },
      {
        label: 'No',
        value: 'No',
      },
      {
        label: 'Not Sure',
        value: 'Not Sure',
      },
    ];

    return bankLoanTypeList;
  }

  // require dependencies
  // const PDFDocument = require('pdfkit');
  //const blobStream = require('blob-stream');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <div className="bg-white shadow-4 pa4 mb3">
      <h3 className="f3 blue-dark mt0 fw6">General Information :</h3>

      <div className="cf">
        <div className="w-100 w-100-ns fl pr3-ns">
          <label className={labelClasses}>
            How did you heard about <b>First City Project ?</b>
          </label>
          <Dropdown
            options={heardAboutList()}
            display=" How did you heard about First City "
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="cf pt3">
        <div className="w-100 w-30-ns fl pr3-ns">
          <label className={labelClasses}>Budget :</label>
          <Dropdown
            options={propertyBudgetTypes()}
            display=" Choose your Budget"
            className={fieldClasses}
          />
        </div>
        <div className="w-100 w-40-ns fl pl3-ns">
          <label className={labelClasses}>Size of Unit Looking for</label>
          <Dropdown
            options={interestedPropertySizeList()}
            display=" Choose your Unit Size"
            className={fieldClasses}
          />
        </div>
        <div className="w-100 w-30-ns fl pl3-ns">
          <label className={labelClasses}>Purpose of Use</label>
          <Dropdown
            options={propertyPurposeofUse()}
            display=" Purpose of Use"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="cf pt3">
        <div className="w-100 w-30-ns fl pr3-ns">
          <label className={labelClasses}>Propert Enquired by</label>
          <Dropdown
            options={getPopertyEnquiryByList()}
            display=" Enquired For"
            className={fieldClasses}
          />
        </div>
        <div className="w-100 w-40-ns fl pl3-ns">
          <label className={labelClasses}>How soon are you looking :</label>
          <Dropdown
            options={propertyConstructionTimeLine()}
            display=" Choose your time line"
            className={fieldClasses}
          />
        </div>
        <div className="w-100 w-30-ns fl pl3-ns">
          <label className={labelClasses}>Requied Bank Loan ?</label>
          <Dropdown
            options={bankLoanType()}
            display="Bank Loan Required "
            className={fieldClasses}
          />
        </div>
      </div>
    </div>
  );
}

function UserNotificationsForm(props) {
  const labelClasses = 'db pt3 pb2';
  const fieldClasses = 'blue-grey w-100 pv3 ph2 input-reset ba b--grey-light bg-transparent';

  return (
    <div id="notifications" className="bg-white shadow-4 pa4 mb3">
      <h3 className="f3 blue-dark mt0 fw6">Other Information</h3>
      <div className="blue-grey">
        <div className="cf">
          <label className={labelClasses}>Preferred Location / Floor</label>

          <input className={fieldClasses} type="text" name="name" autoComplete="email" />
        </div>

        <div className="cf">
          <label className={labelClasses}>Referrals, if any:</label>

          <input className={fieldClasses} type="text" name="name" autoComplete="email" />
        </div>
        <div className="cf">
          <label className={labelClasses}>Remarks:</label>

          <input className={fieldClasses} type="text" name="name" autoComplete="email" />
        </div>
        <div className="cf">
          <label className={labelClasses}>Attended By :</label>

          <input className={fieldClasses} type="text" name="name" autoComplete="email" />
        </div>
      </div>
    </div>
  );
}

const UserInformationForm = connect(mapStateToProps, { pushUserDetails })(_UserInformationForm);

const UserSettingsForm = connect(mapStateToProps)(_UserSettingsForm);

export { UserInformationForm, UserSettingsForm, UserNotificationsForm, PROFILE_RELEVANT_FIELDS };
