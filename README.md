# 🍎 FRUITBEN - Fruit Store E-commerce & Management Website

## 📌 Description

**FruitBen** is a fresh fruit e-commerce website developed to give customers a convenient way to buy domestic and imported fruits online, sold by the kilogram.

The system allows users to browse products, search and filter items, manage their shopping cart, apply discount codes, choose a delivery address, pay by **Cash on Delivery (COD)** or **bank transfer via QR code**, and track their orders.

The project was built using **HTML5, CSS3, JavaScript (ES5+), jQuery and Bootstrap 4**, focusing on responsive design, user experience and front-end development best practices. It is a fully static website: **no server or database is required**.

The website also includes an **Admin Dashboard** that supports order management, product management, discount code management, news management, customer management, contact handling and revenue reports.

## 🌐 Live Demo

**Website**
[https://giapchithanh06.github.io/FruitBen-Store-Management-System/](https://giapchithanh06.github.io/FruitBen-Store-Management-System/)

**GitHub Repository**
[https://github.com/giapchithanh06/FruitBen-Store-Management-System](https://github.com/giapchithanh06/FruitBen-Store-Management-System)

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | admin123 |
| Customer | lan.nguyen@gmail.com | 123456 |
| Customer | khoa.tm@gmail.com | 123456 |

**Discount codes:** `FRUITBEN10`, `GIAM30K`, `TRAICAYNHAPKHAU`

## 🚀 Features

### 👤 Customer Features

**Authentication**
- User Registration
- User Login
- Remember Me (keeps you signed in for 30 days)
- Logout
- Passwords hashed before being saved

**Product Browsing**
- Home page with featured products, discounted products, promotion codes, statistics and latest news
- Browse 52 fruit products
- Search products by keyword
- Filter by category, maximum price and discounted items
- Sort products
- Pagination (9 products per page)
- "New" label for products added within 30 days
- Product detail page with image gallery, stock status, information tabs and related products
- Select quantity in kilograms

**Shopping Cart**
- Add to cart or Buy now
- Update quantity (checked against stock)
- Remove products from cart
- Automatic subtotal calculation
- Free shipping progress bar

**Checkout & Orders**
- Recipient information form
- Province / ward selection (34 provinces and cities of Vietnam)
- Automatic shipping fee calculation
- Discount code support
- Payment by COD or bank transfer QR code (VietQR)
- Order success page with QR code for transfer payment
- Order history ("My Orders")
- Order tracking with status timeline
- Customers can cancel pending orders

**Content & Support**
- News list and news detail pages
- About page
- Contact page with contact form and Google Map
- Shipping policy page
- Return policy page
- Payment guide page
- Custom 404 page

### 👨‍💼 Admin Features

**Dashboard**
- Statistic cards
- Revenue chart for the last 7 days
- Best-selling products
- Recent orders
- Low-stock products (10 kg or less)
- New customers
- To-do list

**Order Management**
- Filter orders by status
- Search by order code, customer name or phone number
- Filter orders by customer
- Quick status change
- Order detail page
- Cancel orders and return items to stock
- Confirm payment received for QR transfers

**Product Management**
- Filter by status, category and keyword
- Add new products
- Update product information
- Stop selling / resume selling
- Delete products

**Discount Code Management**
- Discount code cards
- Create and edit codes
- Enable / disable codes
- Delete codes

**News Management**
- Search news by title
- Filter visible / hidden news
- Quick show / hide
- Add and edit news (title, summary, content, image, publish date)
- Upload an image from your computer or choose an existing image
- Delete news with confirmation

**Customer Management**
- Search by name, email or phone number
- Sort by newest registration, total spending or number of orders

**Contact Management**
- Mark messages as handled
- Delete messages

**Reports & Statistics**
- Revenue by product
- Revenue by month
- Export orders to CSV (opens in Excel)
- Restore sample data

## 📋 Business Rules

**Shipping fee**
- Ho Chi Minh City: 20,000 VND
- Other provinces: 35,000 VND
- **Free shipping** for orders from 500,000 VND

**Discount codes**
- Checked for: enabled/disabled status, start and end date, usage limit, minimum order value
- Percentage discounts have a maximum discount amount

**Stock**
- Placing an order reduces stock and increases code usage
- Cancelling an order returns stock and restores code usage
- Maximum 50 kg per add-to-cart action

**Order status**

```
Pending → Shipping → Completed
```

- Orders can be cancelled while Pending or Shipping
- Completed COD orders are marked as paid
- QR transfer orders are held for 15 minutes waiting for payment

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery 1.11
- Bootstrap 4.4
- Font Awesome
- Google Fonts
- VietQR API
- Google Maps
- LocalStorage
- SessionStorage

## ✨ Modern Techniques Applied

### 📱 Responsive Web Design
- Bootstrap Grid System
- Mobile-first approach
- Cross-device compatibility
- Adaptive layouts for Mobile, Tablet and Desktop

### 🎬 Scroll Animation
- Implemented using IntersectionObserver API
- Reveal-on-scroll effects
- Automatic fallback for older browsers

### 🧩 Reusable Components
Header, footer, product cards, toast notifications and form validation are generated by JavaScript (`giao-dien.js`), so every page shares the same layout and only needs to be edited in one place.

### 🗂️ Layered JavaScript Structure
- **Data layer** (`kho-du-lieu.js`): read, add, update and delete data
- **Business layer** (`nghiep-vu.js`): cart, shipping, discounts, orders, login
- **UI layer** (`giao-dien.js`, `trang/*.js`, `admin/*.js`): page rendering and events

All business settings (shipping fee, free-shipping threshold, bank account for QR, low-stock threshold…) are kept in one `CAU_HINH` config block.

### 💾 Client-side Data Storage

**LocalStorage** is used to store:
- Products
- Customer accounts
- Orders
- Discount codes
- News
- Contact messages
- "Remember me" login

**SessionStorage** is used to store:
- Current login session
- Notifications passed to the next page

Sample data is loaded automatically on the first visit.

### 💳 QR Code Payment
QR codes are generated with the VietQR service, including the bank account, amount and order code, so customers can scan and pay with any banking app.

## 📂 Project Structure

```
FruitBen-Store-Management-System/
│
├── index.html                   # Home page
├── cua-hang.html                # Shop: filter, sort, search, pagination
├── san-pham.html                # Product details
├── gio-hang.html                # Shopping cart
├── thanh-toan.html              # Checkout
├── dat-hang-thanh-cong.html     # Order success
├── don-hang-cua-toi.html        # My orders
├── chi-tiet-don-hang.html       # Order tracking
├── dang-nhap.html               # Login
├── dang-ky.html                 # Register
├── tin-tuc.html                 # News
├── tin-tuc-chi-tiet.html        # News detail
├── gioi-thieu.html              # About
├── lien-he.html                 # Contact
├── chinh-sach-van-chuyen.html   # Shipping policy
├── chinh-sach-doi-tra.html      # Return policy
├── huong-dan-thanh-toan.html    # Payment guide
├── 404.html                     # Page not found
│
├── admin/
│   ├── index.html               # Dashboard
│   ├── don-hang.html            # Orders
│   ├── don-hang-chi-tiet.html   # Order details
│   ├── san-pham.html            # Products
│   ├── san-pham-form.html       # Add / edit product
│   ├── ma-giam-gia.html         # Discount codes
│   ├── ma-giam-gia-form.html    # Add / edit discount code
│   ├── tin-tuc.html             # News
│   ├── tin-tuc-form.html        # Add / edit news
│   ├── khach-hang.html          # Customers
│   ├── lien-he.html             # Contact messages
│   └── bao-cao.html             # Revenue reports
│
└── assets/
    ├── bootstrap/               # Bootstrap 4
    ├── css/
    │   ├── site.css             # Customer interface
    │   ├── admin.css            # Admin interface
    │   └── all.min.css          # Font Awesome
    ├── webfonts/                # Font Awesome fonts
    ├── img/
    │   ├── products/            # Product images
    │   ├── tintuc/              # News images
    │   ├── company-logos/       # Partner logos
    │   └── Banner & UI images, logo-fruitben.svg
    └── js/
        ├── du-lieu-mau.js       # Sample data
        ├── kho-du-lieu.js       # LocalStorage data layer
        ├── nghiep-vu.js         # Business rules + CAU_HINH config
        ├── giao-dien.js         # Shared UI: header, footer, cards, toasts, validation
        ├── admin.js             # Admin layout + admin access control
        ├── diachi-vn.js         # Vietnam provinces and wards
        ├── jquery.min.js
        ├── trang/               # Customer page scripts
        └── admin/               # Admin page scripts
```

## 🎨 User Interface

The website interface was designed with:
- Fresh fruit store style
- Orange & dark navy theme
- Responsive layout
- Hero banner
- Scroll animations
- Interactive product cards with discount and "New" labels
- Toast notifications
- Clean and user-friendly navigation
- Modern admin dashboard with sidebar menu

## ⚙️ System Architecture

```
HTML5
   ↓
CSS3 + Bootstrap 4
   ↓
JavaScript (UI → Business → Data)
   ↓
LocalStorage / SessionStorage
```

The project separates:
- User Interface
- Styling Components
- Business Logic
- Client-side Data Management

Benefits:
- Maintainability
- Scalability
- Code Reusability
- Better Project Organization

## ▶️ How to Run

**1. Clone the Repository**

```bash
git clone https://github.com/giapchithanh06/FruitBen-Store-Management-System.git
```

**2. Open the Project**

Recommended Tools:
- Visual Studio Code
- Any Modern Browser (Chrome, Edge, Firefox)

**3. Run the Website**

Open:

```
index.html
```

or

Use **Live Server** in VS Code for a better development experience.

> An Internet connection is needed for Google Fonts, Google Maps and QR codes. All other features work offline.

**4. Open the Admin Dashboard**

Log in with the admin account above, or open:

```
admin/index.html
```

**Reset data:** Admin → **Revenue Report** → **Restore sample data**

## 🔧 Quick Customization

| To change | Edit |
|---|---|
| Shipping fee, free-shipping threshold, QR bank account | `assets/js/nghiep-vu.js` → `CAU_HINH` |
| Menu, footer, contact information | `assets/js/giao-dien.js` → `veHeader()` / `veFooter()` |
| Admin menu | `assets/js/admin.js` |
| Colors, fonts, logo size | `assets/css/site.css` → `:root` |
| Logo | `assets/img/logo-fruitben.svg` |
| Sample products, news, discount codes | `assets/js/du-lieu-mau.js` |

## 🎯 Purpose

This project was developed for educational purposes to practice:
- Front-end Web Development
- Responsive Web Design
- JavaScript Programming
- Bootstrap Framework
- E-commerce Website Development
- Admin Dashboard Development
- User Interface Design
- LocalStorage and SessionStorage Management

## 🚀 Future Improvements

- Database Integration
- RESTful API Development
- Secure server-side authentication
- Online Payment Gateway Integration
- Automatic payment confirmation
- Product Reviews and Ratings
- Wishlist Functionality
- Email order notifications
- Real-time Order Tracking
- Advanced Analytics Dashboard
- Customer Recommendation System

## 👨‍💻 Authors

**Giáp Chí Thanh**

Student Project – FruitBen Fruit Store E-commerce Website

## 📄 License

This project is intended for educational and learning purposes only.

All data is stored in the browser for demonstration purposes. No real payments are processed.
