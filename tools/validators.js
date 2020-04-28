module.exports.NotEmpty = (input) => {
  if (input === '')
    return 'Required';

  return true;
};

module.exports.Length = (input, length) => {
  if (input.length !== length)
    return `Should be exactly ${length.toString()} characters long`;

  return true;
};

module.exports.MinLength = (input, length) => {
  if (input.length < length)
    return `Should be at least ${length.toString()} characters long`;

  return true;
};

module.exports.MaxLength = (input, length) => {
  if (input.length > length)
    return `Should not exceed ${length.toString()} characters long`;

  return true;
};

module.exports.LengthBetween = (input, min, max) => {
  if (input.length < min || input.length > max)
    return `Should be between ${min.toString()} and ${max.toString()} characters long`;

  return true;
};

module.exports.NoSpecialChars = (input) => {
  const scCheck = new RegExp('^[a-zA-Z0-9]{1,}$');

  if (!scCheck.test(input))
    return 'No special characters allowed';

  return true;
};

module.exports.LimitSpecialChars = (input) => {
  const scCheck = new RegExp('^[a-zA-Z0-9-_]{1,}$');

  if (!scCheck.test(input))
    return 'You are limited to alpha-numeric with dashes and underscores, No other special characters allowed!';

  return true;
};

module.exports.Domain = (input) => {
  const domainCheck = new RegExp('^[a-zA-Z0-9-.]{1,}(com|net|org|me|xyz|io)$');

  if (!domainCheck.test(input))
    return 'Not a valid domain (ie: domain.com) [com|net|org|me|xyz|io]';

  return true;
};

module.exports.Ip = (input) => {
  const ipCheck = new RegExp('^\\d{2,3}.\\d{1,3}.\\d{1,3}.\\d{1,3}$');

  if (!ipCheck.test(input))
    return 'Not a valid ip format (ie: 192.168.1.1)';

  return true;
};

module.exports.Email = (input) => {
  const emailCheck = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

  if (!emailCheck.test(input))
    return 'Not a valid email format (ie: email@domain.com)';

  return true;
};

module.exports.Password = (input) => {
  const lcCheck = new RegExp('(?=.*[a-z])');
  const ucCheck = new RegExp('(?=.*[A-Z])');
  const numCheck = new RegExp('(?=.*[0-9])');

  if (input.length < 8)
    return 'Must be eight characters or longer';

  if (!lcCheck.test(input))
    return 'Must contain at least 1 lowercase character';

  if (!ucCheck.test(input))
    return 'Must contain at least 1 uppercase alphabetical character';

  if (!numCheck.test(input))
    return 'Must contain at least 1 numeric character';

  return true;
};

module.exports.confirmPassword = (input, compareTo) => {
  if (input !== compareTo)
    return 'Passwords do not match. Try again!';

  return true;
};
