# plant-shop
# 🌿 GreenHub - Plant Shop Demo

A fully responsive plant e-commerce website built with vanilla HTML, CSS & JavaScript. It features a working cart system, product filters, a login modal, and a mobile-first design.

🔗 **Live Demo:** https://anikettawade13.github.io/plant-shop/

## ✨ Features

- **🛒 Full Cart System**: Add/remove items, quantity controls, localStorage persistence
- **🔍 Smart Shop Filters**: Live search, category filtering (`?category=Indoor`), price sorting
- **👤 User Authentication**: Login/signup modal with email persistence
- **📱 Mobile-First**: Bootstrap 5 responsive design + custom plant theme
- **⚡ No Dependencies**: Pure frontend (no backend, no frameworks)

## 🚀 Quick Demo

1. **Open** `index.html` in browser
2. **Add plants** to cart (Featured section or Shop page)
3. **View cart** via navbar shopping bag icon
4. **Filter products** by search/category/price
5. **Login** via account icon (uses your email)

## 📁 File Structure
GreenHub/
├── index.html # 🏠 Homepage + Featured plants
├── shop.html # 🛍️ Full product catalog
├── categories.html # 📂 Category overview
├── contact.html # 📧 Contact form
├── style.css # 🎨 Custom styles (17k lines)
├── script.js # ⚙️ All logic (10k lines)
└── img/ # 🖼️ Product images

## 🛠️ Tech Stack

| Frontend | Tools | Features |
|----------|-------|----------|
| **HTML5** | Bootstrap 5.3 | Semantic + responsive grid |
| **CSS3** | Custom properties | `--green-primary`, plant theme |
| **JavaScript** | Vanilla ES6+ | localStorage, modals, filters |

## 🎮 How It Works

Homepage → Featured Plants → Add to Cart
↓
Shop Page → Search/Filter/Sort → Add to Cart
↓
Navbar Cart Icon → View/Remove Items → Clear Cart

## 📱 Responsive Breakpoints
| Screen  | Layout               |
| ------- | -------------------- |
| <576px  | Mobile stacked cards |
| 768px+  | 2-column shop grid   |
| 992px+  | 3-column + sidebar   |
| 1200px+ | 4-column full width  |

## ⚠️ Limitations (Demo Only)

❌ No payment gateway

❌ Cart clears on browser data clear

❌ Email-only login (no password validation)

❌ Static product list

## 🎯 What I Learned
- Implementing cart functionality using JavaScript & localStorage
- Managing UI state across multiple pages
- Building responsive layouts using Bootstrap + custom CSS
- Writing clean, reusable DOM manipulation logic

## 🙌 Credits
Developed by **Aniket**  
Learning Project | Frontend Practice

