import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEditProduct from './pages/AddEditProduct';

function App() {
    return (
        <BrowserRouter>
            {/* 
        Tailwind/DaisyUI background layout setup 
        Using a soft gradient/pattern for visual appeal
      */}
            <div className="min-h-screen bg-base-200 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-base-100 via-base-200 to-base-300 font-sans text-base-content selection:bg-primary selection:text-primary-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-product" element={<AddEditProduct />} />
                    <Route path="/edit-product/:id" element={<AddEditProduct />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
