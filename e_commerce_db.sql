-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 01:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_commerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 'Electronics', 'Electronic devices and gadgets', 'https://i.imgur.com/jJQjEGM.jpg', '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(2, 'Clothing', 'Apparel and fashion items', 'https://i.imgur.com/61ARdUS.jpg', '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(3, 'Home & Kitchen', 'Products for your home', 'https://i.imgur.com/WBTkRXG.jpg', '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(4, 'Sports', 'Health and fitness products', 'https://i.imgur.com/7TzNQDW.jpg', '2025-05-03 03:05:19', '2025-05-03 03:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_04_30_171214_create_users_tb_table', 1),
(2, '2025_04_30_171325_create_categories_table', 1),
(3, '2025_04_30_171358_create_products_table', 1),
(4, '2025_04_30_171437_create_orders_table', 1),
(5, '2025_04_30_171512_create_order_items_table', 1),
(6, '2025_05_03_add_image_url_to_categories_table', 1),
(7, '2025_05_03_create_personal_access_tokens_table', 1),
(8, '2025_05_03_create_sessions_table', 1),
(9, '2025_05_03_fix_image_url_column', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  `shipping_address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '8421e1c7f6b8f1387b2221fee2fcf71950b86f0add92b9db0a33980f5b44f0b8', '[\"*\"]', NULL, NULL, '2025-05-03 03:36:34', '2025-05-03 03:36:34'),
(2, 'App\\Models\\User', 1, 'auth_token', '497779ca617f8148d3d1fc13fa67b754516dbc662cc3bf02df38024a713f4f8f', '[\"*\"]', NULL, NULL, '2025-05-03 03:36:45', '2025-05-03 03:36:45'),
(3, 'App\\Models\\User', 1, 'auth_token', '45982d90dd666026c287a78b8798c903ed821b8045be224e1bbc253004b5261c', '[\"*\"]', NULL, NULL, '2025-05-03 03:36:54', '2025-05-03 03:36:54');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image_url` text NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `stock_quantity`, `image_url`, `is_available`, `created_at`, `updated_at`) VALUES
(1, 1, 'Smartphone Pro X', 'Latest model with high-end features, 8GB RAM, 128GB storage, and 5G capability', 899.99, 50, 'https://pricepony.co.id/blog/wp-content/uploads/2021/05/Samsung-Galaxy-A51-vs-1-1024x536.jpg', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(2, 1, 'Ultrabook Laptop', 'Thin and light laptop with powerful processor and long battery life', 1299.99, 30, 'https://cdn.mos.cms.futurecdn.net/bXiQnGw7tFvBsEMtkqXKKE.jpg', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(3, 1, 'Wireless Earbuds', 'True wireless earbuds with noise cancellation and premium sound quality', 149.99, 75, 'https://th.bing.com/th/id/OIP.rc_Usiax8UV38oEjhvC5dQHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(4, 1, 'Smart Watch', 'Fitness and health tracking with smartphone notifications', 249.99, 40, 'https://th.bing.com/th/id/OIP.z8FnZH-EdzeOPJLvW86V_QHaHa?w=192&h=192&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(5, 2, 'Premium Cotton T-Shirt', 'Comfortable 100% cotton t-shirt, perfect for everyday wear', 24.99, 100, 'https://th.bing.com/th/id/OIP.pmS1NBXJRCgFa9aOcD8z4AAAAA?rs=1&pid=ImgDetMain', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(6, 2, 'Slim Fit Jeans', 'Classic blue denim with modern slim fit style', 59.99, 80, 'https://i.ebayimg.com/images/g/kUkAAOSwTGBcsNao/s-l1600.jpg', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(7, 2, 'Winter Jacket', 'Warm and waterproof winter jacket with hood', 129.99, 35, 'https://th.bing.com/th/id/OIP.6gl3u984DAJWM8-YQ9AwggHaHa?rs=1&pid=ImgDetMain', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(8, 2, 'Running Shoes', 'Lightweight and comfortable shoes for running and training', 89.99, 45, 'https://sportruns.com/media/How-to-Choose-the-Right-Running-Shoes-for-Your-Foot-Type.jpg', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(9, 3, 'Coffee Maker', 'Programmable coffee maker with timer and multiple brew settings', 79.99, 25, 'https://th.bing.com/th/id/OIP.v7ORILVh4Fl0C88CzQDN9QHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(10, 3, 'Stainless Steel Cookware Set', '10-piece kitchen cookware set with non-stick coating', 199.99, 20, 'https://th.bing.com/th/id/OIP.uC3VIEN02ymOaoS0MVbu4gHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(11, 3, 'Smart LED TV', '55-inch 4K Ultra HD Smart TV with built-in streaming apps', 549.99, 15, 'https://th.bing.com/th/id/OIP.cAt5yayGsNv6NgUlRjohLwHaHa?w=179&h=180&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(12, 3, 'Robot Vacuum Cleaner', 'Automated cleaning robot with mapping technology and app control', 299.99, 18, 'https://th.bing.com/th/id/OIP.nWUYxye9xO_kfwhWDjHgLQHaEK?w=322&h=181&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(13, 4, 'Yoga Mat', 'Non-slip yoga mat with carrying strap', 29.99, 60, 'https://th.bing.com/th/id/OIP.FjZfl81fKalVkQM5ae_FHQHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(14, 4, 'Adjustable Dumbbells', 'Space-saving adjustable weight dumbbells for home workouts', 179.99, 25, 'https://th.bing.com/th/id/OIP.lgxDexS7JDZXoV3sx8RlFgHaEo?w=301&h=187&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(15, 4, 'Fitness Tracker', 'Waterproof fitness band with heart rate monitor', 79.99, 40, 'https://th.bing.com/th/id/OIP.y3PF_RKuh1S9cii7oCvZuAHaE7?w=256&h=180&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19'),
(16, 4, 'Basketball', 'Official size and weight indoor/outdoor basketball', 34.99, 30, 'https://th.bing.com/th/id/OIP.Dr1zdFQiMZZFch60-VUzdgHaHb?w=191&h=191&c=7&r=0&o=5&pid=1.7', 1, '2025-05-03 03:05:19', '2025-05-03 03:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` text NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_tb`
--

CREATE TABLE `users_tb` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `full_name` varchar(191) NOT NULL,
  `address` text NOT NULL,
  `contact_number` varchar(191) NOT NULL,
  `email_address` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_tb`
--

INSERT INTO `users_tb` (`user_id`, `username`, `password`, `full_name`, `address`, `contact_number`, `email_address`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'haroldtest1', '$2y$12$.Z.YP8egRCcho3eKha.J9OLX2wVMZJ6NAxAF5I8Whuj5N0s/ITgae', 'harold pasion', 'blk4lot6', '09494718634', 'pasionharold01@gmail.com', NULL, '2025-05-03 03:36:28', '2025-05-03 03:36:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users_tb`
--
ALTER TABLE `users_tb`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_tb_username_unique` (`username`),
  ADD UNIQUE KEY `users_tb_email_address_unique` (`email_address`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users_tb`
--
ALTER TABLE `users_tb`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users_tb` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
