-- ============================================================
-- LMS Full Portal Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Extend app_role enum to add 'teacher' and 'parent'
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'teacher';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'parent';

-- 2. Extend profiles table with LMS fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS student_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS father_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gender text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS address text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS admission_status text NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS avatar_url text NOT NULL DEFAULT '';

-- 3. Student Admissions table (full form data)
CREATE TABLE IF NOT EXISTS public.student_admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Personal info
  full_name text NOT NULL,
  father_name text NOT NULL DEFAULT '',
  mother_name text NOT NULL DEFAULT '',
  date_of_birth date,
  gender text NOT NULL DEFAULT '',
  -- Contact
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  -- Academic
  course_interest text NOT NULL DEFAULT '',
  preferred_time text NOT NULL DEFAULT '',
  previous_education text NOT NULL DEFAULT '',
  -- Guardian
  guardian_name text NOT NULL DEFAULT '',
  guardian_relation text NOT NULL DEFAULT '',
  guardian_phone text NOT NULL DEFAULT '',
  -- Meta
  status text NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  rejection_reason text NOT NULL DEFAULT '',
  admin_notes text NOT NULL DEFAULT '',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
GRANT SELECT, INSERT, UPDATE ON public.student_admissions TO authenticated;
GRANT ALL ON public.student_admissions TO service_role;
ALTER TABLE public.student_admissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own admission" ON public.student_admissions FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "users insert own admission" ON public.student_admissions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "admins manage admissions" ON public.student_admissions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER student_admissions_updated_at BEFORE UPDATE ON public.student_admissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Attendance Records
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE SET NULL,
  class_date date NOT NULL DEFAULT current_date,
  status text NOT NULL DEFAULT 'present',  -- present | absent | late | excused
  notes text NOT NULL DEFAULT '',
  recorded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance_records TO authenticated;
GRANT ALL ON public.attendance_records TO service_role;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students read own attendance" ON public.attendance_records FOR SELECT TO authenticated USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "admins teachers manage attendance" ON public.attendance_records FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

-- 5. Lesson Records
CREATE TABLE IF NOT EXISTS public.lesson_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE SET NULL,
  lesson_date date NOT NULL DEFAULT current_date,
  lesson_number int,
  subject text NOT NULL DEFAULT '',
  topic text NOT NULL DEFAULT '',
  surah_or_chapter text NOT NULL DEFAULT '',
  page_or_ayah text NOT NULL DEFAULT '',
  homework text NOT NULL DEFAULT '',
  teacher_note text NOT NULL DEFAULT '',
  recorded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_records TO authenticated;
GRANT ALL ON public.lesson_records TO service_role;
ALTER TABLE public.lesson_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students read own lessons" ON public.lesson_records FOR SELECT TO authenticated USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "admins teachers manage lessons" ON public.lesson_records FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE TRIGGER lesson_records_updated_at BEFORE UPDATE ON public.lesson_records FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. Teacher Remarks
CREATE TABLE IF NOT EXISTS public.teacher_remarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE SET NULL,
  remark_date date NOT NULL DEFAULT current_date,
  category text NOT NULL DEFAULT 'general',  -- general | tajweed | memorization | behavior | progress
  remark text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  recorded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_remarks TO authenticated;
GRANT ALL ON public.teacher_remarks TO service_role;
ALTER TABLE public.teacher_remarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students read own remarks" ON public.teacher_remarks FOR SELECT TO authenticated USING (student_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "admins teachers manage remarks" ON public.teacher_remarks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

-- 7. Parent-Student Links
CREATE TABLE IF NOT EXISTS public.parent_student_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  relation text NOT NULL DEFAULT 'parent',  -- parent | guardian
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(parent_id, student_id)
);
GRANT SELECT, INSERT, DELETE ON public.parent_student_links TO authenticated;
GRANT ALL ON public.parent_student_links TO service_role;
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parents read own links" ON public.parent_student_links FOR SELECT TO authenticated USING (parent_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage parent links" ON public.parent_student_links FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Function to auto-generate student ID on approval
CREATE OR REPLACE FUNCTION public.generate_student_id()
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  year_part text := to_char(now(), 'YYYY');
  seq_num int;
  new_id text;
BEGIN
  SELECT COUNT(*) + 1 INTO seq_num FROM public.profiles WHERE student_id IS NOT NULL;
  new_id := 'DUO-' || year_part || '-' || LPAD(seq_num::text, 4, '0');
  RETURN new_id;
END; $$;

-- 9. Function to approve student and generate ID
CREATE OR REPLACE FUNCTION public.approve_student(p_user_id uuid, p_admin_notes text DEFAULT '')
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  new_student_id text;
BEGIN
  -- Only admins can call this
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  -- Generate ID
  new_student_id := public.generate_student_id();
  -- Update profile
  UPDATE public.profiles SET
    student_id = new_student_id,
    admission_status = 'approved'
  WHERE id = p_user_id;
  -- Update admission record
  UPDATE public.student_admissions SET
    status = 'approved',
    admin_notes = p_admin_notes,
    reviewed_at = now(),
    reviewed_by = auth.uid()
  WHERE user_id = p_user_id;
  RETURN new_student_id;
END; $$;

-- 10. Function to reject student
CREATE OR REPLACE FUNCTION public.reject_student(p_user_id uuid, p_reason text DEFAULT '')
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  UPDATE public.profiles SET admission_status = 'rejected' WHERE id = p_user_id;
  UPDATE public.student_admissions SET
    status = 'rejected',
    rejection_reason = p_reason,
    reviewed_at = now(),
    reviewed_by = auth.uid()
  WHERE user_id = p_user_id;
END; $$;

-- Update handle_new_user to set admission_status = 'none' initially
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, country, city, admission_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'city', ''),
    'none'
  )
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'student') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION public.generate_student_id() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.approve_student(uuid, text) FROM anon;
REVOKE ALL ON FUNCTION public.reject_student(uuid, text) FROM anon;
GRANT EXECUTE ON FUNCTION public.approve_student(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.reject_student(uuid, text) TO authenticated;
