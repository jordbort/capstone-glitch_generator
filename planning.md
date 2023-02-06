# Planning materials

Capstone project: Glitch art generator and showcase
Repo: https://github.com/jordbort/capstone-glitch_generator

## MVP Goals
  - Django full stack
  - Use database (PostgreSQL) to store models/content
  - Serving templates as a front-end
  - Deployed front-end and back-end 
  - 2 or more db models (Profiles, Posts, stretch: Comments, Likes)
  - 1 or more model with full CRUD (Posts, stretch: Comments)

## Stretch goals
  - Django user authentication
  - Customizable Profile designs (colors, Profile picture, etc.)
  - Custom image uploads via AWS for users' Post content
  - Messages sent to users' emails (welcome/account verification, password recovery, etc.)
  - Likable comments

## User Stories
- As a user, I can create an account/Profile with a username, email address, and password
- As a user, I can upload my own image to manipulate, and save the glitched result as a Post
- As a user, I can see all other user's Posts at a glance, along with total Likes and Comments
- As a user, I can click on a Post to view its details, and like or Post a Comment on it
- As a user, I can delete my own Comments
- As a user, I can see whether I have "Liked" a Post, and can Like/un-Like accordingly
- As a user, I can edit or delete my own Posts (and Like/Comment on them as well)
- As a user, I can update my Profile info/details or delete my Profile (and delete account & all Posts/Comments/Likes)

## Wireframe/User flow
![Capstone - glitch art project user flow](https://user-images.githubusercontent.com/115664302/215382399-91c02757-4461-4d6d-87cc-7853eadd88d9.png)
(Dashed lines are re-directs after an action is completed, Pac-Man is for moral support)

## Data Models + Entity-relationship diagram (ERD)
![Capstone - glitch art project ERD](https://user-images.githubusercontent.com/115664302/215382429-09fd0be8-433c-41ae-811b-20a32ac5082b.png)

## Milestones
- Create Django framework with placeholder templates
- Create models for Profiles and Posts
- Sandbox image glitching function(s) and live preview (I don't need to use React for this to change/refresh, right?)
- Stretch goal: Create parameters for glitching images (low/medium/high intensity, stacking iterations? true/false)
- Stretch goal: Explore AWS for image hosting, use Cloudinary as fallback if too difficult/complicated/expensive
- Implement user authentication, modify navigation bar
- Refine template layouts and apply basic styling
- Stretch goal: Create models for Comments and Likes
- Implement CRUD for Comments
- Apply Comments and Likes to templates, and update/fine-tune styling
- Stretch goal: Implement tags for Posts
- Create a search bar and buttons, update styling
- Stretch goal: Investigate account password resetting for users in Django, and potential email templating
