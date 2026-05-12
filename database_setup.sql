--
-- PostgreSQL database dump
--


-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-12 08:21:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16589)
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16588)
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- TOC entry 228 (class 1259 OID 16626)
-- Name: inventory_item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory_item (
    item_id integer NOT NULL,
    item_name character varying(100) NOT NULL,
    category_id integer,
    base_unit character varying(20) NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 16625)
-- Name: inventory_item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventory_item_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 227
-- Name: inventory_item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventory_item_item_id_seq OWNED BY public.inventory_item.item_id;


--
-- TOC entry 220 (class 1259 OID 16580)
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16579)
-- Name: role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 219
-- Name: role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;


--
-- TOC entry 224 (class 1259 OID 16598)
-- Name: shift; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shift (
    shift_id integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    required_volunteers integer NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 16597)
-- Name: shift_shift_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shift_shift_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 223
-- Name: shift_shift_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shift_shift_id_seq OWNED BY public.shift.shift_id;


--
-- TOC entry 229 (class 1259 OID 16640)
-- Name: shift_volunteer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shift_volunteer (
    shift_id integer NOT NULL,
    user_id integer NOT NULL,
    status character varying(20) DEFAULT 'scheduled'::character varying
);


--
-- TOC entry 231 (class 1259 OID 16659)
-- Name: transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction (
    transaction_id integer NOT NULL,
    item_id integer,
    quantity_base_units numeric(10,2) NOT NULL,
    transaction_type character varying(10),
    expiry_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transaction_transaction_type_check CHECK (((transaction_type)::text = ANY ((ARRAY['IN'::character varying, 'OUT'::character varying])::text[])))
);


--
-- TOC entry 230 (class 1259 OID 16658)
-- Name: transaction_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.transaction_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 230
-- Name: transaction_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.transaction_transaction_id_seq OWNED BY public.transaction.transaction_id;


--
-- TOC entry 226 (class 1259 OID 16609)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    role_id integer
);


--
-- TOC entry 225 (class 1259 OID 16608)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4886 (class 2604 OID 16592)
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 16629)
-- Name: inventory_item item_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_item ALTER COLUMN item_id SET DEFAULT nextval('public.inventory_item_item_id_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16583)
-- Name: role role_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16601)
-- Name: shift shift_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shift ALTER COLUMN shift_id SET DEFAULT nextval('public.shift_shift_id_seq'::regclass);


--
-- TOC entry 4891 (class 2604 OID 16662)
-- Name: transaction transaction_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaction_transaction_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 16612)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 5065 (class 0 OID 16589)
-- Dependencies: 222
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.category (category_id, name) VALUES (1, 'Canned Goods');
INSERT INTO public.category (category_id, name) VALUES (2, 'Fresh Produce');
INSERT INTO public.category (category_id, name) VALUES (3, 'Dairy');
INSERT INTO public.category (category_id, name) VALUES (4, 'Bakery');
INSERT INTO public.category (category_id, name) VALUES (5, 'Frozen Food');


--
-- TOC entry 5071 (class 0 OID 16626)
-- Dependencies: 228
-- Data for Name: inventory_item; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (1, 'Whole Milk', 3, 'Liters');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (2, 'Cheddar Cheese', 3, 'kg');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (3, 'Canned Tomatoes', 1, 'Cans');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (4, 'Black Beans', 1, 'Cans');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (5, 'Red Apples', 2, 'kg');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (6, 'Whole Wheat Bread', 4, 'Loaves');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (7, 'Peanut Butter', 1, 'Jars');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (8, 'Brown Rice', 1, 'kg');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (9, 'Large Eggs', 3, 'Cartons');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (10, 'Greek Yogurt', 3, 'Tubs');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (11, 'Bananas', 2, 'Bunches');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (12, 'Spinach', 2, 'Bags');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (13, 'Chicken Thighs', 5, 'kg');
INSERT INTO public.inventory_item (item_id, item_name, category_id, base_unit) VALUES (14, 'Frozen Pizza', 5, 'Boxes');


--
-- TOC entry 5063 (class 0 OID 16580)
-- Dependencies: 220
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.role (role_id, role_name) VALUES (1, 'Admin');
INSERT INTO public.role (role_id, role_name) VALUES (2, 'Volunteer');
INSERT INTO public.role (role_id, role_name) VALUES (3, 'Manager');


--
-- TOC entry 5067 (class 0 OID 16598)
-- Dependencies: 224
-- Data for Name: shift; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shift (shift_id, start_time, end_time, required_volunteers) VALUES (1, '2026-05-15 09:00:00', '2026-05-15 13:00:00', 4);
INSERT INTO public.shift (shift_id, start_time, end_time, required_volunteers) VALUES (2, '2026-05-15 13:00:00', '2026-05-15 17:00:00', 3);
INSERT INTO public.shift (shift_id, start_time, end_time, required_volunteers) VALUES (3, '2026-05-16 10:00:00', '2026-05-16 14:00:00', 5);


--
-- TOC entry 5072 (class 0 OID 16640)
-- Dependencies: 229
-- Data for Name: shift_volunteer; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shift_volunteer (shift_id, user_id, status) VALUES (1, 1, 'confirmed');
INSERT INTO public.shift_volunteer (shift_id, user_id, status) VALUES (1, 2, 'confirmed');
INSERT INTO public.shift_volunteer (shift_id, user_id, status) VALUES (2, 1, 'scheduled');


--
-- TOC entry 5074 (class 0 OID 16659)
-- Dependencies: 231
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.transaction (transaction_id, item_id, quantity_base_units, transaction_type, expiry_date, created_at) VALUES (1, 7, 20.00, 'IN', '2026-10-01', '2026-05-12 08:18:27.091477');
INSERT INTO public.transaction (transaction_id, item_id, quantity_base_units, transaction_type, expiry_date, created_at) VALUES (2, 7, 2.00, 'OUT', NULL, '2026-05-12 08:18:27.091477');
INSERT INTO public.transaction (transaction_id, item_id, quantity_base_units, transaction_type, expiry_date, created_at) VALUES (3, 9, 12.00, 'IN', '2026-05-20', '2026-05-12 08:18:27.091477');
INSERT INTO public.transaction (transaction_id, item_id, quantity_base_units, transaction_type, expiry_date, created_at) VALUES (4, 9, 4.00, 'OUT', NULL, '2026-05-12 08:18:27.091477');


--
-- TOC entry 5069 (class 0 OID 16609)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (user_id, name, email, role_id) VALUES (1, 'Nikolai TEST', 'nikolai@fontys.nl', 1);
INSERT INTO public.users (user_id, name, email, role_id) VALUES (2, 'Andy TEST', 'andy@fontys.nl', 2);
INSERT INTO public.users (user_id, name, email, role_id) VALUES (3, 'Nicholas TEST', 'nicholas@fontys.nl', 3);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 221
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_category_id_seq', 5, true);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 227
-- Name: inventory_item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventory_item_item_id_seq', 14, true);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 219
-- Name: role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_role_id_seq', 3, true);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 223
-- Name: shift_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shift_shift_id_seq', 3, true);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 230
-- Name: transaction_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.transaction_transaction_id_seq', 4, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- TOC entry 4897 (class 2606 OID 16596)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4905 (class 2606 OID 16634)
-- Name: inventory_item inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_item
    ADD CONSTRAINT inventory_item_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4895 (class 2606 OID 16587)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- TOC entry 4899 (class 2606 OID 16607)
-- Name: shift shift_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shift
    ADD CONSTRAINT shift_pkey PRIMARY KEY (shift_id);


--
-- TOC entry 4907 (class 2606 OID 16647)
-- Name: shift_volunteer shift_volunteer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shift_volunteer
    ADD CONSTRAINT shift_volunteer_pkey PRIMARY KEY (shift_id, user_id);


--
-- TOC entry 4909 (class 2606 OID 16668)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 4901 (class 2606 OID 16619)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4903 (class 2606 OID 16617)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4911 (class 2606 OID 16635)
-- Name: inventory_item inventory_item_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory_item
    ADD CONSTRAINT inventory_item_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- TOC entry 4912 (class 2606 OID 16648)
-- Name: shift_volunteer shift_volunteer_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shift_volunteer
    ADD CONSTRAINT shift_volunteer_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shift(shift_id);


--
-- TOC entry 4913 (class 2606 OID 16653)
-- Name: shift_volunteer shift_volunteer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shift_volunteer
    ADD CONSTRAINT shift_volunteer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4914 (class 2606 OID 16669)
-- Name: transaction transaction_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.inventory_item(item_id);


--
-- TOC entry 4910 (class 2606 OID 16620)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(role_id);


-- Completed on 2026-05-12 08:21:29

--
-- PostgreSQL database dump complete
--
