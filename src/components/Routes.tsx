import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import AdminLogin from "../pages/AdminLogin";
import SellerLogin from "../pages/SellerLogin";
import AdminDashboard from "../pages/AdminDashboard";
import SellerDashboard from "../pages/SellerDashboard";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/seller/login" element={<SellerLogin />} />
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/seller/dashboard" 
                    element={
                        <ProtectedRoute>
                            <SellerDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
