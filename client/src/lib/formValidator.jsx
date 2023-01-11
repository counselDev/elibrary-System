export function addBookValidator(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.author) {
    errors.author = "Required";
  }

  if (!values.publisher) {
    errors.publisher = "Required";
  }
  if (!values.yearPublished) {
    errors.yearPublished = "Required";
  }
 
  if (!values.copies) {
    errors.copies = "Required";
  }

 

  return errors;
}
