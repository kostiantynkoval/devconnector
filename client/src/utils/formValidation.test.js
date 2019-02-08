import {validateForm} from './formValidation'

describe('>>> FORM VALIDATION',() => {

  it('+++ Correct data passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "Q1qqqqqq"}))
      .toMatchObject({isValid: true, errors: {email: "", password: ""}});
  });

  it('+++ Not valid email passed to the form', () => {
    expect(validateForm({email: "qqqq.qq", password: "Q1qqqqqq"}))
      .toMatchObject({isValid: false, errors: {email: "This email is not valid", password: ""}});
  });

  it('+++ Short password passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "Q1qqq"}))
      .toMatchObject({isValid: false, errors: {email: "", password: "Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital"}});
  });

  it('+++ Password with no numbers passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "Qqqqqqqq"}))
      .toMatchObject({isValid: false, errors: {email: "", password: "Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital"}});
  });

  it('+++ Password with no capital letters passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "1qqqqqqq"}))
      .toMatchObject({isValid: false, errors: {email: "", password: "Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital"}});
  });

  it('+++ Password with no lowercase letters passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "Q111111111"}))
      .toMatchObject({isValid: false, errors: {email: "", password: "Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital"}});
  });

  it('+++ Long password passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: "Qqqqqqqq4444hhhhhhhhhhhhhhhhdddd"}))
      .toMatchObject({isValid: false, errors: {email: "", password: "Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital"}});
  });

  it('+++ No password passed to the form', () => {
    expect(validateForm({email: "qq@qq.qq", password: ""}))
      .toMatchObject({isValid: false, errors: {email: "", password: "This field is required"}});
  });

  it('+++ No email passed to the form', () => {
    expect(validateForm({email: "", password: "Q1Qqqqqqqqqq"}))
      .toMatchObject({isValid: false, errors: {email: "This field is required", password: ""}});
  });

  it('+++ Empty fields passed to the form', () => {
    expect(validateForm({email: "", password: ""}))
      .toMatchObject({isValid: false, errors: {email: "This field is required", password: "This field is required"}});
  });
});