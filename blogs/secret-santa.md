# 🎄 Building a Festive Secret Santa App with React and Material-UI 🎁

Welcome to this joyful tutorial! If you want to create a festive Secret Santa app that combines functionality with a dash of holiday magic, you're in the right place. Using React, Material-UI, and some creative flair, we’ll guide you through building a responsive and engaging app. By the end, you'll have a working app to brighten up the holiday season!

---

## 🌟 What You’ll Learn

In this tutorial, you’ll:

-   **Master React Basics**: Learn how to structure a React project with reusable components and state management, following SOLID principles.
-   **Leverage Material-UI**: Use Material-UI’s components for sleek and responsive designs while maintaining component reusability and single responsibility.
-   **Implement Key Features**: Add interactivity with functionalities like adding participants, drawing names, and resetting data, while ensuring code scalability and maintainability.
-   **Embrace Festive Design**: Infuse your app with Christmas-themed animations, SVG backgrounds, and vibrant colors.

---

## 🎅 Secret Santa App Features

Our Secret Santa app will include the following features:

-   Add participants to the gift exchange list.
-   Draw names while ensuring no one gets their own name.
-   View gift-giving assignments and reset the app for a fresh start.
-   Enjoy a Christmas-themed UI with snow animations, icons, and vibrant gradients.

---

## 🎁 Step-by-Step Guide

### 1. Set Up Your Project

First, set up your React project and install the necessary dependencies:

```bash
npx create-react-app secret-santa
cd secret-santa
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material notistack react-icons howler
```

Create a new file named `App.css` for custom styling.

---

### 2. Build the App Layout

Our app will have the following structure:

-   **Navbar**: Links to the Home and Assignments pages.
-   **Home Page**: Add participants, draw names, and view the drawn list.
-   **Assignments Page**: Display gift-giving pairs.

Here’s the main `App` component:

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Assignments from './Assignments';
import './App.css';

function App() {
    return (
        <Router>
            <div className='snow-bg'>
                <header className='navbar'>
                    <NavLink to='/' className='nav-link'>
                        Home
                    </NavLink>
                    <NavLink to='/assignments' className='nav-link'>
                        Assignments
                    </NavLink>
                </header>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/assignments' element={<Assignments />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
```

**Styling Tip**: Use gradient backgrounds and hover effects on the navbar to enhance visual appeal.

---

### 3. Add Participants and Draw Names

The **Home** component will allow users to:

-   Add participants using an input field.
-   Draw names while ensuring no participant gets their own name.

Here’s an example of the functionality:

```tsx
import React, { useState } from 'react';

// Applying Single Responsibility Principle by separating logic into a utility function
function shuffleParticipants(participants: string[]): Record<string, string> {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    return shuffled.reduce((acc, person, index) => {
        acc[person] = shuffled[(index + 1) % shuffled.length];
        return acc;
    }, {} as Record<string, string>);
}

function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [assignments, setAssignments] = useState<Record<string, string>>({});

    const addParticipant = (name: string) => {
        if (name && !participants.includes(name)) {
            setParticipants([...participants, name]);
        }
    };

    const drawNames = () => {
        setAssignments(shuffleParticipants(participants));
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Add Participant'
                onKeyDown={(e) => e.key === 'Enter' && addParticipant(e.currentTarget.value)}
            />
            <button onClick={drawNames}>Draw Names</button>
        </div>
    );
}

export default Home;
```

---

### 4. Display Assignments

In the **Assignments** component, display the results of the draw as a list of gift-giving pairs:

```tsx
function Assignments({ assignments }: { assignments: Record<string, string> }) {
    return (
        <div>
            <h2>Gift Assignments</h2>
            <ul>
                {Object.entries(assignments).map(([giver, receiver]) => (
                    <li key={giver}>
                        {giver} → {receiver}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Assignments;
```

---

### 5. Add a Christmas Theme

Make your app visually festive:

-   **Snow Animation**: Use `@keyframes` to create falling snow.
-   **SVG Backgrounds**: Include decorative Christmas images.
-   **Colorful Gradients**: Add holiday colors for buttons and backgrounds.

Here’s an example in `App.css`:

```css
.snow-bg {
    position: relative;
    min-height: 100vh;
    background: url('https://svgshare.com/i/tqM.svg') no-repeat center top / cover;
    overflow-x: hidden;
}

.snow-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://svgshare.com/i/tpv.svg') repeat;
    animation: snow 15s linear infinite;
    opacity: 0.7;
}

@keyframes snow {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(100%);
    }
}
```

---

### 6. Enhance User Feedback

Add feedback with the `notistack` library to notify users when participants are added or if they try to add duplicates.

```tsx
import { SnackbarProvider, useSnackbar } from 'notistack';

function Home() {
    const { enqueueSnackbar } = useSnackbar();

    const addParticipant = (name: string) => {
        if (name && !participants.includes(name)) {
            enqueueSnackbar(`${name} added!`, { variant: 'success' });
            setParticipants([...participants, name]);
        } else {
            enqueueSnackbar('Name must be unique!', { variant: 'warning' });
        }
    };

    return <SnackbarProvider maxSnack={3}>{/* Home Component Content */}</SnackbarProvider>;
}
```

---

## 🎄 Final Touches

-   Add Christmas-themed icons from the `react-icons` library.
-   Use Material-UI components like `Button`, `Card`, and `TextField` for a polished look.
-   Test your app thoroughly to ensure all features work smoothly.

---

## 🌐 Connect with Us

We'd love to hear your thoughts on this project! Share your creations, feedback, or just say hello:

-   **LinkedIn**: [Follow us on LinkedIn](https://www.linkedin.com/in/aksh-khandelwal/) for more tutorials and project updates.
-   **X (formerly Twitter)**: [Tweet us your thoughts](https://x.com/akashkhand40483) or share your project screenshots using the hashtag #SecretSantaApp.

## 🎉 Conclusion

Congratulations! You’ve built a fully functional Secret Santa app with React and Material-UI. Along the way, you learned:

-   How to build interactive UIs with React.
-   Styling techniques with Material-UI and custom CSS.
-   Adding interactivity and festive flair to delight your users.

This project is perfect for spreading holiday cheer among friends, family, or coworkers. Get creative and add your unique touches to make it truly magical! 🎅

---

## 🔐 FAQs

### 1. Can I use this app for non-Christmas events?

Absolutely! You can easily adapt the app for other themes by changing the design and colors.

### 2. How can I deploy this app?

Use platforms like [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) for easy deployment.

### 3. Can I add a feature to email the assignments?

Yes! Integrate an email API like SendGrid or Nodemailer for this functionality.

### 4. Is this app mobile-friendly?

Yes, Material-UI ensures responsive design, but test on multiple devices for optimization.

### 5. How can I ensure no duplicate names in the draw?

Our code already prevents duplicates. For additional validation, sanitize user inputs and check for duplicates before adding participants.
