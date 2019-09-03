/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const signUpValidationSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(30)
    .required()
    .error((errors) => ({
      message: 'firstname must be a minimum of 3 character and max of 30'
    })),
  lastName: Joi.string().alphanum().min(3).max(30)
    .required()
    .error((errors) => ({
      message: 'lastname must be a minimum of 3 character and max of 30'
    })),
  password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()
    .error((errors) => ({
      message: 'Password must be at leat 8 character long, with at least an uppercase, lowercase, digit and special character'
    })),
  email: Joi.string().email({ minDomainSegments: 2 }).required()
    .error((errors) => ({
      message: 'Your email is not valid'
    }))
});

export const validateData = (data, schema) => {
  const { error, value } = Joi.validate(data, schema);
  const values = { error, value };
  return values;
};
