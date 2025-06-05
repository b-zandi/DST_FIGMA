--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: faqs; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    question text NOT NULL,
    answer text NOT NULL,
    category text NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.faqs OWNER TO neondb_owner;

--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.faqs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faqs_id_seq OWNER TO neondb_owner;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: investments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.investments (
    id integer NOT NULL,
    title text NOT NULL,
    location text NOT NULL,
    property_type text NOT NULL,
    asset_class text NOT NULL,
    min_investment integer NOT NULL,
    projected_yield text NOT NULL,
    offering_size text NOT NULL,
    hold_period text NOT NULL,
    image_url text NOT NULL,
    description text NOT NULL,
    status text NOT NULL,
    sponsor text NOT NULL,
    property_address text NOT NULL,
    year_built text NOT NULL,
    square_feet text NOT NULL,
    occupancy text NOT NULL,
    offering_date text NOT NULL,
    closing_date text NOT NULL,
    distribution_frequency text NOT NULL,
    debt_financing text NOT NULL,
    tax_advantages text NOT NULL,
    detailed_description text NOT NULL
);


ALTER TABLE public.investments OWNER TO neondb_owner;

--
-- Name: investments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.investments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.investments_id_seq OWNER TO neondb_owner;

--
-- Name: investments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.investments_id_seq OWNED BY public.investments.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO neondb_owner;

--
-- Name: user_investments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_investments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    investment_id integer NOT NULL,
    investment_amount numeric NOT NULL,
    investment_date timestamp without time zone DEFAULT now(),
    ownership_percentage numeric NOT NULL,
    distributions_paid numeric DEFAULT '0'::numeric,
    last_distribution_date timestamp without time zone,
    investment_status text NOT NULL
);


ALTER TABLE public.user_investments OWNER TO neondb_owner;

--
-- Name: user_investments_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_investments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_investments_id_seq OWNER TO neondb_owner;

--
-- Name: user_investments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_investments_id_seq OWNED BY public.user_investments.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    accredited_status boolean DEFAULT false,
    accreditation_score integer DEFAULT 0,
    accreditation_segment text DEFAULT 'notReady'::text,
    questionnaire_data text,
    is_profile_complete boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    accredited text,
    sale_status text,
    equity_bracket text,
    horizon text,
    return_need text,
    passive_importance integer,
    location text,
    property_type text,
    mortgage_bracket text,
    prior_1031 text,
    qi_ready text,
    risk_tolerance integer,
    advisor text,
    notes text,
    truthful_acknowledgement boolean,
    updated_at timestamp without time zone DEFAULT now(),
    reset_token text,
    reset_token_expiry timestamp without time zone
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: investments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.investments ALTER COLUMN id SET DEFAULT nextval('public.investments_id_seq'::regclass);


--
-- Name: user_investments id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_investments ALTER COLUMN id SET DEFAULT nextval('public.user_investments_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: investments investments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: user_investments user_investments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_investments
    ADD CONSTRAINT user_investments_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

