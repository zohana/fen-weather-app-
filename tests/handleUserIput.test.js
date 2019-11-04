import {
  validationsForPlace,
  validateForDate,
  validateDateInput
} from "../src/client/js/handleUserInput";


//validationsForPlace
test("It should test if the city is not empty", () => {
  document.body.innerHTML =
    ' <div class="error hide-s" id="error-div">Please donot leave the search box empty </div>';
  expect(validationsForPlace()).toBeFalsy();
  expect(validationsForPlace("Paris"));
});

//validateForDate
test("It should test if the date is not empty", () => {
  document.body.innerHTML =
    ' <div class="error hide-d" id="error-div-d">Please donot leave the search box empty </div>';

  expect(validateForDate()).toBeFalsy();
  expect(validateForDate("2019-11-10"));
});

//validateDateInput
test("It should test if the depature date is less than the return date", () => {
    document.body.innerHTML =
      '<div class="error hide-t" id="error-div-t">Please check the return date. It cannot be less than the date of departure. </div>'
  
    expect(validateDateInput()).toBeFalsy();
    expect(validateDateInput("2019-11-10", "2019-11-30"));
  });
