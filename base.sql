PGDMP             
        	    z            orion    14.4    14.4 M    \           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ]           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ^           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            _           1262    16394    orion    DATABASE     P   CREATE DATABASE orion WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE orion;
                postgres    false            �            1259    16590    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    postgres    false            �            1259    16698    assunto    TABLE     "  CREATE TABLE public.assunto (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    descricao text,
    data_criacao_descricao timestamp without time zone NOT NULL,
    data_ult_atualizacao timestamp without time zone,
    discussao_id integer,
    usuario_id integer
);
    DROP TABLE public.assunto;
       public         heap    postgres    false            �            1259    16697    assunto_id_seq    SEQUENCE     �   CREATE SEQUENCE public.assunto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.assunto_id_seq;
       public          postgres    false    227            `           0    0    assunto_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.assunto_id_seq OWNED BY public.assunto.id;
          public          postgres    false    226            �            1259    16596    classe_relacao    TABLE     `   CREATE TABLE public.classe_relacao (
    id integer NOT NULL,
    nome character varying(30)
);
 "   DROP TABLE public.classe_relacao;
       public         heap    postgres    false            �            1259    16595    classe_relacao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.classe_relacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.classe_relacao_id_seq;
       public          postgres    false    211            a           0    0    classe_relacao_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.classe_relacao_id_seq OWNED BY public.classe_relacao.id;
          public          postgres    false    210            �            1259    16645    customização    TABLE     �   CREATE TABLE public."customização" (
    id integer NOT NULL,
    usuario_id integer,
    customizacao_padrao_id integer,
    valor character varying(20) NOT NULL
);
 $   DROP TABLE public."customização";
       public         heap    postgres    false            �            1259    16644    customização_id_seq    SEQUENCE     �   CREATE SEQUENCE public."customização_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."customização_id_seq";
       public          postgres    false    221            b           0    0    customização_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."customização_id_seq" OWNED BY public."customização".id;
          public          postgres    false    220            �            1259    16603    customização_padrao    TABLE     �   CREATE TABLE public."customização_padrao" (
    id integer NOT NULL,
    nome character varying(20) NOT NULL,
    descricao character varying(50),
    valor character varying(20) NOT NULL
);
 +   DROP TABLE public."customização_padrao";
       public         heap    postgres    false            �            1259    16602    customização_padrao_id_seq    SEQUENCE     �   CREATE SEQUENCE public."customização_padrao_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public."customização_padrao_id_seq";
       public          postgres    false    213            c           0    0    customização_padrao_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public."customização_padrao_id_seq" OWNED BY public."customização_padrao".id;
          public          postgres    false    212            �            1259    16662 	   discussao    TABLE     �   CREATE TABLE public.discussao (
    id integer NOT NULL,
    titulo character varying(50) NOT NULL,
    descricao text,
    data_criacao_descricao timestamp without time zone NOT NULL,
    grupo_id integer,
    usuario_id integer
);
    DROP TABLE public.discussao;
       public         heap    postgres    false            �            1259    16661    discussao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.discussao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.discussao_id_seq;
       public          postgres    false    223            d           0    0    discussao_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.discussao_id_seq OWNED BY public.discussao.id;
          public          postgres    false    222            �            1259    16717    fala    TABLE     U  CREATE TABLE public.fala (
    id integer NOT NULL,
    conteudo text NOT NULL,
    data_criacao_fala timestamp without time zone NOT NULL,
    data_ult_atualizacao_fala timestamp without time zone,
    imagem_virtual character varying(256),
    imagem_real character varying(256),
    tamanho integer,
    arquivo_virtual character varying(256),
    arquivo_real character varying(256),
    arquivo_tamanho integer,
    url character varying(256),
    assunto_id integer NOT NULL,
    usuario_id integer,
    relacao_id integer,
    nome_usuario character varying(40),
    fala_mae_id integer
);
    DROP TABLE public.fala;
       public         heap    postgres    false            �            1259    16716    fala_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fala_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.fala_id_seq;
       public          postgres    false    229            e           0    0    fala_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.fala_id_seq OWNED BY public.fala.id;
          public          postgres    false    228            �            1259    16619    grupo    TABLE       CREATE TABLE public.grupo (
    id integer NOT NULL,
    nome_grupo character varying(50) NOT NULL,
    descricao_grupo text,
    data_criacao_grupo timestamp without time zone NOT NULL,
    visibilidade_grupo smallint,
    status_grupo smallint,
    usuario_id integer
);
    DROP TABLE public.grupo;
       public         heap    postgres    false            �            1259    16618    grupo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grupo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.grupo_id_seq;
       public          postgres    false    217            f           0    0    grupo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.grupo_id_seq OWNED BY public.grupo.id;
          public          postgres    false    216            �            1259    16681    participacao    TABLE     �   CREATE TABLE public.participacao (
    id integer NOT NULL,
    usuario_id integer,
    grupo_id integer,
    nivel_participacao smallint NOT NULL
);
     DROP TABLE public.participacao;
       public         heap    postgres    false            �            1259    16680    participacao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.participacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.participacao_id_seq;
       public          postgres    false    225            g           0    0    participacao_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.participacao_id_seq OWNED BY public.participacao.id;
          public          postgres    false    224            �            1259    16633    relacao    TABLE     x   CREATE TABLE public.relacao (
    id integer NOT NULL,
    nome character varying(30),
    classe_relacao_id integer
);
    DROP TABLE public.relacao;
       public         heap    postgres    false            �            1259    16741    relacao_fala    TABLE     o   CREATE TABLE public.relacao_fala (
    id integer NOT NULL,
    fala_mae_id integer,
    relacao_id integer
);
     DROP TABLE public.relacao_fala;
       public         heap    postgres    false            �            1259    16740    relacao_fala_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relacao_fala_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.relacao_fala_id_seq;
       public          postgres    false    231            h           0    0    relacao_fala_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.relacao_fala_id_seq OWNED BY public.relacao_fala.id;
          public          postgres    false    230            �            1259    16632    relacao_id_seq    SEQUENCE     �   CREATE SEQUENCE public.relacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.relacao_id_seq;
       public          postgres    false    219            i           0    0    relacao_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.relacao_id_seq OWNED BY public.relacao.id;
          public          postgres    false    218            �            1259    16610    usuario    TABLE     �  CREATE TABLE public.usuario (
    id integer NOT NULL,
    login character varying(256) NOT NULL,
    senha character varying(128) NOT NULL,
    perfil_usuario smallint NOT NULL,
    email_usuario character varying(256) NOT NULL,
    nome_usuario character varying(40),
    data_ult_visita_usuario timestamp without time zone NOT NULL,
    data_pen_visita_usuario timestamp without time zone,
    tags_usuario text
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16609    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    215            j           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    214            �           2604    16701 
   assunto id    DEFAULT     h   ALTER TABLE ONLY public.assunto ALTER COLUMN id SET DEFAULT nextval('public.assunto_id_seq'::regclass);
 9   ALTER TABLE public.assunto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    16599    classe_relacao id    DEFAULT     v   ALTER TABLE ONLY public.classe_relacao ALTER COLUMN id SET DEFAULT nextval('public.classe_relacao_id_seq'::regclass);
 @   ALTER TABLE public.classe_relacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �           2604    16648    customização id    DEFAULT     z   ALTER TABLE ONLY public."customização" ALTER COLUMN id SET DEFAULT nextval('public."customização_id_seq"'::regclass);
 B   ALTER TABLE public."customização" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    16606    customização_padrao id    DEFAULT     �   ALTER TABLE ONLY public."customização_padrao" ALTER COLUMN id SET DEFAULT nextval('public."customização_padrao_id_seq"'::regclass);
 I   ALTER TABLE public."customização_padrao" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            �           2604    16665    discussao id    DEFAULT     l   ALTER TABLE ONLY public.discussao ALTER COLUMN id SET DEFAULT nextval('public.discussao_id_seq'::regclass);
 ;   ALTER TABLE public.discussao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    16720    fala id    DEFAULT     b   ALTER TABLE ONLY public.fala ALTER COLUMN id SET DEFAULT nextval('public.fala_id_seq'::regclass);
 6   ALTER TABLE public.fala ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    16622    grupo id    DEFAULT     d   ALTER TABLE ONLY public.grupo ALTER COLUMN id SET DEFAULT nextval('public.grupo_id_seq'::regclass);
 7   ALTER TABLE public.grupo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    16684    participacao id    DEFAULT     r   ALTER TABLE ONLY public.participacao ALTER COLUMN id SET DEFAULT nextval('public.participacao_id_seq'::regclass);
 >   ALTER TABLE public.participacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    16636 
   relacao id    DEFAULT     h   ALTER TABLE ONLY public.relacao ALTER COLUMN id SET DEFAULT nextval('public.relacao_id_seq'::regclass);
 9   ALTER TABLE public.relacao ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16744    relacao_fala id    DEFAULT     r   ALTER TABLE ONLY public.relacao_fala ALTER COLUMN id SET DEFAULT nextval('public.relacao_fala_id_seq'::regclass);
 >   ALTER TABLE public.relacao_fala ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            �           2604    16613 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2606    16594 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            postgres    false    209            �           2606    16705    assunto assunto_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.assunto
    ADD CONSTRAINT assunto_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.assunto DROP CONSTRAINT assunto_pkey;
       public            postgres    false    227            �           2606    16601 "   classe_relacao classe_relacao_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.classe_relacao
    ADD CONSTRAINT classe_relacao_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.classe_relacao DROP CONSTRAINT classe_relacao_pkey;
       public            postgres    false    211            �           2606    16608 0   customização_padrao customização_padrao_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."customização_padrao"
    ADD CONSTRAINT "customização_padrao_pkey" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public."customização_padrao" DROP CONSTRAINT "customização_padrao_pkey";
       public            postgres    false    213            �           2606    16650 "   customização customização_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."customização"
    ADD CONSTRAINT "customização_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."customização" DROP CONSTRAINT "customização_pkey";
       public            postgres    false    221            �           2606    16669    discussao discussao_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.discussao
    ADD CONSTRAINT discussao_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.discussao DROP CONSTRAINT discussao_pkey;
       public            postgres    false    223            �           2606    16724    fala fala_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.fala
    ADD CONSTRAINT fala_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.fala DROP CONSTRAINT fala_pkey;
       public            postgres    false    229            �           2606    16626    grupo grupo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.grupo DROP CONSTRAINT grupo_pkey;
       public            postgres    false    217            �           2606    16686    participacao participacao_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.participacao
    ADD CONSTRAINT participacao_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.participacao DROP CONSTRAINT participacao_pkey;
       public            postgres    false    225            �           2606    16746    relacao_fala relacao_fala_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.relacao_fala
    ADD CONSTRAINT relacao_fala_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.relacao_fala DROP CONSTRAINT relacao_fala_pkey;
       public            postgres    false    231            �           2606    16638    relacao relacao_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.relacao
    ADD CONSTRAINT relacao_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.relacao DROP CONSTRAINT relacao_pkey;
       public            postgres    false    219            �           2606    16617    usuario usuario_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    215            �           2606    16780 !   assunto assunto_discussao_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assunto
    ADD CONSTRAINT assunto_discussao_id_fkey FOREIGN KEY (discussao_id) REFERENCES public.discussao(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.assunto DROP CONSTRAINT assunto_discussao_id_fkey;
       public          postgres    false    227    223    3510            �           2606    16775    assunto assunto_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.assunto
    ADD CONSTRAINT assunto_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.assunto DROP CONSTRAINT assunto_usuario_id_fkey;
       public          postgres    false    215    3502    227            �           2606    16790 9   customização customização_customizacao_padrao_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."customização"
    ADD CONSTRAINT "customização_customizacao_padrao_id_fkey" FOREIGN KEY (customizacao_padrao_id) REFERENCES public."customização_padrao"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public."customização" DROP CONSTRAINT "customização_customizacao_padrao_id_fkey";
       public          postgres    false    213    221    3500            �           2606    16785 -   customização customização_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."customização"
    ADD CONSTRAINT "customização_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES public.grupo(id) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public."customização" DROP CONSTRAINT "customização_usuario_id_fkey";
       public          postgres    false    221    3504    217            �           2606    16795 !   discussao discussao_grupo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.discussao
    ADD CONSTRAINT discussao_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupo(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.discussao DROP CONSTRAINT discussao_grupo_id_fkey;
       public          postgres    false    217    3504    223            �           2606    16800 #   discussao discussao_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.discussao
    ADD CONSTRAINT discussao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.discussao DROP CONSTRAINT discussao_usuario_id_fkey;
       public          postgres    false    215    223    3502            �           2606    16810    fala fala_assunto_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fala
    ADD CONSTRAINT fala_assunto_id_fkey FOREIGN KEY (assunto_id) REFERENCES public.assunto(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.fala DROP CONSTRAINT fala_assunto_id_fkey;
       public          postgres    false    229    3514    227            �           2606    16805    fala fala_fala_mae_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fala
    ADD CONSTRAINT fala_fala_mae_id_fkey FOREIGN KEY (fala_mae_id) REFERENCES public.fala(id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.fala DROP CONSTRAINT fala_fala_mae_id_fkey;
       public          postgres    false    229    229    3516            �           2606    16820    fala fala_relacao_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fala
    ADD CONSTRAINT fala_relacao_id_fkey FOREIGN KEY (relacao_id) REFERENCES public.relacao(id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.fala DROP CONSTRAINT fala_relacao_id_fkey;
       public          postgres    false    219    3506    229            �           2606    16815    fala fala_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.fala
    ADD CONSTRAINT fala_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.fala DROP CONSTRAINT fala_usuario_id_fkey;
       public          postgres    false    215    229    3502            �           2606    16825    grupo grupo_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.grupo DROP CONSTRAINT grupo_usuario_id_fkey;
       public          postgres    false    3502    217    215            �           2606    16835 '   participacao participacao_grupo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participacao
    ADD CONSTRAINT participacao_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupo(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.participacao DROP CONSTRAINT participacao_grupo_id_fkey;
       public          postgres    false    3504    225    217            �           2606    16830 )   participacao participacao_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.participacao
    ADD CONSTRAINT participacao_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.participacao DROP CONSTRAINT participacao_usuario_id_fkey;
       public          postgres    false    215    3502    225            �           2606    16840 &   relacao relacao_classe_relacao_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relacao
    ADD CONSTRAINT relacao_classe_relacao_id_fkey FOREIGN KEY (classe_relacao_id) REFERENCES public.classe_relacao(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.relacao DROP CONSTRAINT relacao_classe_relacao_id_fkey;
       public          postgres    false    211    219    3498            �           2606    16747 *   relacao_fala relacao_fala_fala_mae_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relacao_fala
    ADD CONSTRAINT relacao_fala_fala_mae_id_fkey FOREIGN KEY (fala_mae_id) REFERENCES public.fala(id);
 T   ALTER TABLE ONLY public.relacao_fala DROP CONSTRAINT relacao_fala_fala_mae_id_fkey;
       public          postgres    false    231    229    3516            �           2606    16845 )   relacao_fala relacao_fala_relacao_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.relacao_fala
    ADD CONSTRAINT relacao_fala_relacao_id_fkey FOREIGN KEY (relacao_id) REFERENCES public.relacao(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.relacao_fala DROP CONSTRAINT relacao_fala_relacao_id_fkey;
       public          postgres    false    231    3506    219           