"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Carwash Vendo Machine",
    price: "₱120,000",
    image: "/images/machine1.jpg",
    description:
      "A fully automated carwash vending system designed for high traffic areas.",
  },
  {
    id: 2,
    name: "Mini Vendo Machine",
    price: "₱85,000",
    image: "/images/machine1.jpg",
    description:
      "Compact vending solution ideal for small carwash businesses.",
  },
  {
    id: 3,
    name: "Premium Vendo Machine",
    price: "₱200,000",
    image: "/images/machine1.jpg",
    description:
      "High capacity machine with advanced payment integrations.",
  },
];

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <main className="font-sans bg-white">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white shadow z-50">

        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">

          <h1 className="font-bold text-lg text-gray-800">
            THE PALAG GROUP INC.
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
            <li><a href="#products" className="hover:text-cyan-600">Products</a></li>
            <li><a href="#payment" className="hover:text-cyan-600">Payment</a></li>
            <li><a href="#about" className="hover:text-cyan-600">About</a></li>
          </ul>

          {/* Seller Button */}
          <Link href="/auth/login">
            <button className="hidden md:block bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
              Become Seller
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <ul className="flex flex-col text-center py-4 gap-4">
              <li><a href="#products">Products</a></li>
              <li><a href="#payment">Payment</a></li>
              <li><a href="#about">About</a></li>

              <Link href="/auth/login">
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg mx-6">
                  Become Seller
                </button>
              </Link>
            </ul>
          </div>
        )}

      </nav>

      {/* HERO */}
      <section
        className="relative h-[75vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4 max-w-xl">

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Smart Carwash Vending Machines
          </h2>

          <p className="mb-6">
            Start your automated carwash business with reliable vending
            technology designed for entrepreneurs.
          </p>

          <Link href="/auth/register">
            <button className="bg-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700">
              Become a Seller
            </button>
          </Link>

        </div>

      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-16 px-4 bg-gray-50">

        <h3 className="text-3xl font-bold text-center mb-10">
          Our Machines
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition"
            >

              <div className="relative h-48">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />

              </div>

              <div className="p-4 text-center">

                <h4 className="font-semibold text-lg">
                  {product.name}
                </h4>

                <p className="text-cyan-600 font-bold">
                  {product.price}
                </p>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="mt-3 bg-cyan-600 text-white px-4 py-2 rounded-lg w-full"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-10">
          <button className="border border-cyan-600 text-cyan-600 px-6 py-2 rounded-lg">
            Show More Products
          </button>
        </div>

      </section>

      {/* PAYMENT */}
      <section id="payment" className="py-16 px-4 text-center max-w-6xl mx-auto">

        <h3 className="text-3xl font-bold mb-10">Payment Options</h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

          <div className="border p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Cash Purchase</h4>
            <p>Pay full amount and receive your machine immediately.</p>
          </div>

          <div className="border p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Installment</h4>
            <p>Flexible monthly payment options.</p>
          </div>

          <div className="border p-6 rounded-xl shadow">
            <h4 className="font-semibold mb-2">Financing</h4>
            <p>Partner financing available for qualified buyers.</p>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-16 px-4 bg-gray-50">

        <div className="max-w-4xl mx-auto text-center">

          <h3 className="text-3xl font-bold mb-6">
            About
          </h3>

          <p className="text-gray-600 mb-4">

            The Palag Group Inc. is a technology-driven company focused on
            delivering innovative vending solutions for entrepreneurs
            and small businesses.

          </p>

          <p className="text-gray-600 mb-4">

            Our mission is to make automated business systems accessible
            to aspiring entrepreneurs by providing reliable vending
            machines, smart payment integrations, and continuous
            technical support.

          </p>

          <p className="text-gray-600">

            Through innovation and dedication to quality, we empower
            individuals to start and scale profitable vending businesses
            across the country.

          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-cyan-600 text-white">

        <h3 className="text-3xl font-bold mb-4">
          Start Your Vending Business Today
        </h3>

        <Link href="/auth/register">
          <button className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold">
            Become a Seller
          </button>
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center">

        <p>
          © {new Date().getFullYear()} The Palag Group Inc.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a href="#">Facebook</a>
          <a href="#">Youtube</a>
          <a href="#">TikTok</a>
        </div>

      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-md w-full p-6">

            <h4 className="text-xl font-bold mb-2">
              {selectedProduct.name}
            </h4>

            <p className="text-cyan-600 font-bold mb-4">
              {selectedProduct.price}
            </p>

            <p className="mb-6">
              {selectedProduct.description}
            </p>

            <div className="flex gap-4">

              <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex-1">
                Buy Now
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="border px-4 py-2 rounded-lg flex-1"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}