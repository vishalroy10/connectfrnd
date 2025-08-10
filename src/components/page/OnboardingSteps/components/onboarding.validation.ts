import * as yup from 'yup';

function get18YearsAgoDate() {
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

  return eighteenYearsAgo;
}

export const onboardingStep5Schema = yup.object().shape({
  privacy: yup.string().required('Privacy is a required field'),
  userName: yup.string().required('User Name is a required field'),
  availability: yup.string().required('Availability is a required field'),
  dateOfBirth: yup
    .date()
    .max(get18YearsAgoDate(), 'Must be at least 18 years old')
    .required('Date of Birth is a required field'),
  height: yup
    .number()
    .positive('Height must be a positive number')
    .integer('Height must be an integer')
    .required('Height is a required field'),
  gender: yup.string().required('Gender is a required field'),
  ethnicity: yup.string().required('Ethnicity is a required field'),
});
