import { handleSubmit, onLoad } from './js/app';
import {removeTrip} from './js/app';
import {validationsForPlace, validateForDate, validateDateInput} from './js/handleUserInput';

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

//alert("I EXIST")
console.log("CHANGE!!");

export{
    handleSubmit,
    removeTrip, 
    onLoad,
    validationsForPlace,
    validateForDate,
    validateDateInput
}