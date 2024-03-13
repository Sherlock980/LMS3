/* 
Project:  LMS4
Name: Cassidy Jensen
Submitted: 3/12
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection: I thought this section was a bit more challanging than the previous
milestones. Something I learned was that it is easier to make something generic first
rather than going back to refactor everything. It was so tedious to go back through my code to
find anything that was specific to teams and make it generic. It would have been much simpler if
we had built generic first and not specific to a team. Would have saved me a lot of refactoring time.

I've also realized how much design is so individual. I changed my design and teamstable based off
some critiques from some family members. Then I had a friend from graphic design look at it and tell
me to go back to my original idea and adjust a few things in my teamstable layout. Then I went back to my family 
and each liked it a different way. Its hard to have a design and layout that you as the designer like, and 
pleases others.
*/  
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './views/App/App';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
