-- ==============================================================================
-- WEBLOOM RLS POLICIES FOR PUBLIC ENGAGEMENT (LEAD CAPTURE, BOOKINGS, ORDERS)
-- Migration: 20261105000002_rls_public_inserts.sql
-- ==============================================================================

-- 1. Subscribers: Anyone can subscribe to a creator's newsletter
CREATE POLICY "public_can_subscribe" ON public.subscribers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "creators_manage_subscribers" ON public.subscribers
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = subscribers.profile_id
      AND (
        profiles.user_id = auth.uid() OR
        auth.uid() IS NULL -- permissive for local development / testing
      )
    )
  );

-- 2. Bookings: Visitors can schedule a booking
CREATE POLICY "public_can_book_consultation" ON public.bookings
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "creators_manage_bookings" ON public.bookings
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = bookings.profile_id
      AND (
        profiles.user_id = auth.uid() OR
        auth.uid() IS NULL
      )
    )
  );

-- 3. Orders & Order Items: Public can place orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_create_orders" ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "public_can_create_order_items" ON public.order_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "creators_view_orders" ON public.orders
  FOR SELECT
  USING (true);

CREATE POLICY "creators_view_order_items" ON public.order_items
  FOR SELECT
  USING (true);

-- 4. Products & Services: Public viewable
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_products_viewable" ON public.products
  FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "public_services_viewable" ON public.services
  FOR SELECT
  USING (is_active = TRUE);

