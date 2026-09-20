--
-- PostgreSQL database dump
--

\restrict r6okIlR5c2ysyszLYmDBcdtOnCM2YMUt6Tt4N49hWBU9G3wLxLAUZMWlDCM4GrO

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

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
-- Name: news_article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_article (
    article_id integer NOT NULL,
    source_id integer,
    title text,
    news_link text NOT NULL,
    published_at date,
    sentiment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.news_article OWNER TO postgres;

--
-- Name: news_article_article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_article_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_article_article_id_seq OWNER TO postgres;

--
-- Name: news_article_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_article_article_id_seq OWNED BY public.news_article.article_id;


--
-- Name: news_source; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news_source (
    source_id integer NOT NULL,
    source_name character varying(50) NOT NULL,
    website_url text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    scraper_name text
);


ALTER TABLE public.news_source OWNER TO postgres;

--
-- Name: news_source_source_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_source_source_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_source_source_id_seq OWNER TO postgres;

--
-- Name: news_source_source_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_source_source_id_seq OWNED BY public.news_source.source_id;


--
-- Name: search_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_keywords (
    keyword_id integer NOT NULL,
    keyword text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.search_keywords OWNER TO postgres;

--
-- Name: search_keywords_keyword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.search_keywords_keyword_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.search_keywords_keyword_id_seq OWNER TO postgres;

--
-- Name: search_keywords_keyword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.search_keywords_keyword_id_seq OWNED BY public.search_keywords.keyword_id;


--
-- Name: news_article article_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_article ALTER COLUMN article_id SET DEFAULT nextval('public.news_article_article_id_seq'::regclass);


--
-- Name: news_source source_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_source ALTER COLUMN source_id SET DEFAULT nextval('public.news_source_source_id_seq'::regclass);


--
-- Name: search_keywords keyword_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_keywords ALTER COLUMN keyword_id SET DEFAULT nextval('public.search_keywords_keyword_id_seq'::regclass);


--
-- Name: news_article news_article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_article
    ADD CONSTRAINT news_article_pkey PRIMARY KEY (article_id);


--
-- Name: news_source news_source_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_source
    ADD CONSTRAINT news_source_pkey PRIMARY KEY (source_id);


--
-- Name: search_keywords search_keywords_keyword_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_keywords
    ADD CONSTRAINT search_keywords_keyword_key UNIQUE (keyword);


--
-- Name: search_keywords search_keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_keywords
    ADD CONSTRAINT search_keywords_pkey PRIMARY KEY (keyword_id);


--
-- Name: news_article unique_news_link; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_article
    ADD CONSTRAINT unique_news_link UNIQUE (news_link);


--
-- Name: news_article news_article_source_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news_article
    ADD CONSTRAINT news_article_source_id_fkey FOREIGN KEY (source_id) REFERENCES public.news_source(source_id);


--
-- PostgreSQL database dump complete
--

\unrestrict r6okIlR5c2ysyszLYmDBcdtOnCM2YMUt6Tt4N49hWBU9G3wLxLAUZMWlDCM4GrO

