# Glitch Gator

'Glitch Gator' is a 'GLITCH art GenerATOR'. You can upload your own images to create glitch art, and share your results! Check out the deployed site here: https://glitchgator.com/

## Screenshots

![Screenshot from 2023-02-05 23-52-29](https://user-images.githubusercontent.com/115664302/216886713-aa92e6c1-4520-49ed-828f-285502f70f30.png)
The "Home" page shows an index of all users' posts.

![Screenshot from 2023-02-05 18-11-04](https://user-images.githubusercontent.com/115664302/216851711-c12ae1f9-acb2-499e-b375-f5814f393e6b.png)
The preview window has a "before and after" style display, buttons for you to corrupt random bytes of data, a reset button, and a submit button. As of July 4, 2023 there is now an undo/redo feature!

![Screenshot from 2023-02-05 18-13-32](https://user-images.githubusercontent.com/115664302/216851721-bee93f02-655b-4738-93c2-581a705591ee.png)
Post models have full CRUDibility and ownership, meaning that the owner (and only the owner) of a post can edit or delete it.

## Mobile screenshots

<img src="https://user-images.githubusercontent.com/115664302/216893803-f45c81e2-6c43-4d65-9925-9409327b2e4d.PNG" alt="Glitch Gator Home page" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/216893845-861b4d76-c68a-4ade-b791-590e43c36578.PNG" alt="Glitch Gator About page" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/216893914-55ad224f-c298-40e2-b91b-917f680fd8b3.PNG" alt="Glitch Gator image maker" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/216893925-edc11a71-a04a-4894-9d6e-e814d20ad97b.PNG" alt="Glitch Gator post detail" width=24% />

## Technologies used

- Django
- PostgreSQL
- Amazon Web Services (AWS) S3 Buckets
- Python
- JavaScript
- HTML
- CSS

## How to install and run this project

You must have a virtual environment setup to run this project locally. This project is made with Django/Python, so it uses the Python package manager Pip. In the project directory, you can run:

`pipenv shell`

to launch your virtual environment. Next, run:

`pipenv install`

This will install dependencies from the Pipfile. Finally, run:

`python3 manage.py runserver`

This will start up the server. Then, navigate to:

`http://localhost:8000`

You should see the home page of the app appear in your web browser.

## Wireframes, diagrams, and planning materials

Please see the <a href="https://github.com/jordbort/capstone-glitch_generator/blob/main/planning.md">planning.md</a> document for more information.

## Future features/stretch goals

Ideas/plans for the future include:
- Likes on posts
- Comments on posts
- More refined glitch controls and parameters
- Tags for posts
- A search bar for tags and/or post description
- Email verification, password recovery
- Additional profile settings:
  - Bio/about section
  - Local timezone
  - Light/dark mode
  - Profile picture
  - Profile color scheme
- Continued styling updates
