
import React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PromoSlider from "./components/PromoSlider";
import ProductCategories from "./components/ProductCategories";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import DesktopComputers from "./components/DesktopComputers";
import WhyChooseUs from "./components/WhyChooseUs";
import CorporateServices from "./components/CorporateServices";
import LaptopExchange from "./components/LaptopExchange";
import SoftwareServices from "./components/SoftwareServices";
import AboutSection from "./components/AboutSection";
import ContactCTA from "./components/ContactCTA";

import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import CategoryManagement from "./admin/CategoryManagement";
import EnquiryManagement from "./admin/EnquiryManagement";
import CustomerManagement from "./admin/CustomerManagement";


function Home() {
  return (
    <>
      <PromoSlider />
      <Categories />
      <FeaturedProducts />
      <DesktopComputers />
      <ProductCategories />
      <WhyChooseUs />
      <CorporateServices />
      <LaptopExchange />
      <SoftwareServices />
      <AboutSection />
      <ContactCTA />
    </>
  );
}


function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/brand/:brandName" element={<Brands />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="enquiries" element={<EnquiryManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
