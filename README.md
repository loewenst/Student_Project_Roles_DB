# Project Roles App

### By: Daniel Loewenstein

[GitHub](https://github.com/loewenst) | [LinkedIn](https://www.linkedin.com/in/daniel-z-loewenstein/) [Figma](https://www.figma.com/file/buDohu3X2d2nJC071HMbSQ/Student-Project-Roles?type=design&node-id=0%3A1&t=ND6Ra2UR7kRTl5S7-1)

### Date: 5/24/2023

---

## _**Description**_

This app is intended to work something like Google Classroom, only its specific purpose is to assign students to roles in "projects," broadly defined. If there is a weekly chore rotation, a teacher could use this app to create a chore project, and create and assign chore roles to each student. If students are breaking up into four groups, each group needs to do a project, and each group has the same roles - note taker, presenter, leader etc. - the app will allow creation of groups as well, which can reuse already made roles. The app will allow teacher accounts to add students and assign them to roles, and it will allow student accounts to see their projects and roles for each class they're in, as well as (this part has yet to be developed) send messages to a teacher about a specific project (like a request to switch roles!).

### _Technical Stuff_

**Models**

_User_

Contains the information automatically added through authentication.

_Class_

Contains:

- A creator ID, which is the user ID, that is automatically added when a new class is created
- A students array, containing IDs of students manually created in a class
- A projects array, containing IDs of projects manually created in a class

_Project_

Contains:

- A class ID, which is the class the project belongs to
- A students array, containing IDs of students in the class that have been added to the project
- A roles array, containing the roles available in the project
- A groups array, containing the numbers of the groups in the project

_Student_

Contains:

- Last Name, inputted by a class creator
- First Name, inputted by a class creator
- Email, inputted by a class creator
- An array of class objects, corresponding to each class to which the student has ben added. Each class object contains:
  - The class ID
  - An array of project objects, corresponding to each project to which the student has been added. Each project object contains:
    - The project ID
    - The student's role
    - The student's group

_Relationships_

- The class-project relationship is a 1:M relationship
- The class-student relationship is a M:M relationship
- The project-student relationship is a M:M relationship
- The user-class relationship is a 1:M relationship
- Users have indirect relationships with the rest of the models, through functionality that reads the user email and links it to a student

**Views & Controllers**

_Index_

The landing page forces a login, and once a user is logged in a navbar allows the user to navigate to classes.

_Class Index_

The class index page displays two navbars: one of classes managed by the user, accessed by checking the creator ID of each class and displaying it if it matches the user ID; and one of classes the user is enrolled in, accessed by checking the user email and displaying each class that contains a student that has the same email. Each class displayed links to the class show page.

_Show Class_

The class show page displays a navbar of projects, and a list of students.

_New Class_

_New Student_

_Student Class_

_Show Project_

_New Project_

_Edit Project_
