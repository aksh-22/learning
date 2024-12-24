# 🎄 Building a Festive Secret Santa App with React and Material-UI 🎁

Welcome to this fun tutorial! In this blog, we’ll walk you through creating a beautiful, responsive Secret Santa app using React, Material-UI, and a touch of Christmas magic. By the end, you’ll have a working app that’s both functional and festive!

---

## 🌟 What Will You Learn?

-   **React Basics**: Learn how to structure a React project with components and state management.
-   **Material-UI**: Discover how to use Material-UI to create modern, responsive designs.
-   **Adding Interactivity**: Implement features like adding participants, drawing names, and resetting data.
-   **Thematic Enhancements**: Add festive decorations, animations, and SVG backgrounds for a Christmas vibe.

---

## 🎅 Secret Santa App Features

Our Secret Santa app will allow users to:

-   Add participants to the gift exchange.
-   Draw names for the gift exchange while ensuring no one gets themselves.
-   View assignments and reset the app.
-   Enjoy a Christmas theme with snow animations, icons, and vibrant colors.

---

## 🎁 Step-by-Step Guide

### 1. Setup the Project

First, let’s set up the React project and install the necessary libraries.

```bash
npx create-react-app secret-santa
cd secret-santa
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material notistack react-icons howler
```

Create a new file, `App.css`, for custom styling.

### 2. Build the App Layout

We’ll create a clean structure for our app:

-   **Navbar**: Contains links to Home and Assignments.
-   **Home Page**: Add participants, draw names, and view the drawn list.
-   **Assignments Page**: Show who gives gifts to whom.

Here’s the App Component structure:

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

**🎨 Styling Tip**: Add a gradient background and hover effects to the navbar.

---

### 3. Add Participants and Draw Names

In the **Home** Component, we’ll:

-   Use `useState` to manage participants.
-   Allow adding participants via an input field.
-   Let users draw names while ensuring no one gets themselves.

Here’s a simplified version of the functionality:

```tsx
function Home() {
    const [participants, setParticipants] = React.useState<string[]>([]);
    const [assignments, setAssignments] = React.useState<Record<string, string>>({});

    const addParticipant = (name: string) => {
        if (name && !participants.includes(name)) {
            setParticipants([...participants, name]);
        }
    };

    const drawName = () => {
        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        const assignments = shuffled.reduce((acc, person, index) => {
            acc[person] = shuffled[(index + 1) % shuffled.length];
            return acc;
        }, {} as Record<string, string>);
        setAssignments(assignments);
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Add Participant'
                onKeyDown={(e) => e.key === 'Enter' && addParticipant(e.currentTarget.value)}
            />
            <button onClick={drawName}>Draw Names</button>
        </div>
    );
}
```

---

### 4. Create Assignments Page

On this page, we display the gift-giving pairs created during the draw. This uses a simple list to show `giver → receiver`.

---

### 5. Add a Christmas Theme

Let’s bring the holiday cheer with:

-   **Snow Animation**: Add falling snow with `@keyframes`.
-   **SVG Backgrounds**: Use festive images for decoration.
-   **Christmas Colors**: Use gradients and frosty whites for UI components.

Add this to your `App.css`:

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

Add notifications using the `notistack` library:

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

    // ...rest of the component
}
```

---

## 🎄 Final Touches

-   Add Christmas-themed icons from `react-icons`.
-   Use Material-UI buttons, cards, and text fields for a polished look.

---

## 🎉 Conclusion

In this tutorial, we built a fully functional Secret Santa app with a festive twist! You learned:

-   How to use React for building interactive UIs.
-   Styling with Material-UI and custom CSS.
-   Adding notifications and enhancing the user experience.

🎁 Try it yourself and spread the Christmas cheer!
