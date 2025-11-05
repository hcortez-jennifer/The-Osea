import * as bootstrap from 'bootstrap';

import { headerAnimation } from './layouts/hero';
import { exhibitionAnimation } from './layouts/exhibition';

console.clear(); 

document.addEventListener("DOMContentLoaded", () => {
    headerAnimation();
    exhibitionAnimation();
})