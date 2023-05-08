import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home-page';
import ContactForm from '../components/contact';

// use createBrowserRouter to create route for homa page and single contact page with id and create contact page
const routes = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/contact/:id', element: <ContactForm /> },
  { path: '/create', element: <ContactForm /> },
]);

export default routes;
